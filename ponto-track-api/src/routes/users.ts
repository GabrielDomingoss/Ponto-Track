import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

interface UserBodySchema {
  id: string;
  name: string;
  email: string;
  phone: string;
  birth: string;
  address: string;
  password: string;
}

export function generateToken(user: UserBodySchema) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
}

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

  app.delete("/:id", async (request, reply) => {
    const getUserParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getUserParamsSchema.parse(request.params);

    const user = await knex("users").where("id", id).del();

    return reply.status(201).send({ user });
  });

  app.put("/:id", async (request, reply) => {
    const getUserParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getUserParamsSchema.parse(request.params);

    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      birth: z.string(),
      address: z.string(),
      password: z.string(),
    });

    const body = createUserBodySchema.parse(request.body);

    const user = await knex("users").where("id", id).update(
      {
        name: body.name,
        email: body.email,
        phone: body.phone,
        birth: body.birth,
        address: body.address,
        password: body.password,
      },
      ["id", "name", "email", "phone", "birth", "address", "password"],
    );
    return reply.status(201).send({ user });
  });

  app.post(
    "/",
    {
      schema: {
        body: {
          type: "object",
          required: [
            "nome",
            "email",
            "telefone",
            "endereco",
            "data_nascimento",
            "senha",
          ],
          properties: {
            nome: { type: "string" },
            email: { type: "string" },
            telefone: { type: "string" },
            endereco: { type: "string" },
            data_nascimento: { type: "string" },
            senha: { type: "string" },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              user: { type: "object" },
              token: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        birth: z.string(),
        address: z.string(),
        password: z.string(),
      });
      const body = createUserBodySchema.parse(request.body);
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const userId = crypto.randomUUID();
      await knex("users").insert({
        id: userId,
        name: body.name,
        email: body.email,
        phone: body.phone,
        birth: body.birth,
        address: body.address,
        password: hashedPassword,
      });

      const newUser = (await knex("users")
        .where({ id: userId })
        .first()) as UserBodySchema;
      const token = generateToken(newUser);

      return reply.status(201).send({ user: newUser, token });
    },
  );
}
