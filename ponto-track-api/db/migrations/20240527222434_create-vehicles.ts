import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("vehicles", (table) => {
    table.uuid("id").primary();
    table.text("board").notNullable();
    table.text("model");
    table.text("brand");
    table.integer("year");
    table.text("color");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("vehicles");
}
