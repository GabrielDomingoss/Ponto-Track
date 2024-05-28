var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/users.ts
var users_exports = {};
__export(users_exports, {
  generateToken: () => generateToken,
  usersRoutes: () => usersRoutes
});
module.exports = __toCommonJS(users_exports);

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

// src/routes/users.ts
var import_zod2 = require("zod");
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET;
function generateToken(user) {
  return import_jsonwebtoken.default.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h"
  });
}
async function usersRoutes(app) {
  app.get("/", async () => {
    const users = await knex("users").select();
    return { users };
  });
  app.get("/:id", async (request) => {
    const getUserParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = getUserParamsSchema.parse(request.params);
    const user = await knex("users").where("id", id).first();
    return { user };
  });
  app.delete("/:id", async (request, reply) => {
    const getUserParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = getUserParamsSchema.parse(request.params);
    const user = await knex("users").where("id", id).del();
    return reply.status(201).send({ user });
  });
  app.put("/:id", async (request, reply) => {
    const getUserParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = getUserParamsSchema.parse(request.params);
    const createUserBodySchema = import_zod2.z.object({
      name: import_zod2.z.string(),
      email: import_zod2.z.string(),
      phone: import_zod2.z.string(),
      birth: import_zod2.z.string(),
      address: import_zod2.z.string(),
      password: import_zod2.z.string()
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
  app.post("/", async (request, reply) => {
    const createUserBodySchema = import_zod2.z.object({
      name: import_zod2.z.string(),
      email: import_zod2.z.string(),
      phone: import_zod2.z.string(),
      birth: import_zod2.z.string(),
      address: import_zod2.z.string(),
      password: import_zod2.z.string()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateToken,
  usersRoutes
});
