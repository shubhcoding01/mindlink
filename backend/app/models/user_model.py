from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime
from uuid import UUID, uuid4

class User(SQLModel, table=True):
    """
    SQLModel ORM class representing the 'users' table.
    """
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    name: str
    email: str = Field(unique=True, index=True)
    password_hash: str
    role: str = Field(default="user")
    
    # Store preferences as JSON. In Postgres, this maps to JSONB.
    # We use sa_column_kwargs to specify the column type if needed, 
    # but SQLModel often handles basic dicts as JSON automatically with recent versions.
    # For explicit Postgres JSONB support, you might import JSON from sqlalchemy.dialects.postgresql
    preferences: Optional[dict] = Field(default={}, sa_column_kwargs={"type": "JSONB"})
    
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)