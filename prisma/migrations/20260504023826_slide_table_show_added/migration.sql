/*
  Warnings:

  - You are about to drop the `SLideShow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SLideShow";

-- CreateTable
CREATE TABLE "SlideShow" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "alt" TEXT NOT NULL DEFAULT '',
    "img_sm" TEXT,
    "img_md" TEXT,
    "img_lg" TEXT,
    "url" TEXT,

    CONSTRAINT "SlideShow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SlideShow_order_key" ON "SlideShow"("order");
