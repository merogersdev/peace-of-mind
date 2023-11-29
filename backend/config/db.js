require("dotenv").config();
const { Pool } = require("pg");

// If testing, use separate database
const database =
  process.env.NODE_ENV === "test"
    ? process.env.DB_DATA_TEST
    : process.env.DB_DATA;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database,
});

module.exports = pool;
