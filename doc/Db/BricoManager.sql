CREATE TYPE "Role" AS ENUM (
  'USER',
  'ADMIN'
);

CREATE TYPE "ToolStatus" AS ENUM (
  'AVAILABLE',
  'LOANNED',
  'BROKEN',
  'LOST'
);

CREATE TYPE "LoanStatus" AS ENUM (
  'IN_PROGRESS',
  'RETURNED',
  'CANCELLED'
);

CREATE TYPE "LoanItemStatus" AS ENUM (
  'LOANNED',
  'RETURNED',
  'LOST'
);

CREATE TYPE "ProjectStatus" AS ENUM (
  'PLANNED',
  'IN_PROGRESS',
  'COMPLETED'
);

CREATE TABLE "User" (
  "id" "String" PRIMARY KEY,
  "username" string,
  "role" "Role" DEFAULT 'USER',
  "refreshToken" "String",
  "createdAt" "DateTime" DEFAULT (now()),
  "updateAt" "DateTime",
  "loginAt" "DateTime" DEFAULT (now()),
  "profileId" "String" UNIQUE
);

CREATE TABLE "UserProfile" (
  "id" "String" PRIMARY KEY,
  "userId" "String" UNIQUE,
  "avatarUrl" "String",
  "darkMode" Boolean DEFAULT false,
  "createdAt" "DateTime" DEFAULT (now())
);

CREATE TABLE "Project" (
  "id" "String" PRIMARY KEY,
  "userId" "String",
  "projectName" "String",
  "projectStatus" "ProjectStatus",
  "projectDescription" "String",
  "projectStartDate" "DateTime",
  "projectEndDate" "DateTime",
  "images" "ProjectImage[]",
  "createdAt" "DateTime" DEFAULT (now())
);

CREATE TABLE "ProjectImage" (
  "id" "String",
  "ProjectId" "String",
  "url" "String"
);

CREATE TABLE "Tool" (
  "id" "String" PRIMARY KEY,
  "toolName" "String",
  "toolCategoryId" "String" UNIQUE,
  "toolStatus" "ToolStatus" DEFAULT 'AVAILABLE',
  "nbBorrowing" Int,
  "locationId" "String",
  "LoanCartItem" "LoanCartItem[]",
  "images" "ToolImage[]",
  "createdAt" "DateTime",
  "updatedAt" "DateTime"
);

CREATE TABLE "ToolImage" (
  "id" "String" PRIMARY KEY,
  "toolId" "String",
  "url" "String"
);

CREATE TABLE "Location" (
  "id" "String" PRIMARY KEY,
  "locationName" "String",
  "locationImgUrl" "String",
  "tools" "Tool[]"
);

CREATE TABLE "Category" (
  "id" "String" PRIMARY KEY,
  "categoryName" "String",
  "tools" "Tool[]"
);

CREATE TABLE "Borrower" (
  "id" "String" PRIMARY KEY,
  "BorrowerName" "String",
  "BorrowerAdress" "String",
  "BorrowerTel" "String",
  "createdAt" "DateTime",
  "Loan" "Loan[]"
);

CREATE TABLE "Loan" (
  "id" "String" PRIMARY KEY,
  "borrowerId" "String",
  "items" "LoanCartItem[]",
  "loanStatus" "LoanStatus" DEFAULT 'IN_PROGRESS',
  "loanDate" "DateTime",
  "returnDate" "DateTime",
  "createdAt" "DateTime",
  "updateAt" "DateTime"
);

CREATE TABLE "LoanCartItem" (
  "id" "String" PRIMARY KEY,
  "toolId" "String",
  "cartId" "String",
  "itemStatus" "LoanItemStatus" DEFAULT 'LOANNED',
  "LoanDate" "DateTime",
  "returnDate" "DateTime"
);

ALTER TABLE "LoanCartItem" ADD FOREIGN KEY ("toolId") REFERENCES "Tool" ("id");

ALTER TABLE "LoanCartItem" ADD FOREIGN KEY ("cartId") REFERENCES "Loan" ("id");

ALTER TABLE "Loan" ADD FOREIGN KEY ("borrowerId") REFERENCES "Borrower" ("id");

ALTER TABLE "Category" ADD FOREIGN KEY ("id") REFERENCES "Tool" ("toolCategoryId");

ALTER TABLE "ToolImage" ADD FOREIGN KEY ("toolId") REFERENCES "Tool" ("id");

ALTER TABLE "Tool" ADD FOREIGN KEY ("locationId") REFERENCES "Location" ("id");

ALTER TABLE "ProjectImage" ADD FOREIGN KEY ("ProjectId") REFERENCES "Project" ("id");

ALTER TABLE "Project" ADD FOREIGN KEY ("userId") REFERENCES "User" ("id");

ALTER TABLE "User" ADD FOREIGN KEY ("id") REFERENCES "UserProfile" ("userId");
