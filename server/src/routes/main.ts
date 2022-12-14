import { FastifyInstance } from "fastify";

export async function mainRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (req, res) => {
    return res.status(200).send(`As rotas disponíveis são:
      /users, /users/count, /transactions, /transactions/count`);
  });
}
