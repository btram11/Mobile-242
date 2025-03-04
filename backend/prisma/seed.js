const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
  // Seed user data
  // const user = require("./data/users.json");
  // await prisma.user.createMany({
  //   data: user,
  // });

  const tables = ["user", "database_book"];
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
