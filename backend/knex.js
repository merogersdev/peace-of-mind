const knex = require("knex");
const knexFile = require("./knexfile");

const env = process.env.NODE_ENV || "development";
const configOptions = knexFile[env];

module.exports = knex(configOptions);
