import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/users/:username",
    { onRequest: [authenticate] },
    async (req, res) => {
      const userParams = z.object({
        username: z.string(),
      });
      const { username } = userParams.parse(req.params);

      const user = await prisma.users.findFirst({
        where: {
          username: username,
        },
        include: {
          accountIdFK: {
            select: {
              balance: true,
              transactionCreditade: true,
              transactionDebitade: true,
            },
          },
        },
      });

      return res.status(200).send(user);
    }
  );

  fastify.post("/users/:username", async (req: any, res) => {
    if (req.params.username === "") {
      return res.status(401).send(`Está faltando o usuário`);
    } else if (req.body.password === "") {
      return res.status(401).send(`Está faltando a senha`);
    }

    const userParams = z.object({
      username: z.string(),
    });
    const userBody = z.object({
      password: z.string(),
    });

    const { username } = userParams.parse(req.params);
    const { password } = userBody.parse(req.body);

    const userSearched = await prisma.users.findFirst({
      where: {
        username: username,
        password: password,
      },
    });

    if (userSearched) {
      const tokenJwt = fastify.jwt.sign(
        {
          username: username,
          /*    password: password, */
        },
        {
          sub: userSearched?.id,
          expiresIn: "24 hours",
        }
      );
      return res.status(200).send(tokenJwt);
    } else {
      console.log(username);
      return res
        .status(401)
        .send(`O usuário ${username} e/ou senha estão incorretos.`);
    }
  });

  fastify.get("/users", async () => {
    const users = await prisma.users.findMany();
    return { users };
  });

  fastify.get("/users/count", async () => {
    const numOfUsers = await prisma.users.count();
    return { numOfUsers };
  });

  fastify.post("/users", async (req, res) => {
    const createNewUser = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = createNewUser.parse(req.body);

    if (username.length < 2) {
      console.log(username);
      return res.status(401).send("O nome é muito curto. Tente outro");
    }

    const passwordSplit = password.split("");
    /*         const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (specialChars.test(password) === false) { */
    if (
      password.length < 8 ||
      passwordSplit.find(Number) === undefined ||
      /[A-Z]/.test(password) !== true
    ) {
      return res
        .status(400)
        .send(
          `A senha não segue os padrões de min 8 caracteres, com no mínimo 1 número e 1 letra maiuscula.`
        );
    }

    const userAlreadyExists = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });

    if (userAlreadyExists) {
      return res
        .status(400)
        .send(
          `O nome de usuário ${username} já existe. Por favor, utilize outro.`
        );
    } else {
      const newUser = await prisma.users.create({
        data: {
          username: username,
          password: password,
          accountIdFK: {
            create: {
              balance: 100,
            },
          },
        },
      });

      return res.status(201).send(
        ` Parabéns, ${username}! Você acaba de se tornar um novo cliente da NG-Cash, e o melhor, ela já veio com R$100,00!
        Agora logue na sua conta para aproveitar todos os seus benefícios!  
        `
      );
    }
  });
}
