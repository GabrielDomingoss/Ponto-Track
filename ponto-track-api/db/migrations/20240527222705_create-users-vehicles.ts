import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users_vehicles", (table) => {
    table.integer("user_id");
    table.integer("vehicle_id");
    table.timestamp("date_association").defaultTo(knex.fn.now());
    table.primary(["user_id", "vehicle_id"]);
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .foreign("vehicle_id")
      .references("id")
      .inTable("vehicles")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users_vehicles");
}
