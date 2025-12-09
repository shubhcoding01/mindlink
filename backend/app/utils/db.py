from sqlmodel import create_engine, Session
from typing import Generator
from app.utils.config import settings

# Construct the database URL for SQLAlchemy
# We use the synchronous psycopg2 driver for standard FastAPI usage
DATABASE_URL = (
    f"postgresql+psycopg2://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@"
    f"{settings.POSTGRES_SERVER}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
)

# Export this for Alembic to use explicitly
SYNC_DATABASE_URL = DATABASE_URL

# Create the database engine
# pool_pre_ping=True ensures the connection is valid before usage (prevents stale connection errors)
engine = create_engine(DATABASE_URL, echo=False, pool_pre_ping=True)

def get_session() -> Generator[Session, None, None]:
    """
    FastAPI dependency that provides a database session for a single request.
    Closes the session automatically when the request finishes.
    """
    with Session(engine) as session:
        yield session