import { prisma } from "../src/lib/prisma";

async function main() {
  const email = process.argv[2];

  if (!email) {
    // List all users if no email provided
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    console.log("\n📋 All users:");
    console.table(users);
    console.log("\nUsage: npx tsx prisma/make-admin.ts <email>");
    return;
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error(`❌ User not found: ${email}`);
    return;
  }

  if (user.role === "ADMIN") {
    console.log(`✅ User ${email} is already an admin`);
    return;
  }

  await prisma.user.update({
    where: { email },
    data: { role: "ADMIN" },
  });

  console.log(`✅ User ${email} is now an ADMIN`);
}

main()
  .catch((e) => {
    console.error("❌ Failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
