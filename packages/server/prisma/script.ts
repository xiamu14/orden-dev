import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
  console.log("CREATING USER");
  const user = await prisma.pipelineGroup.create({
    data: {
      name: "Alice",
    },
  });
  console.log("USER CREATED", user);

  await prisma.$disconnect();
} catch (error) {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
}
