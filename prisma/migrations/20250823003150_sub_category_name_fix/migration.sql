/*
  Warnings:

  - You are about to drop the `SubCategoires` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SubCategoires";

-- CreateTable
CREATE TABLE "SubCategories" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL DEFAULT '{"en": "Unknown Name", "ar": "مجهول الاسم"}',
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "SubCategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubCategories_slug_key" ON "SubCategories"("slug");
