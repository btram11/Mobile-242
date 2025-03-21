const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
  const tables = ["user", "database_book"];
  for (const table of tables.reverse()) {
    await prisma[table].deleteMany();
  }
  for (const table of tables) {
    const data = require(`./data/${table}.json`);
    await prisma[table].createMany({
      data: data,
    });
  }
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
