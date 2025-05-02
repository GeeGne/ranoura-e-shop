-- AlterTable
ALTER TABLE "Themes" ADD COLUMN     "name" JSONB NOT NULL DEFAULT '{"en": "Dusk Cacoa", "ar": "كاكاو مشبع"}',
ADD COLUMN     "scheme_id" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "id" SET DEFAULT 1,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Themes_id_seq";
