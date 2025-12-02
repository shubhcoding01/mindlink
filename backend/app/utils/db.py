from sqlmodel import create_engine, Session, SQLModel
from typing import Generator
from app.utils.config import settings

# Construct the synchronous and asynchronous database URLs
DATABASE_URL = (
    f"postgresql+asyncpg://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@"
    f"{settings.POSTGRES_SERVER}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
)

SYNC_DATABASE_URL = (
    f"postgresql+psycopg2://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@"
    f"{settings.POSTGRES_SERVER}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
)

# Initialize the engine globally. Use connect_args for better compatibility.
# WARNING: If this import fails due to connection issues, the app crashes immediately.
try:
    engine = create_engine(
        DATABASE_URL, 
        echo=False, 
        pool_pre_ping=True,
        pool_size=10, 
        max_overflow=20,
    )
except Exception as e:
    # Log the error but allow the application to proceed with initialization
    print(f"CRITICAL DB CONNECTION ERROR on startup: {e}")
    # In a production setup, you would implement retry logic here.
    engine = None # Set engine to None to fail later requests gracefully


def get_session() -> Generator[Session, None, None]:
    """
    Dependency to yield a database session for each request.
    It fails gracefully if the database engine could not be initialized.
    """
    if engine is None:
        raise Exception("Database engine failed to initialize during startup.")
        
    with Session(engine) as session:
        yield session