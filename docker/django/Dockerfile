FROM python:3.10.8-alpine3.16

ENV ROOT_FOLDER /var/www/todos

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir -p ${ROOT_FOLDER}

WORKDIR ${ROOT_FOLDER}


# libyaml-dev для watchmedo
RUN apk upgrade && apk update && \
    apk add netcat libyaml-dev redis \
    rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

COPY ./backend/req.txt ./backend/req.txt
RUN pip install -r ./backend/req.txt

COPY ./docker/django/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY ./docker/django/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

COPY ./docker/django/celery /celery
RUN sed -i 's/\r$//g' /celery
RUN chmod +x /celery

COPY ./docker/django/flower /flower
RUN sed -i 's/\r$//g' /flower
RUN chmod +x /flower

ENTRYPOINT [ "/entrypoint" ]


