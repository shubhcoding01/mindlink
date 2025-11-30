# Use a Python base image suitable for ML/AI libraries
FROM python:3.11

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV APP_HOME=/app

# Create app directory
WORKDIR $APP_HOME

# Install dependencies
# We assume the requirements file is at ai_service/requirements.txt relative to the docker-compose context
# NOTE: The current context definition in docker-compose points to the root of the project, 
# so the path inside the container must be adjusted if not running from the root.
# We assume requirements.txt is copied to the root of the AI service container's working directory.
COPY ai_service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code (ingest.py, etc.)
COPY ./ai_service $APP_HOME

# The command to run the ingestion worker script
CMD ["python", "ingest.py"]