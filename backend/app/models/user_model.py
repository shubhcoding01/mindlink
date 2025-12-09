# from typing import Optional
# from sqlmodel import Field, SQLModel
# from datetime import datetime
# from uuid import UUID, uuid4

# class User(SQLModel, table=True):
#     """
#     SQLModel ORM class representing the 'users' table.
#     """
#     id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
#     name: str
#     email: str = Field(unique=True, index=True)
#     password_hash: str
#     role: str = Field(default="user")
    
#     # Store preferences as JSON. In Postgres, this maps to JSONB.
#     # We use sa_column_kwargs to specify the column type if needed, 
#     # but SQLModel often handles basic dicts as JSON automatically with recent versions.
#     # For explicit Postgres JSONB support, you might import JSON from sqlalchemy.dialects.postgresql
#     preferences: Optional[dict] = Field(default={}, sa_column_kwargs={"type": "JSONB"})
    
#     created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

from typing import Optional, Dict, Any
from sqlmodel import Field, SQLModel
from datetime import datetime
from uuid import UUID, uuid4
from sqlalchemy import JSON
from sqlalchemy import Column # Required for safer type definition

class User(SQLModel, table=True):
    """
    SQLModel ORM class representing the 'users' table.
    """
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    name: str
    email: str = Field(unique=True, index=True)
    password_hash: str
    role: str = Field(default="user")
    
    # FIX: Explicitly define the column type as JSON using sa_column
    # This tells SQLModel "store this dict as a JSON column in Postgres"
    preferences: Dict[str, Any] = Field(
        default={}, 
        sa_column=Column(JSON)
    )
    
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)