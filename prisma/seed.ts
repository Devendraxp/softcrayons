
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";


async function main() {
  console.log("🌱 Seeding database...");

  // Check if admin already exists
  const existingAdmin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (existingAdmin) {
    console.log("✅ Admin user already exists:", existingAdmin.email);
    return;
  }

  // Create admin user
  const hashedPassword = await hash("Admin@123", 12);

  const admin = await prisma.user.create({
    data: {
      id: "admin-001",
      name: "Admin User",
      email: "admin@softcrayons.com",
      password: hashedPassword,
      role: "ADMIN",
      emailVerified: true,
      phone: "+91-9999999999",
    },
  });

  console.log("✅ Admin user created:");
  console.log("   Email:", admin.email);
  console.log("   Password: Admin@123");
  console.log("   Role:", admin.role);

  // Create Account for Better Auth compatibility
  await prisma.account.create({
    data: {
      id: "account-admin-001",
      userId: admin.id,
      accountId: admin.id,
      providerId: "credential",
      password: hashedPassword,
    },
  });

  console.log("✅ Account created for Better Auth");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
