# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.routes import user_routes
# # Import your other route modules here as you create them:
# # from app.routes import document_routes 
# # from app.routes import ai_routes 
# from app.utils.config import settings
# from app.core.database import create_db_and_tables # Helper function for local setup

# app = FastAPI(
#     title=settings.PROJECT_NAME,
#     version=settings.PROJECT_VERSION,
#     openapi_url="/openapi.json"
# )

# # --- CORS Middleware ---
# # This is crucial to allow your Next.js frontend (localhost:3000) 
# # to make requests to the FastAPI backend (localhost:8000).
# origins = [
#     settings.FRONTEND_URL,
#     "http://localhost",
#     "http://localhost:3000",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # --- Startup Event ---
# # We enable this for easy local testing. For production, you rely on Alembic.
# # @app.on_event("startup")
# # def on_startup():
# #     print("Application starting up...")
# #     # Uncomment this line if you want the database tables to be created automatically
# #     # on service startup during local development.
# #     # create_db_and_tables() 

# # --- Include Routers ---
# app.include_router(user_routes.router, prefix="/api")

# # Add other routers as you develop them:
# # app.include_router(document_routes.router, prefix="/api")
# # app.include_router(ai_routes.router, prefix="/api")


# @app.get("/health", tags=["System"])
# async def health_check():
#     """Basic health check endpoint, useful for Docker Compose health checks."""
#     return {"status": "ok", "message": "MindLink API is running"}

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

# --- CORS Middleware ---
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

# --- Include Routers ---
app.include_router(user_routes.router, prefix="/api")

@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "ok", "message": "MindLink API is running"}