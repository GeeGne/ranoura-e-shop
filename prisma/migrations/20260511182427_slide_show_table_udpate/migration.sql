-- DropIndex
DROP INDEX "SlideShow_order_key";

-- AlterTable
ALTER TABLE "SlideShow" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "slideshow_order_seq";
