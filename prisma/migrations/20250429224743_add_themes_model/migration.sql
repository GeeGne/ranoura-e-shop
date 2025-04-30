-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Themes" (
    "id" SERIAL NOT NULL,
    "primary_color" TEXT NOT NULL DEFAULT '#0a0908',
    "primary_invert_color" TEXT NOT NULL DEFAULT '#F1EFEF',
    "secondary_color" TEXT NOT NULL DEFAULT '#22333b',
    "secondary_invert_color" TEXT NOT NULL DEFAULT '#D0D0D0',
    "inbetween_color" TEXT NOT NULL DEFAULT '#9999a1',
    "content_color" TEXT NOT NULL DEFAULT 'oklch(0.473 0.137 46.201)',
    "content_invert_color" TEXT NOT NULL DEFAULT 'oklch(0.473 0.137 46.201)',
    "content_inbetween_color" TEXT NOT NULL DEFAULT 'oklch(0.924 0.12 95.746)',

    CONSTRAINT "Themes_pkey" PRIMARY KEY ("id")
);
