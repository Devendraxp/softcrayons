/*
  Warnings:

  - You are about to drop the `FAQ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FaQCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "FAQ_slug_key";

-- DropIndex
DROP INDEX "FaQCategory_slug_key";

-- DropIndex
DROP INDEX "FaQCategory_title_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FAQ";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FaQCategory";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FaqCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Faq_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FaqCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FacultyEnquiry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "resume" TEXT,
    "availableDate" DATETIME,
    "message" TEXT,
    "note" TEXT,
    "remark" TEXT,
    "assignedToId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FacultyEnquiry_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FacultyEnquiry" ("availableDate", "createdAt", "email", "id", "message", "name", "note", "phone", "remark", "resume", "status", "updatedAt") SELECT "availableDate", "createdAt", "email", "id", "message", "name", "note", "phone", "remark", "resume", "status", "updatedAt" FROM "FacultyEnquiry";
DROP TABLE "FacultyEnquiry";
ALTER TABLE "new_FacultyEnquiry" RENAME TO "FacultyEnquiry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "FaqCategory_title_key" ON "FaqCategory"("title");

-- CreateIndex
CREATE UNIQUE INDEX "FaqCategory_slug_key" ON "FaqCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Faq_slug_key" ON "Faq"("slug");
