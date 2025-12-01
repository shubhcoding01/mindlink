# Use a Python base image suitable for ML/AI libraries
FROM python:3.11

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV APP_HOME=/app

# Create app directory
WORKDIR $APP_HOME

# Install dependencies
# CORRECTED: This assumes requirements.txt is directly in the build context (ai_service folder)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code (ingest.py, etc.)
# CORRECTED: Copy ALL files from the current context (.) to the container working directory ($APP_HOME)
COPY . $APP_HOME

# The command to run the ingestion worker script
CMD ["python", "ingest.py"]