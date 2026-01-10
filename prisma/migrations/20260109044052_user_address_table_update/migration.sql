-- AlterTable
ALTER TABLE "UserAddress" ADD COLUMN     "city" TEXT,
ALTER COLUMN "address_details" DROP NOT NULL;
