-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL DEFAULT '{"en": "Unknown Name", "ar": "مجهول الاسم"}',
    "slug" TEXT NOT NULL,
    "navbarImg" TEXT,
    "navbarLgImg" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategoires" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL DEFAULT '{"en": "Unknown Name", "ar": "مجهول الاسم"}',
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "SubCategoires_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_slug_key" ON "Categories"("slug");
