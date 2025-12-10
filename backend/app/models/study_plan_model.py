from typing import Optional, Dict, List, Any
from sqlmodel import Field, SQLModel
from datetime import datetime
from uuid import UUID, uuid4
from sqlalchemy import JSON, Column

class StudyPlan(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(index=True)
    title: str
    
    # Stores the list of topics/modules as JSON
    modules: List[Dict[str, Any]] = Field(
        default=[], 
        sa_column=Column(JSON)
    )
    
    # e.g., "active", "completed", "archived"
    status: str = Field(default="active")
    
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)