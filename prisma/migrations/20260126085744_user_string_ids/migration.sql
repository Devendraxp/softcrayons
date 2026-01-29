/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Blog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "authorId" TEXT NOT NULL,
    "dateOfPublish" DATETIME NOT NULL,
    "readTime" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "tags" JSONB,
    "categoryId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "tableOfContents" JSONB,
    "bannerImage" TEXT,
    "thumbnailImage" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" JSONB,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Blog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BlogCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Blog" ("authorId", "bannerImage", "categoryId", "content", "createdAt", "dateOfPublish", "description", "id", "isFeatured", "isPublic", "metaDescription", "metaKeywords", "metaTitle", "readTime", "slug", "tableOfContents", "tags", "thumbnailImage", "title", "updatedAt") SELECT "authorId", "bannerImage", "categoryId", "content", "createdAt", "dateOfPublish", "description", "id", "isFeatured", "isPublic", "metaDescription", "metaKeywords", "metaTitle", "readTime", "slug", "tableOfContents", "tags", "thumbnailImage", "title", "updatedAt" FROM "Blog";
DROP TABLE "Blog";
ALTER TABLE "new_Blog" RENAME TO "Blog";
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");
CREATE TABLE "new_Enquiry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "courseId" INTEGER,
    "message" TEXT,
    "note" TEXT,
    "remark" TEXT,
    "assignedToId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "assignedAt" DATETIME,
    "agentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Enquiry_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Enquiry_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Enquiry_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Enquiry" ("agentId", "assignedAt", "assignedToId", "courseId", "createdAt", "email", "id", "message", "name", "note", "phone", "remark", "status", "updatedAt") SELECT "agentId", "assignedAt", "assignedToId", "courseId", "createdAt", "email", "id", "message", "name", "note", "phone", "remark", "status", "updatedAt" FROM "Enquiry";
DROP TABLE "Enquiry";
ALTER TABLE "new_Enquiry" RENAME TO "Enquiry";
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
    "assignedToId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FacultyEnquiry_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FacultyEnquiry" ("assignedToId", "availableDate", "createdAt", "email", "id", "message", "name", "note", "phone", "remark", "resume", "status", "updatedAt") SELECT "assignedToId", "availableDate", "createdAt", "email", "id", "message", "name", "note", "phone", "remark", "resume", "status", "updatedAt" FROM "FacultyEnquiry";
DROP TABLE "FacultyEnquiry";
ALTER TABLE "new_FacultyEnquiry" RENAME TO "FacultyEnquiry";
CREATE TABLE "new_account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" DATETIME,
    "refreshTokenExpiresAt" DATETIME,
    "scope" TEXT,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_account" ("accessToken", "accessTokenExpiresAt", "accountId", "createdAt", "id", "idToken", "password", "providerId", "refreshToken", "refreshTokenExpiresAt", "scope", "updatedAt", "userId") SELECT "accessToken", "accessTokenExpiresAt", "accountId", "createdAt", "id", "idToken", "password", "providerId", "refreshToken", "refreshTokenExpiresAt", "scope", "updatedAt", "userId" FROM "account";
DROP TABLE "account";
ALTER TABLE "new_account" RENAME TO "account";
CREATE INDEX "account_userId_idx" ON "account"("userId");
CREATE TABLE "new_session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresAt" DATETIME NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "impersonatedBy" TEXT,
    CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_session" ("createdAt", "expiresAt", "id", "ipAddress", "token", "updatedAt", "userAgent", "userId") SELECT "createdAt", "expiresAt", "id", "ipAddress", "token", "updatedAt", "userAgent", "userId" FROM "session";
DROP TABLE "session";
ALTER TABLE "new_session" RENAME TO "session";
CREATE INDEX "session_userId_idx" ON "session"("userId");
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "banReason" TEXT,
    "banExpires" DATETIME
);
INSERT INTO "new_user" ("createdAt", "email", "emailVerified", "id", "image", "name", "password", "phone", "role", "status", "updatedAt") SELECT "createdAt", "email", "emailVerified", "id", "image", "name", "password", "phone", "role", "status", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
