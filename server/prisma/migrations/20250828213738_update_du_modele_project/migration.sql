/*
  Warnings:

  - You are about to drop the `ProjectImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectImage" DROP CONSTRAINT "ProjectImage_ProjectId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectImgUrl" TEXT,
ADD COLUMN     "projectProgress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "projectPublicId" TEXT;

-- DropTable
DROP TABLE "ProjectImage";
