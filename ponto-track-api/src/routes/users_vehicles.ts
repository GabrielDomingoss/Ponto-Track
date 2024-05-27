import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";

export async function usersVehiclesRoutes(app: FastifyInstance) {
  app.get("/user_vehicles", async (userId) => {
    const userVehicles = await knex("vehicles")
      .join("users_vehicles", "vehicles.id", "=", "users_vehicles.vehicle_id")
      .where("users_vehicles.user_id", userId)
      .select("vehicles.*");

    return { userVehicles };
  });

  app.get("/users_by_vehicles", async (veiculoId) => {
    const users = await knex("users")
      .join("users_vehicles", "users.id", "=", "users_vehicles.user_id")
      .where("users_vehicles.vehicle_id", veiculoId)
      .select("users.*");

    return { users };
  });

  app.post("/", async (request, reply) => {
    const createVehicleBodySchema = z.object({
      user_id: z.string(),
      vehicle_id: z.string(),
      brand: z.string(),
      year: z.number(),
      color: z.string(),
    });

    const body = createVehicleBodySchema.parse(request.body);

    await knex("users_vehicles").insert({
      user_id: body.user_id,
      vehicle_id: body.vehicle_id,
    });

    return reply.status(201).send();
  });
}
