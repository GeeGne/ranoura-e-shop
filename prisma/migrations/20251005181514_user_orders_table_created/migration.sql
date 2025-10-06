-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSSING', 'ONDELIVERY', 'SHIPPED', 'DELIVERED', 'CANCELED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "OrderPaymentMethod" AS ENUM ('CASH', 'CREDIT_CARD', 'PAYPAL', 'APPLE_PAY', 'GOGGLE_PAY', 'BANK_TRANSFER', 'CRYPTO');

-- CreateEnum
CREATE TYPE "OrderCurrency" AS ENUM ('SYP', 'USD', 'EUR');

-- CreateTable
CREATE TABLE "UserOrders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "products" JSONB NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "cancelled_at" TIMESTAMP(3),
    "customer_full_name" TEXT NOT NULL,
    "shipping_address" JSONB,
    "shipping_cost" DECIMAL(65,30) DEFAULT 0,
    "currency" "OrderCurrency" NOT NULL DEFAULT 'SYP',
    "payment_method" "OrderPaymentMethod" NOT NULL DEFAULT 'CASH',

    CONSTRAINT "UserOrders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserOrders_user_id_idx" ON "UserOrders"("user_id");

-- CreateIndex
CREATE INDEX "UserOrders_created_at_idx" ON "UserOrders"("created_at");

-- CreateIndex
CREATE INDEX "UserOrders_status_idx" ON "UserOrders"("status");

-- AddForeignKey
ALTER TABLE "UserOrders" ADD CONSTRAINT "UserOrders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
