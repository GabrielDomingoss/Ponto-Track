var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"));

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

// src/server.ts
var import_cors = __toESM(require("@fastify/cors"));

// src/database.ts
var import_knex = require("knex");
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

// src/routes/vehicles.ts
var import_zod2 = require("zod");
async function vehiclesRoutes(app2) {
  app2.get("/", async () => {
    const vehicles = await knex("vehicles").select();
    return { vehicles };
  });
  app2.get("/:id", async (request) => {
    const getUserParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = getUserParamsSchema.parse(request.params);
    const vehicle = await knex("vehicles").where("id", id).first();
    return { vehicle };
  });
  app2.delete("/:id", async (request, reply) => {
    const getUserParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = getUserParamsSchema.parse(request.params);
    const vehicle = await knex("vehicles").where("id", id).del();
    return reply.status(201).send({ vehicle });
  });
  app2.put("/:id", async (request, reply) => {
    const getUserParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = getUserParamsSchema.parse(request.params);
    const createVehicleBodySchema = import_zod2.z.object({
      board: import_zod2.z.string(),
      model: import_zod2.z.string(),
      brand: import_zod2.z.string(),
      year: import_zod2.z.number(),
      color: import_zod2.z.string()
    });
    const body = createVehicleBodySchema.parse(request.body);
    const vehicle = await knex("vehicles").where("id", id).update(
      {
        board: body.board,
        model: body.model,
        brand: body.brand,
        year: body.year,
        color: body.color
      },
      ["id", "board", "model", "year", "color"]
    );
    return reply.status(201).send({ vehicle });
  });
  app2.post("/", async (request, reply) => {
    const createVehicleBodySchema = import_zod2.z.object({
      board: import_zod2.z.string(),
      model: import_zod2.z.string(),
      brand: import_zod2.z.string(),
      year: import_zod2.z.number(),
      color: import_zod2.z.string()
    });
    const body = createVehicleBodySchema.parse(request.body);
    await knex("vehicles").insert({
      id: crypto.randomUUID(),
      board: body.board,
      model: body.model,
      brand: body.brand,
      year: body.year,
      color: body.color
    });
    return reply.status(201).send();
  });
}

// src/routes/users_vehicles.ts
var import_zod3 = require("zod");
async function usersVehiclesRoutes(app2) {
  app2.get("/user_vehicles/:id", async (request) => {
    const getUserParamsSchema = import_zod3.z.object({
      id: import_zod3.z.string().uuid()
    });
    const { id } = getUserParamsSchema.parse(request.params);
    const userVehicles = await knex("vehicles").join("users_vehicles", "vehicles.id", "=", "users_vehicles.vehicle_id").where("users_vehicles.user_id", id).select("vehicles.*");
    return { userVehicles };
  });
  app2.get("/users_by_vehicles/:id", async (request) => {
    const getUserParamsSchema = import_zod3.z.object({
      id: import_zod3.z.string().uuid()
    });
    const { id } = getUserParamsSchema.parse(request.params);
    const users = await knex("users").join("users_vehicles", "users.id", "=", "users_vehicles.user_id").where("users_vehicles.vehicle_id", id).select("users.*");
    return { users };
  });
  app2.post("/", async (request, reply) => {
    const createVehicleBodySchema = import_zod3.z.object({
      user_id: import_zod3.z.string(),
      vehicle_id: import_zod3.z.string(),
      brand: import_zod3.z.string(),
      year: import_zod3.z.number(),
      color: import_zod3.z.string()
    });
    const body = createVehicleBodySchema.parse(request.body);
    await knex("users_vehicles").insert({
      user_id: body.user_id,
      vehicle_id: body.vehicle_id
    });
    return reply.status(201).send();
  });
}

// src/routes/users.ts
var import_zod4 = require("zod");
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET;
function generateToken(user) {
  return import_jsonwebtoken.default.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h"
  });
}
async function usersRoutes(app2) {
  app2.get("/", async () => {
    const users = await knex("users").select();
    return { users };
  });
  app2.get("/:id", async (request) => {
    const getUserParamsSchema = import_zod4.z.object({
      id: import_zod4.z.string().uuid()
    });
    const { id } = getUserParamsSchema.parse(request.params);
    const user = await knex("users").where("id", id).first();
    return { user };
  });
  app2.delete("/:id", async (request, reply) => {
    const getUserParamsSchema = import_zod4.z.object({
      id: import_zod4.z.string().uuid()
    });
    const { id } = getUserParamsSchema.parse(request.params);
    const user = await knex("users").where("id", id).del();
    return reply.status(201).send({ user });
  });
  app2.put("/:id", async (request, reply) => {
    const getUserParamsSchema = import_zod4.z.object({
      id: import_zod4.z.string().uuid()
    });
    const { id } = getUserParamsSchema.parse(request.params);
    const createUserBodySchema = import_zod4.z.object({
      name: import_zod4.z.string(),
      email: import_zod4.z.string(),
      phone: import_zod4.z.string(),
      birth: import_zod4.z.string(),
      address: import_zod4.z.string(),
      password: import_zod4.z.string()
    });
    const body = createUserBodySchema.parse(request.body);
    const user = await knex("users").where("id", id).update(
      {
        name: body.name,
        email: body.email,
        phone: body.phone,
        birth: body.birth,
        address: body.address,
        password: body.password
      },
      ["id", "name", "email", "phone", "birth", "address", "password"]
    );
    return reply.status(201).send({ user });
  });
  app2.post("/", async (request, reply) => {
    const createUserBodySchema = import_zod4.z.object({
      name: import_zod4.z.string(),
      email: import_zod4.z.string(),
      phone: import_zod4.z.string(),
      birth: import_zod4.z.string(),
      address: import_zod4.z.string(),
      password: import_zod4.z.string()
    });
    const body = createUserBodySchema.parse(request.body);
    const hashedPassword = await import_bcryptjs.default.hash(body.password, 10);
    const userId = crypto.randomUUID();
    await knex("users").insert({
      id: userId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      birth: body.birth,
      address: body.address,
      password: hashedPassword
    });
    const newUser = await knex("users").where({ id: userId }).first();
    const token = generateToken(newUser);
    return reply.status(201).send({ user: newUser, token });
  });
}

// src/routes/login.ts
var import_bcryptjs2 = __toESM(require("bcryptjs"));
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var JWT_SECRET2 = process.env.JWT_SECRET;
async function authenticateToken(request, reply) {
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return reply.code(401).send({ message: "Token n\xE3o fornecido" });
  try {
    const user = import_jsonwebtoken2.default.verify(token, JWT_SECRET2);
    request.user = user;
  } catch (err) {
    return reply.code(403).send({ message: "Token inv\xE1lido" });
  }
}
async function loginRoutes(app2) {
  app2.post("/", async (request, reply) => {
    const { email, password } = request.body;
    try {
      const user = await knex("users").where({ email }).first();
      console.log(user.password, password);
      if (!user || !await import_bcryptjs2.default.compare(password, user.password)) {
        return reply.code(401).send({ message: "Invalid Credentials" });
      }
      const token = generateToken(user);
      reply.send({ user, token });
    } catch (error) {
      reply.code(500).send({ message: "Login Error", error });
    }
  });
  app2.get(
    "/protected",
    { preHandler: [authenticateToken] },
    async (request, reply) => {
      reply.send({ message: "Acess granted", user: request.user });
    }
  );
}

// src/server.ts
var app = (0, import_fastify.default)();
app.addHook("preHandler", async (request, reply) => {
  if (request.routeOptions.url === "/api/users" && request.method === "POST" || request.routeOptions.url === "/api/login") {
    return;
  }
  await authenticateToken(request, reply);
});
app.register(import_cors.default, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
});
app.register(loginRoutes, {
  prefix: "api/login"
});
app.register(usersRoutes, {
  prefix: "api/users"
});
app.register(vehiclesRoutes, {
  prefix: "api/vehicles"
});
app.register(usersVehiclesRoutes, {
  prefix: "api/users_vehicles"
});
app.listen({
  port: env.PORT
}).then(() => {
  console.log("HTTP Server Running!");
});
