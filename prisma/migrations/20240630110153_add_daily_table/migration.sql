-- CreateEnum
CREATE TYPE "Reward" AS ENUM ('POINTS', 'SPIN', 'SCRATCH');

-- CreateTable
CREATE TABLE "dailys" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reward" "Reward" NOT NULL DEFAULT 'POINTS',
    "amount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "dailys_pkey" PRIMARY KEY ("id")
);
