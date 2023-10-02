/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("first_name", 100).notNullable();
      table.string("last_name", 100).notNullable();
      table.string("email", 100).notNullable();
      table.string("password", 100).notNullable();
    })
    .createTable("entries", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.string("title", 100).notNullable();
      table.string("gratitude", 100).notNullable();
      table.text("entry").notNullable();
      table.timestamps(true, true);
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("entries").dropTable("users");
};
