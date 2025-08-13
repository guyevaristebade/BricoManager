-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."ToolStatus" AS ENUM ('AVAILABLE', 'LOANNED', 'BROKEN', 'LOST');

-- CreateEnum
CREATE TYPE "public"."LoanStatus" AS ENUM ('IN_PROGRESS', 'RETURNED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."LoanItemStatus" AS ENUM ('LOANNED', 'RETURNED', 'LOST');

-- CreateEnum
CREATE TYPE "public"."ProjectStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "loginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "darkMode" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectStatus" "public"."ProjectStatus" NOT NULL DEFAULT 'PLANNED',
    "projectDescription" TEXT NOT NULL,
    "projectStartDate" TIMESTAMP(3) NOT NULL,
    "projectEndDate" TIMESTAMP(3),
    "projectBudget" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProjectImage" (
    "id" TEXT NOT NULL,
    "ProjectId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ProjectImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tool" (
    "id" TEXT NOT NULL,
    "toolName" TEXT NOT NULL,
    "toolCategoryId" TEXT NOT NULL,
    "toolStatus" "public"."ToolStatus" NOT NULL DEFAULT 'AVAILABLE',
    "nbLoaning" INTEGER NOT NULL,
    "toolPrice" DOUBLE PRECISION NOT NULL,
    "locationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Location" (
    "id" TEXT NOT NULL,
    "locationName" TEXT NOT NULL,
    "locationImgUrl" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ToolImage" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ToolImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Borrower" (
    "id" TEXT NOT NULL,
    "BorrowerName" TEXT NOT NULL,
    "BorrowerAdress" TEXT NOT NULL,
    "BorrowerTel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Borrower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Loan" (
    "id" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "loanStatus" "public"."LoanStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "loanDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LoanCartItem" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "itemStatus" "public"."LoanItemStatus" NOT NULL DEFAULT 'LOANNED',
    "LoanDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMP(3),

    CONSTRAINT "LoanCartItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_refreshToken_key" ON "public"."User"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_key" ON "public"."User"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "public"."UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "public"."UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProjectImage" ADD CONSTRAINT "ProjectImage_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tool" ADD CONSTRAINT "Tool_toolCategoryId_fkey" FOREIGN KEY ("toolCategoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tool" ADD CONSTRAINT "Tool_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ToolImage" ADD CONSTRAINT "ToolImage_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "public"."Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Loan" ADD CONSTRAINT "Loan_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "public"."Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LoanCartItem" ADD CONSTRAINT "LoanCartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "public"."Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LoanCartItem" ADD CONSTRAINT "LoanCartItem_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "public"."Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
