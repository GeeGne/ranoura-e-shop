/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `SubCategoires` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SubCategoires_slug_key" ON "SubCategoires"("slug");
