import { FastifyInstance } from "fastify";
import { string, z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function accountRoutes(fastify: FastifyInstance) {
  fastify.get("/accounts/count", async () => {
    const numOfAccounts = await prisma.accounts.count();
    return { numOfAccounts };
  });

  fastify.get("/accounts/:usernameOrAccountId", async (req, res) => {
    const accontSearched = z.object({
      usernameOrAccountId: z.string(),
    });

    const { usernameOrAccountId } = accontSearched.parse(req.params);

    const userAccount = await prisma.users.findFirst({
      where: {
        username: usernameOrAccountId,
      },
    });

    if (userAccount) {
      const accountFromUsername = await prisma.accounts.findFirst({
        where: {
          id: userAccount.accountId,
        },
      });
      return res.status(200).send(accountFromUsername);
    } else {
      const accountFromAccountId = await prisma.accounts.findFirst({
        where: {
          id: usernameOrAccountId,
        },
      });

      if (accountFromAccountId) {
        return res.status(200).send(accountFromAccountId);
      } else {
        return res
          .status(400)
          .send(
            "Não rolou. O valor passado não é nem um id de conta nem um username"
          );
      }
    }
  });

  fastify.get(
    "/accounts/me",
    { onRequest: [authenticate] },
    async (req, res) => {
      const username = req.user.username;

      const userDataBase = await prisma.users.findUnique({
        where: {
          id: req.user.sub,
        },
      });

      const account = await prisma.accounts.findUnique({
        where: {
          id: userDataBase?.accountId,
        },
        include: {
          transactionCreditade: {
            select: {
              accountCreditadeId: true,
              createdAt: true,
              id: true,
              value: true,
              debitedAccountId: {
                select: {
                  id: true,
                  users: {
                    select: {
                      username: true,
                    },
                  },
                },
              },
            },
          },
          transactionDebitade: {
            select: {
              accountDebitadeId: true,
              createdAt: true,
              id: true,
              value: true,
              creditedAccountId: {
                select: {
                  id: true,
                  users: {
                    select: {
                      username: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return { account, username };
    }
  );
}
