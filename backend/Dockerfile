FROM python:3.10 as requirements-stage

WORKDIR /tmp

RUN pip install poetry

COPY ./pyproject.toml ./poetry.lock* /tmp/

RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /application

COPY --from=requirements-stage /tmp/requirements.txt /application/requirements.txt

COPY . /application

RUN pip install --no-cache-dir --upgrade -r /application/requirements.txt
