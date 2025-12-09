MindLink: AI Personalized Learning Companion

MindLink is an AI-driven platform designed to adapt to a user's learning style, create custom study plans, generate quizzes, and maintain a personal knowledge base using Retrieval-Augmented Generation (RAG).

This project uses a microservice architecture with Next.js 14 (Frontend), FastAPI (Backend), and a dedicated AI Service powered by LangChain and ChromaDB.

🚀 Getting Started (Local Development)

This project relies on Docker Compose to orchestrate the backend services (Postgres, Redis, MinIO, AI Service, and the FastAPI Backend).

Prerequisites

Node.js (v18 or higher) - Required for the frontend.

Docker Desktop (Installed and Running) - Required for the backend infrastructure.

Git - To clone the repository.

Step 1: Backend Setup & Infrastructure

Clone the repository:

git clone <YOUR_REPO_URL> mindlink
cd mindlink


Create Environment File:
Create a .env file in the root mindlink/ directory. Copy the contents below:

# .env
PROJECT_NAME="MindLink API"
SECRET_KEY="replace_this_with_a_long_random_string"
ACCESS_TOKEN_EXPIRE_MINUTES=60
FRONTEND_URL="http://localhost:3000"

# Database
POSTGRES_USER="mindlink_user"
POSTGRES_PASSWORD="mindlink_password"
POSTGRES_SERVER="postgres"
POSTGRES_PORT=5432
POSTGRES_DB="mindlink_db"

# Object Storage (MinIO)
S3_ENDPOINT_URL="http://minio:9000"
S3_ACCESS_KEY="minio_root"
S3_SECRET_KEY="minio_password"
S3_BUCKET_NAME="mindlink-documents"

# AI Service
AI_SERVICE_URL="http://ai_service:8100"


Start the Backend Stack:
Build and start all containers in detached mode:

docker compose up --build -d


Wait ~15 seconds for all services to initialize.

Verify Services are Running:

docker compose ps


Ensure mindlink-backend-1, mindlink-postgres-1, and mindlink-ai_service-1 show status Up.

Initialize the Database (Run Migration):
Execute the following commands to create the users table:

# 1. Create the migration script based on your models
docker exec -it mindlink-backend-1 python -m alembic -c alembic.ini revision --autogenerate -m "initial user setup"

# 2. Apply the migration to the database
docker exec -it mindlink-backend-1 python -m alembic -c alembic.ini upgrade head


Step 2: Frontend Setup

Navigate to the frontend directory:

cd frontend


Install Dependencies:

npm install
# Ensure you have GSAP installed for animations
npm install gsap @gsap/react swiper lucide-react


Start the Development Server:

npm run dev


Access the App:
Open your browser and go to: http://localhost:3000

🛠️ Project Structure

The codebase is organized into three distinct parts:

Service

Folder

Tech Stack

Responsibility

Frontend

frontend/

Next.js 14, React, Tailwind CSS

UI, Animations (GSAP), Routing, API Consumption.

Backend

backend/

FastAPI, Python 3.11, SQLModel

Authentication, User Management, Database Operations.

AI Service

ai_service/

FastAPI, LangChain, Chroma

RAG Pipeline: Document Ingestion, Embedding, Vector Storage.

🧪 Testing & Verification

1. Backend Health Check

Health Endpoint: http://localhost:8000/health

Expected: {"status": "ok", "message": "MindLink API is running"}

API Documentation (Swagger UI): http://localhost:8000/docs

Use this interface to manually test POST /api/auth/register and POST /api/auth/login.

2. Full Stack Integration Test

Go to the frontend: http://localhost:3000

Click "Initialize System" (Register).

Create a new account.

Success: You should be redirected to the Dashboard (/dashboard), confirming the frontend successfully communicated with the backend database.

🔑 Key API Endpoints

Endpoint

Method

Description

Status

/api/auth/register

POST

Register a new user.

✅ Active

/api/auth/login

POST

Login and retrieve JWT.

✅ Active

/api/auth/me

GET

Get current user profile.

🚧 Pending

/api/documents/upload

POST

Upload file to MinIO.

🚧 Pending

/api/ai/chat

POST

RAG query via AI Service.

🚧 Pending

🐛 Troubleshooting

"Container Restarting" Loop:

Run docker compose logs backend to see the error.

If pg_isready not found: Rebuild with docker compose build --no-cache backend.

If SyntaxError: null bytes: Delete backend/app/main.py and recreate it cleanly.

Database Error "relation 'user' does not exist":

Re-run the migration commands in Step 1, Item 5.

Frontend "Network Error":

Ensure the backend is running on port 8000.

Check src/lib/axios.ts base URL configuration.