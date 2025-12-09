# Use a Python base image suitable for FastAPI
FROM python:3.11

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV APP_HOME=/app

# Create app directory
WORKDIR $APP_HOME

# --- INSTALLATION STEP ---
# Install PostgreSQL client tools (fixes pg_isready not found error)
RUN apt-get update && \
    apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/*

# 1. Copy dependencies file into container
COPY requirements.txt .

# 2. Run installation for all packages including 'alembic' and 'uvicorn'
RUN pip install --no-cache-dir -r requirements.txt

# 3. Copy the rest of the application code
COPY ./app $APP_HOME/app
COPY alembic.ini .

# --- STARTUP COMMAND ---
# Use the correct CMD command. Uvicorn will be run via 'command:' in docker-compose.yml 
# We revert to the standard CMD, knowing docker-compose will override it with the fix:
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]