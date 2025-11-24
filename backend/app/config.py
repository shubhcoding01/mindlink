import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "MindLink Backend"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev_secret_key")
    ALGORITHM: str = "HS256"

settings = Settings()
