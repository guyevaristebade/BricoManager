/*
  Warnings:

  - The values [LOANNED] on the enum `LoanItemStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [LOANNED] on the enum `ToolStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."LoanItemStatus_new" AS ENUM ('LOANED', 'RETURNED', 'LOST');
ALTER TABLE "public"."LoanCartItem" ALTER COLUMN "itemStatus" DROP DEFAULT;
ALTER TABLE "public"."LoanCartItem" ALTER COLUMN "itemStatus" TYPE "public"."LoanItemStatus_new" USING ("itemStatus"::text::"public"."LoanItemStatus_new");
ALTER TYPE "public"."LoanItemStatus" RENAME TO "LoanItemStatus_old";
ALTER TYPE "public"."LoanItemStatus_new" RENAME TO "LoanItemStatus";
DROP TYPE "public"."LoanItemStatus_old";
ALTER TABLE "public"."LoanCartItem" ALTER COLUMN "itemStatus" SET DEFAULT 'LOANED';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ToolStatus_new" AS ENUM ('AVAILABLE', 'LOANED', 'BROKEN', 'LOST');
ALTER TABLE "public"."Tool" ALTER COLUMN "toolStatus" DROP DEFAULT;
ALTER TABLE "public"."Tool" ALTER COLUMN "toolStatus" TYPE "public"."ToolStatus_new" USING ("toolStatus"::text::"public"."ToolStatus_new");
ALTER TYPE "public"."ToolStatus" RENAME TO "ToolStatus_old";
ALTER TYPE "public"."ToolStatus_new" RENAME TO "ToolStatus";
DROP TYPE "public"."ToolStatus_old";
ALTER TABLE "public"."Tool" ALTER COLUMN "toolStatus" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterTable
ALTER TABLE "public"."LoanCartItem" ALTER COLUMN "itemStatus" SET DEFAULT 'LOANED';
