MindLink: AI Personalized Learning Companion

MindLink is an AI-driven platform designed to adapt to a user's learning style, create custom study plans, generate quizzes, and maintain a personal knowledge base using Retrieval-Augmented Generation (RAG).

This project is built using a microservice architecture defined by Next.js, FastAPI, and specialized AI/ML tooling.

🚀 Getting Started (Local Development)

This project uses Docker Compose to manage all required services, including the backend, AI worker, database, cache, and object storage.

Prerequisites

Node.js (v18 or higher)

Python (v3.11 or higher)

Docker Desktop (Installed and Running)

Setup Instructions

Clone the repository:

git clone [YOUR_REPO_URL] mindlink
cd mindlink


Create Environment File:
Create a file named .env in the root directory (mindlink/) and populate it with the required secrets and configurations.

cp .env.example .env 
# (If .env.example exists, otherwise create it manually)


Ensure the database credentials match the docker-compose.yml service definition.

Start the Stack:
Build and start all services (Postgres, Redis, MinIO, Backend, AI Service):

docker compose up --build -d


Database Migration (Crucial):
Once the backend container is running (wait for PostgreSQL to be healthy), execute the following commands to create the users table:

# 4a. Generate the first migration script (if not already done)
docker exec -it mindlink-backend-1 alembic revision --autogenerate -m "initial user setup"

# 4b. Apply the migration to the database
docker exec -it mindlink-backend-1 alembic upgrade head


🛠️ Project Structure

The project is split into three main codebases:

Service

Folder

Language/Framework

Purpose

Frontend

frontend/

Next.js 14, React, Tailwind CSS

User Interface, routing, API consumption.

Backend

backend/

FastAPI, Python, SQLModel

Core REST API, Authentication, Business Logic, DB access.

AI Service

ai_service/

FastAPI, Python, LangChain, Chroma

Document Ingestion, Embedding Generation, RAG logic.

🧪 Testing and Access

1. Frontend Access

Navigate to the frontend directory: cd frontend

Install dependencies: npm install

Start the development server: npm run dev

Access the UI at: http://localhost:3000

2. Backend API Access

The main API is running on port 8000.

Health Check: http://localhost:8000/health (Should return {"status": "ok"})

API Docs (Swagger UI): http://localhost:8000/docs (Use this to test registration and login endpoints).

3. Key Endpoints

Endpoint

Method

Description

/api/auth/register

POST

Create a new user account.

/api/auth/login

POST

Authenticate user and retrieve JWT.

/api/documents/upload

POST

Upload a file to MinIO (Requires implementation).

/api/ai/chat

POST

RAG query using personalized documents (Requires implementation).