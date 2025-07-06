/*
  Warnings:

  - You are about to drop the column `is_outOfStock` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "is_outOfStock",
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'available';
