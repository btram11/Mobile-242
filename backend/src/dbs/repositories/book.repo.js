const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// const getBooks = async (page, pageSize) => {
//   const skip = (page - 1) * pageSize;
//   const take = pageSize;
//   const result = await prisma.database_book
//     .findMany({
//       skip: skip,
//       take: take,
//     })
//     .catch((error) => {
//       console.error(error);
//     });

//   return result;
// };

const getBooks = async (
  page,
  pageSize,
  isSold,
  isLeased,
  keyword = null,
  sortby = ""
) => {
  // Limit offset
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  let joinCondition = {};
  let orderBy = {};

  // Sold or leased
  if (isSold || isLeased) {
    joinCondition.listed_books = {
      some: {
        ...(isSold && { is_sold: isSold }),
        ...(isLeased && { is_leased: isLeased }),
      },
    };
  }

  // Search keyword
  if (keyword) {
    joinCondition.OR = [
      {
        title: { search: keyword },
      },
      {
        subject: { search: keyword },
      },
      {
        summary: { search: keyword },
      },
    ];
    if (!sortby) sortby = "relevance";
    orderBy._relevance = {
      fields: ["title", "subject", "summary"],
      search: keyword,
      sort: "asc",
    };
  }

  const result = await prisma.database_book.findMany({
    relationLoadStrategy: "join",
    skip: skip,
    take: take,
    where: joinCondition,
    orderBy: orderBy,
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

const getBookDetail = async (bookid, listingid) => {
  const result = await prisma.listed_book.findFirst({
    relationLoadStrategy: 'join',
    where: {
      book_id: bookid,
      listing_id: listingid,
    },
    include: {
      book: true,
    },
  });

  return result;
};

const sortBy = async (filters) => {};

module.exports = { getBooks, searchBook, getBookDetail };
