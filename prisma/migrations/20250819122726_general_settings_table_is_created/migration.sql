-- CreateTable
CREATE TABLE "GeneralSettings" (
    "id" SERIAL NOT NULL,
    "film_tape" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "GeneralSettings_pkey" PRIMARY KEY ("id")
);
