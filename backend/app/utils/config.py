from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    # Core Application Settings
    PROJECT_NAME: str = "MindLink API"
    PROJECT_VERSION: str = "1.0.0"
    
    # Security Settings
    SECRET_KEY: str # Loaded from env
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database Settings
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_SERVER: str
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str
    
    # S3/MinIO Settings
    S3_ENDPOINT_URL: str
    S3_ACCESS_KEY: str
    S3_SECRET_KEY: str
    S3_BUCKET_NAME: str
    
    # External Services
    AI_SERVICE_URL: str
    FRONTEND_URL: str

    # Pydantic setting to load environment variables from a .env file
    # 'extra="ignore"' allows extra env vars without error
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

@lru_cache()
def get_settings():
    """Cache settings object for fast access"""
    return Settings()

settings = get_settings()