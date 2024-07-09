/*
  Warnings:

  - The primary key for the `Daily` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Daily` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Daily_date_key";

-- AlterTable
ALTER TABLE "Daily" DROP CONSTRAINT "Daily_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Daily_pkey" PRIMARY KEY ("date");
