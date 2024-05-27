import fastify from "fastify";
import { env } from "./env";
import { usersRoutes } from "./routes/users";
import cors from "@fastify/cors";

const app = fastify();

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

app.register(usersRoutes, {
  prefix: "api/users",
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
