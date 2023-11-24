#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
  );

  CREATE TABLE entries (
    id SERIAL,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    gratitude VARCHAR(100) NOT NULL,
    entry TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT user_id
      FOREIGN KEY(id)
        REFERENCES users(id)
  );
EOSQL