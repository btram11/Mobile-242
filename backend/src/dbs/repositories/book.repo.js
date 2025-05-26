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
    // only take books with keywords in these fields
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
    if (!sortby) sortby = "relevance"; // sort by relevance
    orderBy._relevance = {
      fields: ["title", "subject", "summary"],
      search: keyword,
      sort: "asc",
    };
  }

  // const result = await prisma.database_book.findMany({
  //   relationLoadStrategy: "join",
  //   skip: skip,
  //   take: take,
  //   where: joinCondition,
  //   orderBy: orderBy,
  // });
  const books = await prisma.database_book.findMany({
    relationLoadStrategy: "join",
    skip,
    take,
    where: joinCondition,
    orderBy,
    include: {
      listed_books: {
        where: {
          ...(isSold && { is_sold: true }),
          ...(isLeased && { is_leased: true }),
        },
        orderBy: {
          listed_at: "desc",
        },
        take: 1, // Only get the most recent listing
      },
    },
  });

  const result = books.map((book) => {
    const listing = book.listed_books[0];

    return {
      book_id: book.book_id,
      title: book.title,
      img_url: book.img_url,
      author: book.author,
      publisher: book.publisher,
      publishing_year: book.publishing_year,
      subject: book.subject,
      summary: book.summary,
      sold_price: listing?.is_sold ? listing?.sold_price : null,
      leased_price: listing?.is_leased ? listing?.leased_price : null,
      listing_id: listing?.listing_id ? listing?.listing_id : null,
    };
  });

  return result;
};

const getBookListingDetail = async (bookid, listingid) => {
  const result = await prisma.listed_book.findFirst({
    relationLoadStrategy: "join",
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

const getBookDetail = async (bookid) => {
  const result = await prisma.database_book.findFirst({
    relationLoadStrategy: "join",
    where: {
      book_id: bookid,
    },
    include: {
      listed_books: {
        include: {
          provider: {
            select: {
              user: {
                select: {
                  user_id: true,
                  username: true,
                  email: true,
                  phone_number: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return result;
};

const getSimilarBooks = async (bookId, page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const book = await prisma.database_book.findUnique({
    where: { book_id: bookId },
    select: { category: true },
  });

  if (!book) {
    throw new Error("Book not found");
  }

  const result = await prisma.database_book.findMany({
    relationLoadStrategy: "join",
    where: {
      category: book.category,
      book_id: { not: bookId }, // Exclude the current book
    },
    skip,
    take,
  });

  return result;
}

const getListings = async (bookId, buyerId, sellerId, leaserId, renterId) => {
  const whereCondition = {};
  const includeCondition = {
    provider: true,
  };

  if (bookId) {
    whereCondition.book_id = bookId;
  }
  if (buyerId) {
    whereCondition.is_bought_rel = {
      user_id: buyerId,
    };
    includeCondition.is_bought_rel = true;
  }
  if (sellerId) {
    whereCondition.provider_id = sellerId;
    where
  }
  if (leaserId) {
    whereCondition.provider_id = leaserId;
  }
  if (renterId) {
    whereCondition.is_rented_rel = {
      user_id: renterId,
    };
    includeCondition.is_rented_rel = true;
  }


  const result = await prisma.listed_book.findMany({
    relationLoadStrategy: "join",
    where: whereCondition,
    include: includeCondition,
  });

  return result;
}

const saveListing = async (bookId, listing) => {
  const { provider_id, ...data } = listing;
  const result = await prisma.listed_book.create({
    data: {
      ...data,
      book: { connect: { book_id: bookId } },
      provider: { connect: { provider_id: listing.provider_id } },
    },
  });

  return result;
}

const deleteListing = async (bookId, listingId) => {
  const result = await prisma.listed_book.delete({
    where: {
      book_id_listing_id: {
        book_id: bookId,
        listing_id: listingId,
      },
    },
  });

  return result;
};

module.exports = { getBooks, getBookDetail, getBookListingDetail, saveListing, deleteListing, getListings, getSimilarBooks };
