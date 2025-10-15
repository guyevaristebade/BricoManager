-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ToolStatus" AS ENUM ('AVAILABLE', 'BORROWED', 'RESERVED', 'LOST', 'DAMAGED', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('IN_PROGRESS', 'PARTIALLY_RETURNED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "LoanItemStatus" AS ENUM ('TO_BE_BORROWED', 'RETURNED', 'LOST');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "loginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "public_id" TEXT,
    "darkMode" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectStatus" "ProjectStatus" NOT NULL DEFAULT 'PLANNED',
    "projectDescription" TEXT NOT NULL,
    "projectImgUrl" TEXT,
    "projectPublicId" TEXT,
    "projectProgress" INTEGER NOT NULL DEFAULT 0,
    "projectStartDate" TIMESTAMP(3) NOT NULL,
    "projectEndDate" TIMESTAMP(3),
    "projectBudget" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "toolName" TEXT NOT NULL,
    "toolCategoryId" TEXT NOT NULL,
    "toolDescription" TEXT NOT NULL,
    "toolImageUrl" TEXT NOT NULL,
    "toolPublicId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "link" TEXT,
    "toolStatus" "ToolStatus" NOT NULL DEFAULT 'AVAILABLE',
    "nbLoaning" INTEGER NOT NULL,
    "toolPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "locationName" TEXT NOT NULL,
    "locationImgUrl" TEXT,
    "locationPublicId" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Borrower" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Borrower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "loanStatus" "LoanStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "loanDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanItem" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "itemStatus" "LoanItemStatus" NOT NULL DEFAULT 'TO_BE_BORROWED',
    "loanDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_refreshToken_key" ON "User"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE INDEX "Project_userId_projectStatus_idx" ON "Project"("userId", "projectStatus");

-- CreateIndex
CREATE INDEX "Project_userId_projectStartDate_idx" ON "Project"("userId", "projectStartDate");

-- CreateIndex
CREATE INDEX "Project_userId_createdAt_idx" ON "Project"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_userId_key" ON "Project"("id", "userId");

-- CreateIndex
CREATE INDEX "Tool_userId_toolCategoryId_locationId_toolStatus_toolName_idx" ON "Tool"("userId", "toolCategoryId", "locationId", "toolStatus", "toolName");

-- CreateIndex
CREATE INDEX "Tool_userId_nbLoaning_idx" ON "Tool"("userId", "nbLoaning");

-- CreateIndex
CREATE UNIQUE INDEX "Location_id_userId_key" ON "Location"("id", "userId");

-- CreateIndex
CREATE INDEX "Borrower_userId_firstName_lastName_idx" ON "Borrower"("userId", "firstName", "lastName");

-- CreateIndex
CREATE UNIQUE INDEX "Borrower_id_userId_key" ON "Borrower"("id", "userId");

-- CreateIndex
CREATE INDEX "Loan_userId_borrowerId_loanStatus_idx" ON "Loan"("userId", "borrowerId", "loanStatus");

-- CreateIndex
CREATE INDEX "Loan_userId_borrowerId_idx" ON "Loan"("userId", "borrowerId");

-- CreateIndex
CREATE UNIQUE INDEX "Loan_id_userId_key" ON "Loan"("id", "userId");

-- CreateIndex
CREATE INDEX "LoanItem_loanId_idx" ON "LoanItem"("loanId");

-- CreateIndex
CREATE INDEX "LoanItem_toolId_idx" ON "LoanItem"("toolId");

-- CreateIndex
CREATE INDEX "LoanItem_loanId_itemStatus_idx" ON "LoanItem"("loanId", "itemStatus");

-- CreateIndex
CREATE INDEX "LoanItem_toolId_itemStatus_idx" ON "LoanItem"("toolId", "itemStatus");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_toolCategoryId_fkey" FOREIGN KEY ("toolCategoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrower" ADD CONSTRAINT "Borrower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanItem" ADD CONSTRAINT "LoanItem_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanItem" ADD CONSTRAINT "LoanItem_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
