-- CreateTable
CREATE TABLE "BannedUsers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT,
    "user_pfp" TEXT,

    CONSTRAINT "BannedUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BannedUsers_email_key" ON "BannedUsers"("email");
