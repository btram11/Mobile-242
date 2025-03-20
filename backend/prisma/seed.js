const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
  const tables = ["user", "provider", "database_book", "listed_book"];
  for (const table of tables.slice().reverse()) {
    await prisma[table].deleteMany();
  }

  for (const table of tables) {
    await prisma[table].createMany({
      data: require(`./data/${table}.json`),
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
