-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Faq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Faq_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FaqCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Faq" ("answer", "categoryId", "createdAt", "id", "isPublic", "question", "slug", "updatedAt") SELECT "answer", "categoryId", "createdAt", "id", "isPublic", "question", "slug", "updatedAt" FROM "Faq";
DROP TABLE "Faq";
ALTER TABLE "new_Faq" RENAME TO "Faq";
CREATE UNIQUE INDEX "Faq_slug_key" ON "Faq"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
