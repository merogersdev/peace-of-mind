const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig);

// Cleanup: Destroy all connections to DB on exit
function cleanUp() {
  process.on("exit", () => {
    db.destroy();
  });
}

module.exports = cleanUp;
