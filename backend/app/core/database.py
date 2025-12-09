from sqlmodel import SQLModel
from app.utils.db import engine
# Import all models to ensure SQLModel knows which tables to create
# If you add more models later (e.g. Document, Quiz), import them here too.
from app.models.user_model import User 

def create_db_and_tables():
    """
    Creates the database and all tables defined by SQLModel metadata.
    This is useful for initial local development setup and quick testing.
    For production, rely on Alembic migrations.
    """
    print("Attempting to create database tables...")
    SQLModel.metadata.create_all(engine)
    print("Database tables created successfully (or already exist).")