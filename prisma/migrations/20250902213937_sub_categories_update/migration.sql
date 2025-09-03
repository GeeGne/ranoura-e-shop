-- AlterTable
ALTER TABLE "SubCategories" ADD COLUMN     "path" TEXT NOT NULL DEFAULT 'path';

-- CreateIndex
CREATE INDEX "SubCategories_slug_idx" ON "SubCategories"("slug");
