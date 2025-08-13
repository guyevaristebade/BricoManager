/*
  Warnings:

  - Added the required column `toolDescription` to the `Tool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Tool" ADD COLUMN     "toolDescription" TEXT NOT NULL;
