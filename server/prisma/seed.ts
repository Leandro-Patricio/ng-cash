import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.users.create({
    data: {
      username: "Teste1",
      password: "123",

      accountIdFK: {
        create: {
          balance: 200,
        },
      },
    },
  });

  const user2 = await prisma.users.create({
    data: {
      username: "Teste2",
      password: "123",

      accountIdFK: {
        create: {
          balance: 300,
        },
      },
    },
  });

  /* const account1 = await prisma.accounts.create({
    data: {
      users: {
        connect: { id: user1.id },
      },
    },
  });

  const account2 = await prisma.accounts.create({
    data: {
      users: {
        connect: { id: user2.id },
      },
    },
  }); */

  const transaction1to2 = await prisma.transactions.create({
    data: {
      value: 150,

      creditedAccountId: {
        connect: {
          id: user1.accountId,
        },
      },

      debitedAccountId: {
        connect: {
          id: user2.accountId,
        },
      },
    },
  });

  const transaction2to1 = await prisma.transactions.create({
    data: {
      value: 30,

      creditedAccountId: {
        connect: {
          id: user2.accountId,
        },
      },

      debitedAccountId: {
        connect: {
          id: user1.accountId,
        },
      },
    },
  });
}

main();
