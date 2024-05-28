import fastify from "fastify";
import { env } from "./env";
import cors from "@fastify/cors";
import { vehiclesRoutes } from "./routes/vehicles";
import { usersVehiclesRoutes } from "./routes/users_vehicles";
import { usersRoutes } from "./routes/users";
import { authenticateToken, loginRoutes } from "./routes/login";
import { setupSwagger } from "./swagger";
const app = fastify();

setupSwagger(app);

app.addHook("preHandler", async (request, reply) => {
  if (
    request.url.startsWith("/api/docs") ||
    (request.url === "/api/users" && request.method === "POST") ||
    request.url === "/api/login"
  ) {
    return;
  }

  await authenticateToken(request, reply);
});

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

app.register(loginRoutes, {
  prefix: "api/login",
});

app.register(usersRoutes, {
  prefix: "api/users",
});

app.register(vehiclesRoutes, {
  prefix: "api/vehicles",
});

app.register(usersVehiclesRoutes, {
  prefix: "api/users_vehicles",
});

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
