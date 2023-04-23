-- CreateTable
CREATE TABLE "commands" (
    "id" SERIAL NOT NULL,
    "cooldown" INTEGER,
    "cost" INTEGER,
    "description" VARCHAR(255) NOT NULL,
    "game" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "uses" INTEGER,
    "access_scope" VARCHAR(255),

    CONSTRAINT "commands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL,
    "amount_relativ" BOOLEAN NOT NULL,
    "cooldown" INTEGER,
    "description" VARCHAR(255) NOT NULL,
    "los_amount" INTEGER NOT NULL,
    "los_chance" INTEGER,
    "max_set_amount" INTEGER,
    "min_set_amount" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "used_at" TIMESTAMP(6),
    "win_amount" INTEGER NOT NULL,
    "win_chance" INTEGER NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventmessage" (
    "id" SERIAL NOT NULL,
    "start_msg" VARCHAR(255),

    CONSTRAINT "eventmessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_command" (
    "command_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "used_at" TIMESTAMP(6),

    CONSTRAINT "user_command_pkey" PRIMARY KEY ("command_id","user_id")
);

-- CreateTable
CREATE TABLE "usernames" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255),

    CONSTRAINT "usernames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watchers" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN,
    "name" VARCHAR(255) NOT NULL,
    "points" INTEGER,

    CONSTRAINT "watchers_pkey" PRIMARY KEY ("id")
);

