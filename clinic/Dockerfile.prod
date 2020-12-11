FROM python:3.8-slim

WORKDIR /app

COPY . .

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get install python-psycopg2 -y

RUN pip3 install pipenv

RUN pipenv install --ignore-pipfile

EXPOSE 8000