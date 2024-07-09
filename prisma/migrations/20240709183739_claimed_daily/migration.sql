-- CreateTable
CREATE TABLE "ClaimedDaily" (
    "date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ClaimedDaily_pkey" PRIMARY KEY ("date","userId")
);

-- AddForeignKey
ALTER TABLE "ClaimedDaily" ADD CONSTRAINT "ClaimedDaily_date_fkey" FOREIGN KEY ("date") REFERENCES "Daily"("date") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimedDaily" ADD CONSTRAINT "ClaimedDaily_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
