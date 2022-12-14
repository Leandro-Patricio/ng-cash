/*
  Warnings:

  - You are about to drop the column `accountsId` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_accountsId_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "accountsId",
ADD COLUMN     "accountId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_accountId_key" ON "Users"("accountId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
