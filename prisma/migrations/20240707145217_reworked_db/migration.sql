/*
  Warnings:

  - You are about to drop the `commands` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dailys` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eventmessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_command` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usernames` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `watchers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "commands";

-- DropTable
DROP TABLE "dailys";

-- DropTable
DROP TABLE "event";

-- DropTable
DROP TABLE "eventmessage";

-- DropTable
DROP TABLE "user_command";

-- DropTable
DROP TABLE "usernames";

-- DropTable
DROP TABLE "watchers";

-- CreateTable
CREATE TABLE "Command" (
    "id" SERIAL NOT NULL,
    "cooldown" INTEGER,
    "cost" INTEGER,
    "description" VARCHAR(255) NOT NULL,
    "game" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "uses" INTEGER,
    "accessScope" VARCHAR(255),

    CONSTRAINT "Command_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL,
    "amountRelativ" BOOLEAN NOT NULL,
    "cooldown" INTEGER,
    "description" VARCHAR(255) NOT NULL,
    "lossAmount" INTEGER NOT NULL,
    "lossChance" INTEGER,
    "maxSetAmount" INTEGER,
    "minSetAmount" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "usedAt" TIMESTAMP(6),
    "winAmount" INTEGER NOT NULL,
    "winChance" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eventmessage" (
    "id" SERIAL NOT NULL,
    "start_msg" VARCHAR(255),

    CONSTRAINT "Eventmessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsedCommand" (
    "commandId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "usedAt" TIMESTAMP(6),

    CONSTRAINT "UsedCommand_pkey" PRIMARY KEY ("userId","commandId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Daily" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reward" "Reward" NOT NULL DEFAULT 'POINTS',
    "amount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Daily_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Daily_date_key" ON "Daily"("date");

-- AddForeignKey
ALTER TABLE "UsedCommand" ADD CONSTRAINT "UsedCommand_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "Command"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsedCommand" ADD CONSTRAINT "UsedCommand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
