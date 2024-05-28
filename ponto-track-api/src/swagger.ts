import { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export const setupSwagger = (app: FastifyInstance): void => {
  app.register(fastifySwagger, {
    mode: "dynamic",
    openapi: {
      info: {
        title: "Ponto Track Api",
        description: "API do sistema Ponto Track App",
        version: "1.0.0",
      },
      servers: [
        {
          url: process.env.BASE_URL || "http://localhost:3333",
        },
      ],
      components: {},
      tags: [],
    },
    hideUntagged: true,
  });

  app.register(fastifySwaggerUi, {
    routePrefix: "/api/docs",
    uiConfig: {
      docExpansion: "none",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });
};
