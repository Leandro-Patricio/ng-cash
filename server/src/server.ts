import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { userRoutes } from "./routes/user";
import { transactionRoutes } from "./routes/transaction";
import { accountRoutes } from "./routes/account";
import { authRoutes } from "./routes/auth";
import { mainRoutes } from "./routes/main";

export const bootstrap = async () => {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,

    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    optionsSuccessStatus: 200,
    preflight: true,
    preflightContinue: true,

    /*   strictPreflight: false,    preflight: false,
      allowedHeaders: "content-type",*/

    /*    allowedHeaders: ["Access-Control-Allow-Origin"],
    "Origin",
      "X-Requested-With",
      "Accept",
      "Content-Type",
      "Authorization",
    ], */
  });

  await fastify.register(jwt, {
    secret: "chaveSecretaDoJwt",
  });

  await fastify.register(mainRoutes);
  await fastify.register(userRoutes);
  await fastify.register(transactionRoutes);
  await fastify.register(accountRoutes);
  await fastify.register(authRoutes);

  /*   , host: "127.0.0.1" */
  fastify.listen({ port: 3333 }, (err) => {
    if (err) throw err;
  });
};

bootstrap();
