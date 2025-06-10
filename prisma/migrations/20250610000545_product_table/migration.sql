-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" JSONB NOT NULL,
    "slug" TEXT NOT NULL,
    "description" JSONB NOT NULL,
    "price" INTEGER NOT NULL,
    "discount_percent" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL,
    "categories" TEXT[],
    "is_new" BOOLEAN NOT NULL DEFAULT false,
    "is_outOfStock" BOOLEAN NOT NULL DEFAULT false,
    "sizes" TEXT[],
    "colors" TEXT[],
    "images" JSONB NOT NULL,
    "stock" JSONB NOT NULL,
    "lists" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_slug_key" ON "Products"("slug");

-- CreateIndex
CREATE INDEX "Products_slug_idx" ON "Products"("slug");

-- CreateIndex
CREATE INDEX "Products_type_idx" ON "Products"("type");
