/*
  Warnings:

  - Made the column `toolPublicId` on table `Tool` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Tool" ALTER COLUMN "toolPublicId" SET NOT NULL;
