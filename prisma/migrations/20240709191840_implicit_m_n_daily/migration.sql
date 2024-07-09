/*
  Warnings:

  - You are about to drop the `ClaimedDaily` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClaimedDaily" DROP CONSTRAINT "ClaimedDaily_date_fkey";

-- DropForeignKey
ALTER TABLE "ClaimedDaily" DROP CONSTRAINT "ClaimedDaily_userId_fkey";

-- DropTable
DROP TABLE "ClaimedDaily";

-- CreateTable
CREATE TABLE "_DailyToUser" (
    "A" TIMESTAMP(3) NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DailyToUser_AB_unique" ON "_DailyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DailyToUser_B_index" ON "_DailyToUser"("B");

-- AddForeignKey
ALTER TABLE "_DailyToUser" ADD CONSTRAINT "_DailyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Daily"("date") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DailyToUser" ADD CONSTRAINT "_DailyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
