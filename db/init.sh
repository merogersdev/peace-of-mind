#!/bin/bash
set -e

# Create Test DB
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c "CREATE DATABASE $POSTGRES_DB_TEST;"

# Ensure user permissions are on Test DB
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB_TEST TO $POSTGRES_USER;"

# Create User and Entry tables in Test DB
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB_TEST" -f /docker-entrypoint-initdb.d/init.sql

