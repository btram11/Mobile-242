const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
  // Seed user data
  const user = require("./data/users.json");
  await prisma.user.createMany({
    data: user,
  });

  // Seed other data
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
