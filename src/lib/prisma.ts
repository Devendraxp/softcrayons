import { PrismaClient } from "../../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as { prisma: ReturnType<typeof createPrismaClient> };

function createPrismaClient() {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL environment variable is not set");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new PrismaClient({ datasourceUrl: process.env.DATABASE_URL } as any).$extends(withAccelerate());
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;