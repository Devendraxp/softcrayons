import "dotenv/config";
import { PrismaClient } from '../../generated/prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const accelerateUrl = process.env.DATABASE_URL
  if (!accelerateUrl) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  return new PrismaClient({
    accelerateUrl,
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma