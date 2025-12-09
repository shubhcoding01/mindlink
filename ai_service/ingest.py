import os
import chromadb
import uuid
import logging
import time
from typing import List

# Third-party libraries
import boto3
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader, TextLoader, Docx2txtLoader
from sentence_transformers import SentenceTransformer

# --- Configuration (Loaded from Environment Variables) ---
S3_ENDPOINT_URL = os.environ.get("S3_ENDPOINT_URL", "http://minio:9000")
S3_ACCESS_KEY = os.environ.get("S3_ACCESS_KEY", "minio_root")
S3_SECRET_KEY = os.environ.get("S3_SECRET_KEY", "minio_password")
S3_BUCKET_NAME = os.environ.get("S3_BUCKET_NAME", "mindlink-documents")
LOCAL_STORAGE_PATH = "/tmp/mindlink_files"

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# --- Initialization ---

# Initialize S3 Client (MinIO compatible)
def get_s3_client():
    return boto3.client(
        's3',
        endpoint_url=S3_ENDPOINT_URL,
        aws_access_key_id=S3_ACCESS_KEY,
        aws_secret_access_key=S3_SECRET_KEY
    )

# Initialize Vector DB Client (Chroma)
# Using PersistentClient so data survives container restarts if volume mounted
chroma_client = chromadb.PersistentClient(path="/app/chroma_db")
COLLECTION_NAME = "user_docs_collection"

# Initialize Embedding Model
# 'all-MiniLM-L6-v2' is fast and efficient for CPU-based embedding generation
logging.info("Loading embedding model...")
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
logging.info("Embedding model loaded.")

# Create necessary local directory for temp downloads
os.makedirs(LOCAL_STORAGE_PATH, exist_ok=True)


# --- Core Functions ---

def download_file_from_s3(s3_key: str, local_file_path: str):
    """Downloads a file from the S3 bucket to a local path."""
    s3 = get_s3_client()
    logging.info(f"Downloading {s3_key} from bucket {S3_BUCKET_NAME} to {local_file_path}")
    try:
        s3.download_file(S3_BUCKET_NAME, s3_key, local_file_path)
        logging.info("Download successful.")
    except Exception as e:
        logging.error(f"Error downloading file: {e}")
        raise

def load_document(file_path: str, file_type: str):
    """Loads a document based on its file extension."""
    if file_type.lower() == "pdf":
        loader = PyPDFLoader(file_path)
    elif file_type.lower() == "txt":
        loader = TextLoader(file_path)
    elif file_type.lower() in ["docx", "doc"]:
        loader = Docx2txtLoader(file_path)
    else:
        raise ValueError(f"Unsupported file type: {file_type}")
    
    return loader.load()

def process_document(document_id: str, user_id: str, s3_key: str, file_type: str = "pdf"):
    """
    Main pipeline to process a document:
    1. Download -> 2. Load -> 3. Chunk -> 4. Embed -> 5. Store
    """
    logging.info(f"--- Starting processing for Document ID: {document_id} ---")
    
    local_path = os.path.join(LOCAL_STORAGE_PATH, f"{document_id}.{file_type}")
    
    try:
        # 1. Download
        download_file_from_s3(s3_key, local_path)

        # 2. Load
        pages = load_document(local_path, file_type)
        logging.info(f"Document loaded: {len(pages)} pages/documents found.")

        # 3. Split (Chunking)
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            separators=["\n\n", "\n", " ", ""]
        )
        chunks = text_splitter.split_documents(pages)
        logging.info(f"Split into {len(chunks)} chunks.")

        if not chunks:
            logging.warning("No chunks created. Document might be empty or unreadable.")
            return {"status": "warning", "message": "No text extracted"}

        # 4. Generate Embeddings
        texts: List[str] = [chunk.page_content for chunk in chunks]
        embeddings_list = embedding_model.encode(texts, convert_to_numpy=True).tolist()
        logging.info("Embeddings generated.")

        # 5. Prepare Data for Chroma
        ids = [str(uuid.uuid4()) for _ in chunks]
        metadatas = []
        
        for i, chunk in enumerate(chunks):
            metadata = {
                "document_id": document_id,
                "user_id": user_id,
                "source": s3_key,
                "page": chunk.metadata.get('page', 0),
                # Storing text preview is helpful for debugging retrieval
                "text_preview": chunk.page_content[:50] 
            }
            metadatas.append(metadata)

        # 6. Store in Vector DB
        collection = chroma_client.get_or_create_collection(name=COLLECTION_NAME)
        
        collection.add(
            embeddings=embeddings_list,
            documents=texts, # Chroma can store the raw text too
            metadatas=metadatas,
            ids=ids
        )
        
        logging.info(f"Successfully stored {len(chunks)} embeddings in Chroma.")
        
        return {"status": "success", "chunks_processed": len(chunks)}

    except Exception as e:
        logging.error(f"Processing failed for document {document_id}: {e}")
        return {"status": "error", "message": str(e)}
        
    finally:
        # Cleanup
        if os.path.exists(local_path):
            os.remove(local_path)
            logging.info(f"Cleaned up local file: {local_path}")

# --- Worker Simulation (for Docker CMD) ---
if __name__ == "__main__":
    logging.info("AI Service Ingestion Worker Started.")
    
    # In a real microservices architecture, this script would:
    # 1. Listen to a Message Queue (RabbitMQ/Redis) for "ingest_document" tasks.
    # 2. Or expose a FastAPI endpoint to trigger ingestion.
    
    # For this MVP scaffold, we keep the process alive so the container doesn't exit.
    # This allows you to 'docker exec' into it to run tests manually or add API logic later.
    
    try:
        # Initialize bucket on startup if it doesn't exist (helpful for local dev)
        s3 = get_s3_client()
        try:
            s3.head_bucket(Bucket=S3_BUCKET_NAME)
            logging.info(f"Bucket '{S3_BUCKET_NAME}' exists.")
        except:
            try:
                s3.create_bucket(Bucket=S3_BUCKET_NAME)
                logging.info(f"Created bucket '{S3_BUCKET_NAME}'.")
            except Exception as e:
                logging.warning(f"Could not create bucket: {e}")

        while True:
            time.sleep(10)
    except KeyboardInterrupt:
        logging.info("Worker stopped.")