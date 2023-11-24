FROM postgres:alpine as db
WORKDIR /app
COPY ./init.sh /docker-entrypoint-initdb.d
