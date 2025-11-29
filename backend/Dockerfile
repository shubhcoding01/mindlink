# Use a Python base image suitable for FastAPI
FROM python:3.11-slim

# Set environment variables to ensure Python output is streamed immediately
ENV PYTHONUNBUFFERED 1
ENV APP_HOME=/app

# Create app directory
WORKDIR $APP_HOME

# Install dependencies
# We copy requirements.txt first to leverage Docker's build cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
# This copies the entire 'app' folder into the container
COPY ./app $APP_HOME/app

# Copy the alembic configuration file
COPY alembic.ini .

# The command to run the application using uvicorn
# It starts the FastAPI app located at app/main.py, listening on port 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]