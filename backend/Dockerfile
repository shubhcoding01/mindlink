# # FROM python:3.11


# # ENV PYTHONUNBUFFERED 1
# # ENV APP_HOME=/app


# # WORKDIR $APP_HOME





# # COPY . $APP_HOME


# # CMD ["python", "ingest.py"]

# # Use a Python base image suitable for FastAPI
# FROM python:3.11

# # Set environment variables
# ENV PYTHONUNBUFFERED 1
# ENV APP_HOME=/app

# # Create app directory
# WORKDIR $APP_HOME

# # --- INSTALLATION STEP (MISSING IN YOUR CODE) ---
# # 1. Copy dependencies file into container
# COPY requirements.txt .

# # 2. Run installation for all packages including 'alembic' and 'uvicorn'
# RUN pip install --no-cache-dir -r requirements.txt

# # 3. Copy the rest of the application code
# COPY ./app $APP_HOME/app
# COPY alembic.ini .

# # --- STARTUP COMMAND (WAS INCORRECTLY SET TO ingest.py) ---
# # Use the correct CMD command, Uvicorn will be run via 'command:' in docker-compose.yml 
# # We revert to the standard CMD, knowing docker-compose will override it with the fix:
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

# Use a Python base image suitable for FastAPI
FROM python:3.11

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV APP_HOME=/app

# Create app directory
WORKDIR $APP_HOME

# --- INSTALLATION FIX: Install PostgreSQL client tools (fixes pg_isready not found) ---
RUN apt-get update && \
    apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY ./app $APP_HOME/app
COPY alembic.ini .

# CMD is overruled by docker-compose command, but kept for convention
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]