FROM python:alpine3.16

WORKDIR /usr/src/app/server

RUN apk -U upgrade \
    apk add build-base

RUN pip install --upgrade pip
# Using pipenv for dependencies install and managament
RUN pip install pipenv

COPY COPY Pipfile Pipfile.lock ./

# We use the --system flag so packages are installed into the system python
# and not into a virtualenv. Docker containers don't need virtual environments. 
RUN pipenv install --system --dev

COPY . .

EXPOSE 8000


CMD ["python","manage.py","runserver"]