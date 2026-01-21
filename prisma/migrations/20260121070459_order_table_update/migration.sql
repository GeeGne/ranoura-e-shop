/*
  Warnings:

  - The values [PROCESSSING] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `cancelled_at` on the `UserOrders` table. All the data in the column will be lost.
  - You are about to drop the column `completed_at` on the `UserOrders` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `UserOrders` table. All the data in the column will be lost.
  - You are about to drop the column `customer_full_name` on the `UserOrders` table. All the data in the column will be lost.
  - You are about to drop the column `customer_pfp` on the `UserOrders` table. All the data in the column will be lost.
  - You are about to drop the column `customer_phone_number` on the `UserOrders` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `UserOrders` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `UserOrders` table. All the data in the column will be lost.
  - You are about to drop the column `products` on the `UserOrders` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address` on the `UserOrders` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_cost` on the `UserOrders` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `UserOrders` table. All the data in the column will be lost.
  - You are about to drop the column `total_items` on the `UserOrders` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `UserOrders` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'ONDELIVERY', 'SHIPPED', 'DELIVERED', 'CANCELED', 'REFUNDED');
ALTER TABLE "UserOrders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "UserOrders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "UserOrders" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropIndex
DROP INDEX "UserOrders_created_at_idx";

-- AlterTable
ALTER TABLE "UserOrders" DROP COLUMN "cancelled_at",
DROP COLUMN "completed_at",
DROP COLUMN "created_at",
DROP COLUMN "customer_full_name",
DROP COLUMN "customer_pfp",
DROP COLUMN "customer_phone_number",
DROP COLUMN "email",
DROP COLUMN "payment_method",
DROP COLUMN "products",
DROP COLUMN "shipping_address",
DROP COLUMN "shipping_cost",
DROP COLUMN "total",
DROP COLUMN "total_items",
DROP COLUMN "updated_at",
ADD COLUMN     "customer_snapshot" JSONB,
ADD COLUMN     "discount" JSONB,
ADD COLUMN     "items" JSONB,
ADD COLUMN     "payment" JSONB,
ADD COLUMN     "pricing" JSONB,
ADD COLUMN     "shipping" JSONB,
ADD COLUMN     "status_history" JSONB,
ADD COLUMN     "timestamps" JSONB;
