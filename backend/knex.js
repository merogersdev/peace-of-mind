const knex = require("knex");
const knexFile = require("./knexfile");

let env = null;

if (process.env.NODE_ENV === "production") {
  env = "production";
} else {
  env = "development";
}

module.exports = knex(knexFile[env]);
