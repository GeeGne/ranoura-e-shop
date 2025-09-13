-- CreateTable
CREATE TABLE "HeroVideo" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "mp4_url" TEXT,
    "webm_url" TEXT,
    "poster_url" TEXT,
    "mute" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "HeroVideo_pkey" PRIMARY KEY ("id")
);
