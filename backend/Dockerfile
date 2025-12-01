FROM python:3.11


ENV PYTHONUNBUFFERED 1
ENV APP_HOME=/app


WORKDIR $APP_HOME





COPY . $APP_HOME


CMD ["python", "ingest.py"]