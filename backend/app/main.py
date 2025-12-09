from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user_routes
from app.utils.config import settings
from app.core.database import create_db_and_tables

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    openapi_url="/openapi.json"
)


origins = [
    settings.FRONTEND_URL,
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_routes.router, prefix="/api")

@app.get("/health", tags=["System"])
async def health_check():
    """Basic health check endpoint."""
    return {"status": "ok", "message": "MindLink API is running"}
