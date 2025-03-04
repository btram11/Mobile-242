const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getBooks = async (page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const result = await prisma.database_book
    .findMany({
      skip: skip,
      take: take,
    })
    .catch((error) => {
      console.error(error);
    });

  return result;
};

const searchBook = async (filters) => {
  const result = await prisma.database_book
    .findMany({
      where: filters,
    })
    .catch((error) => console.error(error));

  return result;
};

const sortBy = async (filters) => {};

module.exports = { getBooks, searchBook };
