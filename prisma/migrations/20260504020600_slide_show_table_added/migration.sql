-- CreateTable
CREATE TABLE "SLideShow" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "alt" TEXT NOT NULL DEFAULT '',
    "img_sm" TEXT,
    "img_md" TEXT,
    "img_lg" TEXT,
    "url" TEXT,

    CONSTRAINT "SLideShow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SLideShow_order_key" ON "SLideShow"("order");
