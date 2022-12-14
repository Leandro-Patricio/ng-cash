import { prisma } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { request } from "http";
import { userInfo } from "os";
import { z } from "zod";
import { authenticate } from "../plugins/authenticate";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get("/me", { onRequest: [authenticate] }, async (req) => {
    return { user: req.user };
  });

  /*  
  fastify.post("/users", async (req) => {
    const createUserBody = z.object({
      access_token: z.string(),
    });

    

    const { access_token } = createUserBody.parse(req.body);
     const userResponse = await fetch("googleapi");
     
       const userResponse = await fetch ('localhost:3333/users/')
 

    let user = await prisma.user.findUnique({
      where: {
        username: userInfo.username,
        password: userInfo.password,
      },
    });

    if (!user) {
        user = await prisma.user.create({
            data:{
                username: userInfo.username
                password: userInfo.password
            }
        })
    }
  }); */
}
