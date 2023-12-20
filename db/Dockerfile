FROM postgres:alpine as db
WORKDIR /app
COPY ./*.sh /docker-entrypoint-initdb.d
COPY ./*.sql /docker-entrypoint-initdb.d