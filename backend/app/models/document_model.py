from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime
from uuid import UUID, uuid4

class Document(SQLModel, table=True):
    """
    SQLModel ORM class representing the 'documents' table.
    Stores metadata about user-uploaded files for RAG processing.
    """
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(index=True) # Links document to a specific user
    filename: str
    s3_key: str # Path where the file is stored in MinIO/S3
    file_size: int
    
    # Status tracks the ingestion pipeline: pending -> processing -> completed/failed
    status: str = Field(default="pending") 
    
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)