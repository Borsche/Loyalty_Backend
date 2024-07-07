/*
  Warnings:

  - The primary key for the `watchers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `watchers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date]` on the table `dailys` will be added. If there are existing duplicate values, this will fail.
  - Made the column `active` on table `watchers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `points` on table `watchers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "watchers" DROP CONSTRAINT "watchers_pkey",
DROP COLUMN "id",
ALTER COLUMN "active" SET NOT NULL,
ALTER COLUMN "active" SET DEFAULT false,
ALTER COLUMN "points" SET NOT NULL,
ALTER COLUMN "points" SET DEFAULT 0,
ADD CONSTRAINT "watchers_pkey" PRIMARY KEY ("name");

-- CreateIndex
CREATE UNIQUE INDEX "dailys_date_key" ON "dailys"("date");
