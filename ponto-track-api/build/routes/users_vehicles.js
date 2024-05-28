var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/users_vehicles.ts
var users_vehicles_exports = {};
__export(users_vehicles_exports, {
  usersVehiclesRoutes: () => usersVehiclesRoutes
});
module.exports = __toCommonJS(users_vehicles_exports);

// src/database.ts
var import_knex = require("knex");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "test", "production"]).default("production"),
  DATABASE_URL: import_zod.z.string(),
  DATABASE_CLIENT: import_zod.z.enum(["sqlite", "pg"]),
  DATABASE_HOST: import_zod.z.string(),
  DATABASE_USER: import_zod.z.string(),
  DATABASE_PASSWORD: import_zod.z.string(),
  DATABASE_NAME: import_zod.z.string(),
  PORT: import_zod.z.coerce.number().default(3333),
  DATABASE_PORT: import_zod.z.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid environment variables!", _env.error.format());
  throw new Error("Invalid environment variables.");
}
var env = _env.data;

// src/database.ts
var config = {
  client: env.DATABASE_CLIENT,
  connection: env.DATABASE_CLIENT === "sqlite" ? {
    filename: env.DATABASE_URL
  } : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations"
  }
};
var knex = (0, import_knex.knex)(config);

// src/routes/users_vehicles.ts
var import_zod2 = require("zod");
async function usersVehiclesRoutes(app) {
  app.get("/user_vehicles/:id", async (request) => {
    const getUserParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = getUserParamsSchema.parse(request.params);
    const userVehicles = await knex("vehicles").join("users_vehicles", "vehicles.id", "=", "users_vehicles.vehicle_id").where("users_vehicles.user_id", id).select("vehicles.*");
    return { userVehicles };
  });
  app.get("/users_by_vehicles/:id", async (request) => {
    const getUserParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = getUserParamsSchema.parse(request.params);
    const users = await knex("users").join("users_vehicles", "users.id", "=", "users_vehicles.user_id").where("users_vehicles.vehicle_id", id).select("users.*");
    return { users };
  });
  app.post("/", async (request, reply) => {
    const createVehicleBodySchema = import_zod2.z.object({
      user_id: import_zod2.z.string(),
      vehicle_id: import_zod2.z.string(),
      brand: import_zod2.z.string(),
      year: import_zod2.z.number(),
      color: import_zod2.z.string()
    });
    const body = createVehicleBodySchema.parse(request.body);
    await knex("users_vehicles").insert({
      user_id: body.user_id,
      vehicle_id: body.vehicle_id
    });
    return reply.status(201).send();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  usersVehiclesRoutes
});
