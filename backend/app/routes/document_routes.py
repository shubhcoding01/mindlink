from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from sqlmodel import Session
import boto3
import uuid
from app.utils.db import get_session
from app.utils.config import settings
from app.models.document_model import Document
# from app.services.user_service import get_current_user # Dependency for auth

router = APIRouter(prefix="/documents", tags=["Documents"])

# Initialize S3 Client (MinIO)
s3_client = boto3.client(
    's3',
    endpoint_url=settings.S3_ENDPOINT_URL,
    aws_access_key_id=settings.S3_ACCESS_KEY,
    aws_secret_access_key=settings.S3_SECRET_KEY
)

@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_session),
    # current_user: User = Depends(get_current_user) # Uncomment when ready to secure this endpoint
):
    """
    Uploads a file to MinIO storage and creates a database record.
    """
    # Mock user ID for now until auth dependency is fully wired up globally
    # In a real scenario, you would use current_user.id
    user_id = uuid.uuid4() 
    
    try:
        # 1. Validate file type
        file_ext = file.filename.split(".")[-1].lower()
        if file_ext not in ["pdf", "txt", "md"]:
             raise HTTPException(status_code=400, detail="Unsupported file type. Only PDF, TXT, and MD are supported.")
             
        # 2. Generate unique S3 key
        s3_key = f"{user_id}/{uuid.uuid4()}.{file_ext}"
        
        # 3. Upload to MinIO/S3
        # Ensure bucket exists (optional safety check for local dev)
        try:
            s3_client.head_bucket(Bucket=settings.S3_BUCKET_NAME)
        except:
            s3_client.create_bucket(Bucket=settings.S3_BUCKET_NAME)

        s3_client.upload_fileobj(
            file.file,
            settings.S3_BUCKET_NAME,
            s3_key
        )

        # 4. Save metadata to DB
        doc = Document(
            user_id=user_id,
            filename=file.filename,
            s3_key=s3_key,
            file_size=file.size or 0,
            status="pending"
        )
        db.add(doc)
        db.commit()
        db.refresh(doc)

        # 5. Trigger AI Ingestion (Future Step)
        # In a production app, you would publish a message to a queue (e.g., RabbitMQ/Redis) here.
        # The AI Service would pick that up to start processing.
        
        return {"id": str(doc.id), "status": "uploaded", "filename": doc.filename}

    except Exception as e:
        print(f"Upload failed: {e}")
        # Return a clean 500 error if something internal fails (S3 or DB)
        raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")