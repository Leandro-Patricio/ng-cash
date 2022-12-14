/*
  Warnings:

  - You are about to drop the column `accountsCreditadeId` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `accountsDebitadeId` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `accountCreditadeId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountDebitadeId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_accountsCreditadeId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_accountsDebitadeId_fkey";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "accountsCreditadeId",
DROP COLUMN "accountsDebitadeId",
ADD COLUMN     "accountCreditadeId" TEXT NOT NULL,
ADD COLUMN     "accountDebitadeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountCreditadeId_fkey" FOREIGN KEY ("accountCreditadeId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountDebitadeId_fkey" FOREIGN KEY ("accountDebitadeId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
