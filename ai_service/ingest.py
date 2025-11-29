import os
import chromadb
import uuid
import json
import logging
from typing import List, Dict

# Third-party libraries
import boto3
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from sentence_transformers import SentenceTransformer

# --- Configuration (Normally loaded from app/utils/config) ---
# NOTE: In a real microservice environment, these would be loaded via an API call
# or environment variables. We define them directly for simplicity here.
S3_ENDPOINT_URL = os.environ.get("S3_ENDPOINT_URL", "http://minio:9000")
S3_ACCESS_KEY = os.environ.get("S3_ACCESS_KEY", "minio_root")
S3_SECRET_KEY = os.environ.get("S3_SECRET_KEY", "minio_password")
S3_BUCKET_NAME = os.environ.get("S3_BUCKET_NAME", "mindlink-documents")
LOCAL_STORAGE_PATH = "/tmp/mindlink_files"

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# --- Initialization ---
# Initialize S3 Client (MinIO compatible)
s3_client = boto3.client(
    's3',
    endpoint_url=S3_ENDPOINT_URL,
    aws_access_key_id=S3_ACCESS_KEY,
    aws_secret_access_key=S3_SECRET_KEY
)

# Initialize Vector DB Client (Chroma)
chroma_client = chromadb.Client()
# Chroma collection name often includes the user ID for personalization
COLLECTION_NAME = "user_docs_collection" 

# Initialize Embedding Model
# This model is lightweight and suitable for local use
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

# Create necessary local directory
os.makedirs(LOCAL_STORAGE_PATH, exist_ok=True)

# --- Core Functions ---

def download_file_from_s3(s3_key: str, local_file_path: str):
    """Downloads a file from the S3 bucket to a local path."""
    logging.info(f"Downloading {s3_key} to {local_file_path}")
    try:
        s3_client.download_file(S3_BUCKET_NAME, s3_key, local_file_path)
        logging.info("Download successful.")
    except Exception as e:
        logging.error(f"Error downloading file: {e}")
        raise

def process_document(document_id: str, user_id: str, s3_key: str, file_type: str = "pdf"):
    """
    Main pipeline to process a document, generate embeddings, and store them.
    
    """
    logging.info(f"Starting processing for Document ID: {document_id}")
    
    local_path = os.path.join(LOCAL_STORAGE_PATH, f"{document_id}.{file_type}")
    
    try:
        # 1. Download the file
        download_file_from_s3(s3_key, local_path)

        # 2. Load and extract text
        if file_type.lower() == "pdf":
            loader = PyPDFLoader(local_path)
            # LangChain loads document pages into a list of objects
            pages = loader.load()
        else:
            # Add other loaders (TXT, DOCX, etc.) here
            raise ValueError(f"Unsupported file type: {file_type}")
            
        logging.info(f"Document loaded: {len(pages)} pages/documents found.")

        # 3. Split into manageable chunks (using recursive text splitting)
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=100,
            separators=["\n\n", "\n", " ", ""]
        )
        
        chunks = text_splitter.split_documents(pages)
        logging.info(f"Split into {len(chunks)} chunks.")

        # 4. Generate Embeddings for all chunks
        texts: List[str] = [chunk.page_content for chunk in chunks]
        embeddings_list = embedding_model.encode(texts, convert_to_numpy=True).tolist()
        logging.info("Embeddings generated.")

        # 5. Prepare data for Vector DB (Chroma)
        ids = [str(uuid.uuid4()) for _ in chunks]
        metadatas = []
        
        for i, chunk in enumerate(chunks):
            metadata = {
                "document_id": document_id,
                "user_id": user_id,
                "source": chunk.metadata.get('source', s3_key),
                "page": chunk.metadata.get('page', 0),
                # Storing the raw chunk text in the metadata is optional but useful for retrieval confirmation
                "chunk_text_preview": chunk.page_content[:100] + "...", 
            }
            metadatas.append(metadata)

        # 6. Store in Vector Database
        collection = chroma_client.get_or_create_collection(COLLECTION_NAME)
        
        collection.add(
            embeddings=embeddings_list,
            documents=texts,
            metadatas=metadatas,
            ids=ids
        )
        logging.info(f"Successfully stored {len(chunks)} embeddings in Chroma.")
        
        # --- Clean up the local file ---
        os.remove(local_path)
        
        return {"status": "success", "chunks_processed": len(chunks)}

    except Exception as e:
        logging.error(f"Processing failed for document {document_id}: {e}")
        # Clean up if download failed or processing stopped early
        if os.path.exists(local_path):
            os.remove(local_path)
        return {"status": "error", "message": str(e)}

# --- Example Usage (If running script directly) ---

if __name__ == "__main__":
    # This section simulates receiving a task from the backend (e.g., via RabbitMQ/Celery)
    
    # NOTE: You must have MinIO running with a file uploaded to 'mindlink-documents/test_doc.pdf'
    MOCK_DOC_ID = str(uuid.uuid4())
    MOCK_USER_ID = str(uuid.uuid4())
    MOCK_S3_KEY = "test_doc.pdf"
    
    logging.info("--- Starting Mock Document Ingestion ---")
    
    # 1. Create the bucket if it doesn't exist (helpful for MinIO local testing)
    try:
        s3_client.head_bucket(Bucket=S3_BUCKET_NAME)
    except:
        s3_client.create_bucket(Bucket=S3_BUCKET_NAME)
        logging.warning(f"Bucket '{S3_BUCKET_NAME}' created. Ensure a test file is uploaded!")

    # 2. Run the pipeline
    # NOTE: For this script to work standalone, you must manually place a PDF named 'test_doc.pdf' 
    # in the MinIO bucket or adapt this example to upload a local placeholder file.
    
    # Example placeholder for a real implementation:
    # result = process_document(MOCK_DOC_ID, MOCK_USER_ID, MOCK_S3_KEY, "pdf")
    # logging.info(f"Processing Result: {json.dumps(result, indent=2)}")
    
    logging.info("Ingestion worker started successfully. Waiting for tasks...")