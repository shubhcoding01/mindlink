from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

# --- Input Schemas (Data coming INTO the API) ---

class UserRegister(BaseModel):
    """Schema for registering a new user."""
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    """Schema for logging in."""
    email: EmailStr
    password: str

# --- Output Schemas (Data going OUT of the API) ---

class UserProfile(BaseModel):
    """
    Public profile information.
    We exclude sensitive data like password_hash.
    """
    id: UUID
    name: str
    email: EmailStr
    role: str
    preferences: Optional[dict] = {}
    
    class Config:
        # Tells Pydantic to read data from ORM objects (SQLModel/SQLAlchemy)
        from_attributes = True 

class Token(BaseModel):
    """Schema for the JWT token response."""
    access_token: str
    token_type: str
    user: UserProfile # We include the user profile for convenience on login