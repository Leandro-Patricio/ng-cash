import { create } from "domain";
import { FastifyInstance } from "fastify";
import { number, z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function transactionRoutes(fastify: FastifyInstance) {
  fastify.get("/transactions/count", async () => {
    const numOfTransactions = await prisma.transactions.count();

    return { numOfTransactions };
  });

  fastify.get(
    "/transactions/:usernameOrAccountId",
    { onRequest: [authenticate] },
    async (req, res) => {
      const transactionSearched = z.object({
        usernameOrAccountId: z.string(),
      });

      const { usernameOrAccountId } = transactionSearched.parse(req.params);

      const userAccount = await prisma.users.findFirst({
        where: {
          username: usernameOrAccountId,
        },
      });

      let accountThatWeRLookingFor = null;

      if (userAccount) {
        accountThatWeRLookingFor = await prisma.accounts.findFirst({
          where: {
            id: userAccount.accountId,
          },
        });
      } else {
        accountThatWeRLookingFor = await prisma.accounts.findFirst({
          where: {
            id: usernameOrAccountId,
          },
        });
      }

      if (accountThatWeRLookingFor === null) {
        return res
          .status(400)
          .send(
            `Não foi encontrado nenhum usuário ou conta com o valor ${usernameOrAccountId}`
          );
      }

      const transactions = await prisma.transactions.findMany({
        where: {
          OR: [
            {
              accountCreditadeId: accountThatWeRLookingFor?.id,
            },
            { accountDebitadeId: accountThatWeRLookingFor?.id },
          ],
        },
      });

      return res.status(200).send(transactions);
    }
  );

  fastify.post(
    "/transactions",
    { onRequest: [authenticate] },
    async (req, res) => {
      const usernameCashOut: string = req.user.username;

      const createTransaction = z.object({
        usernameCashIn: z.string(),
        valueTransfered: z.number(),
      });

      const { usernameCashIn, valueTransfered } = createTransaction.parse(
        req.body
      );

      if (usernameCashOut === usernameCashIn) {
        return res
          .status(401)
          .send("A transação não ocorreu. Não deposite para si mesmo");
      }

      const userCashIn = await prisma.users.findFirst({
        where: {
          username: usernameCashIn,
        },
      });
      if (!userCashIn) {
        return res.status(401).send(`Usuário ${usernameCashIn} não existe`);
      }

      const userCashOut = await prisma.users.findFirst({
        where: {
          username: usernameCashOut,
        },
      });
      if (!userCashOut)
        return res.status(401).send(`Usuário ${usernameCashOut} não existe`);

      const userCashOutAccount = await prisma.accounts.findFirst({
        where: {
          id: userCashOut.accountId,
        },
      });

      /*       const balanceCashOut: number =
        userCashOutAccount.balance - valueTransfered; */

      if (userCashOutAccount!.balance - valueTransfered < 0) {
        return res
          .status(401)
          .send(
            `Usuário você não pode transferir um valor acima do seu saldo.`
          );
      } else {
        const newTransaction = await prisma.transactions.create({
          data: {
            value: valueTransfered,
            creditedAccountId: {
              connect: {
                id: userCashOut.accountId,
              },
            },
            debitedAccountId: {
              connect: {
                id: userCashIn.accountId,
              },
            },
          },
        });

        await prisma.accounts.update({
          where: {
            id: userCashOut.accountId,
          },
          data: {
            balance: userCashOutAccount!.balance - valueTransfered,
          },
        });

        const userCashInAccount = await prisma.accounts.findFirst({
          where: {
            id: userCashIn.accountId,
          },
        });

        await prisma.accounts.update({
          where: {
            id: userCashIn.accountId,
          },
          data: {
            balance: userCashInAccount!.balance + valueTransfered,
          },
        });

        return res.status(201)
          .send(`A transação ${newTransaction.id} foi realizada com sucesso.
      O usuário ${userCashOut.username} depositou ${valueTransfered} para ${userCashIn.username}.
      Balance ${userCashOut.username}: ${userCashOutAccount?.balance}
      Balance ${userCashIn.username}: ${userCashInAccount?.balance}
      `);
      }
    }
  );
}
