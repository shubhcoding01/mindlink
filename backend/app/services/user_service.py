from typing import Optional
from sqlmodel import Session, select
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

from app.models.user_model import User
from app.schemas.user_schema import UserRegister
from app.utils.config import settings

# Initialize CryptContext for password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- Password Hashing ---

def hash_password(password: str) -> str:
    """Hashes a plaintext password using bcrypt."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plaintext password against a hashed password."""
    return pwd_context.verify(plain_password, hashed_password)

# --- JWT Token Generation ---

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Creates a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire, "sub": str(to_encode["user_id"])})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

# --- Database Operations ---

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Retrieves a user by their email address."""
    statement = select(User).where(User.email == email)
    return db.exec(statement).first()

def create_user(db: Session, user_data: UserRegister) -> User:
    """Creates a new user in the database."""
    hashed_password = hash_password(user_data.password)
    
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=hashed_password,
        # Default role and preferences are handled by the User model
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user