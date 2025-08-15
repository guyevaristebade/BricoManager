/*
  Warnings:

  - You are about to drop the `ToolImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `toolImageUrl` to the `Tool` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ToolImage" DROP CONSTRAINT "ToolImage_toolId_fkey";

-- AlterTable
ALTER TABLE "public"."ProjectImage" ADD COLUMN     "public_id" TEXT;

-- AlterTable
ALTER TABLE "public"."Tool" ADD COLUMN     "toolImageUrl" TEXT NOT NULL,
ADD COLUMN     "toolPublicId" TEXT;

-- AlterTable
ALTER TABLE "public"."UserProfile" ADD COLUMN     "public_id" TEXT;

-- DropTable
DROP TABLE "public"."ToolImage";
