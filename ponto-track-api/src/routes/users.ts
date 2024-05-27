import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";

export async function usersRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const users = await knex("users").select();

    return { users };
  });

  app.get("/:id", async (request) => {
    const getUserParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getUserParamsSchema.parse(request.params);

    const user = await knex("users").where("id", id).first();

    return { user };
  });

  app.post("/", async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      birth: z.string(),
      address: z.string(),
      password: z.string(),
    });

    const body = createUserBodySchema.parse(request.body);

    await knex("users").insert({
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      birth: body.birth,
      address: body.address,
      password: body.password,
    });

    return reply.status(201).send();
  });
}
