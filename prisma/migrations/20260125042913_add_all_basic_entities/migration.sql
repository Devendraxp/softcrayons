-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "avatar" TEXT,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "courseId" INTEGER,
    "message" TEXT,
    "note" TEXT,
    "remark" TEXT,
    "assignedToId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "assignedAt" DATETIME,
    "agentId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Enquiry_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Enquiry_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Enquiry_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FacultyEnquiry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "resume" TEXT,
    "availableDate" DATETIME,
    "message" TEXT,
    "note" TEXT,
    "remark" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CourseCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" JSONB,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "categoryId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "about" TEXT,
    "fees" REAL,
    "discount" REAL,
    "duration" TEXT,
    "difficulty" TEXT NOT NULL DEFAULT 'BEGINNER',
    "topics" JSONB,
    "bannerImage" TEXT,
    "thumbnailImage" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" JSONB,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CourseCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BlogCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "authorId" INTEGER NOT NULL,
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
    CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Blog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BlogCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Placement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentName" TEXT NOT NULL,
    "avatar" TEXT,
    "courseName" TEXT NOT NULL,
    "dialogue" TEXT,
    "packageOffered" TEXT,
    "companyName" TEXT,
    "position" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentName" TEXT NOT NULL,
    "avatar" TEXT,
    "rating" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "FaQCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FAQ_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FaQCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "designation" TEXT,
    "domain" TEXT,
    "avatar" TEXT,
    "bio" TEXT,
    "experience" TEXT,
    "ProjectsHandled" TEXT,
    "studentsMentored" TEXT,
    "ratings" REAL,
    "technologies" JSONB,
    "locations" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCategory_title_key" ON "CourseCategory"("title");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCategory_slug_key" ON "CourseCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategory_title_key" ON "BlogCategory"("title");

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategory_slug_key" ON "BlogCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FaQCategory_title_key" ON "FaQCategory"("title");

-- CreateIndex
CREATE UNIQUE INDEX "FaQCategory_slug_key" ON "FaQCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FAQ_slug_key" ON "FAQ"("slug");
