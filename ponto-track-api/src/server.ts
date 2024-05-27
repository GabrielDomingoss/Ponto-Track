import fastify from "fastify";
import { env } from "./env";
import cors from "@fastify/cors";
import { vehiclesRoutes } from "./routes/vehicles";
import { usersVehiclesRoutes } from "./routes/users_vehicles";
import { usersRoutes } from "./routes/users";
import { loginRoutes } from "./routes/login";
const app = fastify();

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
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
