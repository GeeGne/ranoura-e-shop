-- AlterTable
CREATE SEQUENCE slideshow_order_seq;
ALTER TABLE "SlideShow" ALTER COLUMN "order" SET DEFAULT nextval('slideshow_order_seq');
ALTER SEQUENCE slideshow_order_seq OWNED BY "SlideShow"."order";
