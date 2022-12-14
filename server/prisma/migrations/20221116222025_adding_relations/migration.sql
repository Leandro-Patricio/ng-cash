/*
  Warnings:

  - Added the required column `accountsCreditadeId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountsDebitadeId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accounts" ALTER COLUMN "balance" SET DEFAULT 100;

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "accountsCreditadeId" TEXT NOT NULL,
ADD COLUMN     "accountsDebitadeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "accountsId" TEXT;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_accountsId_fkey" FOREIGN KEY ("accountsId") REFERENCES "Accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountsCreditadeId_fkey" FOREIGN KEY ("accountsCreditadeId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountsDebitadeId_fkey" FOREIGN KEY ("accountsDebitadeId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
