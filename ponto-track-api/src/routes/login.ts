import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { bcrypt } from "bcryptjs";
import { generateToken } from "./users";
import jwt from "jsonwebtoken";

interface UserBodySchema {
  id: string;
  name: string;
  email: string;
  phone: string;
  birth: string;
  address: string;
  password: string;
}
const JWT_SECRET = process.env.JWT_SECRET;

async function authenticateToken(request, reply) {
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return reply.code(401).send({ message: "Token não fornecido" });

  try {
    const user = jwt.verify(token, JWT_SECRET) as UserBodySchema;
    request.user = user;
  } catch (err) {
    return reply.code(403).send({ message: "Token inválido" });
  }
}

export async function loginRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    try {
      const user = (await knex("usuarios")
        .where({ email })
        .first()) as UserBodySchema;

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return reply.code(401).send({ message: "Invalid Credentials" });
      }

      const token = generateToken(user);
      reply.send({ user, token });
    } catch (error) {
      reply.code(500).send({ message: "Login Error", error });
    }
  });

  app.get(
    "/protected",
    { preHandler: [authenticateToken] },
    async (request, reply) => {
      reply.send({ message: "Acess granted", user: request.user });
    },
  );
}
