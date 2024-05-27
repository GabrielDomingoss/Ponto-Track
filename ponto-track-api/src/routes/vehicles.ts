import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";

export async function vehiclesRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const vehicles = await knex("vehicles").select();

    return { vehicles };
  });

  app.get("/:id", async (request) => {
    const getUserParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getUserParamsSchema.parse(request.params);

    const vehicle = await knex("vehicles").where("id", id).first();

    return { vehicle };
  });

  app.delete("/:id", async (request, reply) => {
    const getUserParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getUserParamsSchema.parse(request.params);

    const vehicle = await knex("vehicles").where("id", id).del();

    return reply.status(201).send({ vehicle });
  });

  app.put("/:id", async (request, reply) => {
    const getUserParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getUserParamsSchema.parse(request.params);

    const createVehicleBodySchema = z.object({
      board: z.string(),
      model: z.string(),
      brand: z.string(),
      year: z.number(),
      color: z.string(),
    });

    const body = createVehicleBodySchema.parse(request.body);

    const vehicle = await knex("vehicles").where("id", id).update(
      {
        board: body.board,
        model: body.model,
        brand: body.brand,
        year: body.year,
        color: body.color,
      },
      ["id", "board", "model", "year", "color"],
    );
    return reply.status(201).send({ vehicle });
  });

  app.post("/", async (request, reply) => {
    const createVehicleBodySchema = z.object({
      board: z.string(),
      model: z.string(),
      brand: z.string(),
      year: z.number(),
      color: z.string(),
    });

    const body = createVehicleBodySchema.parse(request.body);

    await knex("vehicles").insert({
      id: crypto.randomUUID(),
      board: body.board,
      model: body.model,
      brand: body.brand,
      year: body.year,
      color: body.color,
    });

    return reply.status(201).send();
  });
}
