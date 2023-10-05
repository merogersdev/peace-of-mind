// Update with your config settings.
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_URL,
    searchPath: ["knex", "public"],
  },

  production: {
    client: "pg",
    connection: process.env.DB_URL,
    searchPath: ["knex", "public"],
  },
};
