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

// src/routes/login.ts
var login_exports = {};
__export(login_exports, {
  authenticateToken: () => authenticateToken,
  loginRoutes: () => loginRoutes
});
module.exports = __toCommonJS(login_exports);

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

// src/routes/login.ts
var import_bcryptjs2 = __toESM(require("bcryptjs"));

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

// src/routes/login.ts
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
async function loginRoutes(app) {
  app.post("/", async (request, reply) => {
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
  app.get(
    "/protected",
    { preHandler: [authenticateToken] },
    async (request, reply) => {
      reply.send({ message: "Acess granted", user: request.user });
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticateToken,
  loginRoutes
});
