from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    # Core Application Settings
    PROJECT_NAME: str = "MindLink"
    PROJECT_VERSION: str = "1.0.0"
    SECRET_KEY: str = "YOUR_SUPER_SECRET_AND_LONG_KEY"  # **CHANGE THIS IN PRODUCTION**
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database Settings
    POSTGRES_USER: str = "mindlink_user"
    POSTGRES_PASSWORD: str = "mindlink_password"
    POSTGRES_SERVER: str = "postgres"  # Matches the service name in docker-compose
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str = "mindlink_db"
    
    # S3/MinIO Settings
    S3_ENDPOINT_URL: str = "http://minio:9000"  # Matches the service name in docker-compose
    S3_ACCESS_KEY: str = "minio_root"
    S3_SECRET_KEY: str = "minio_password"
    S3_BUCKET_NAME: str = "mindlink-documents"

    # AI Service Connection
    AI_SERVICE_URL: str = "http://ai_service:8100" # Matches the service name in docker-compose
    
    # CORS (Frontend URL)
    FRONTEND_URL: str = "http://localhost:3000"

    # Pydantic setting to load environment variables from a .env file
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

@lru_cache()
def get_settings():
    """Cache settings object for fast access"""
    return Settings()

settings = get_settings()