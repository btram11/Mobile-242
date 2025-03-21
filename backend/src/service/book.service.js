"use strict";

const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { getBooks, searchBook, getBookDetail } = require("../dbs/repositories/book.repo");

class BookService {
  // static async getBooks({ page, pageSize }) {
  //   const result = await getBooks(page, pageSize);
  //   if (!result) {
  //     throw new BadRequestError("Book not found");
  //   }

  //   return {
  //     status: 200,
  //     message: "Get books successfully",
  //     books: result,
  //   };
  // }

  static async getBooks(
    page = 1,
    pageSize = 10,
    isSold = null,
    isLeased = null,
    keyword = null,
    sortby = ""
  ) {
    const result = await getBooks(
      page,
      pageSize,
      isSold,
      isLeased,
      keyword,
      sortby
    );
    if (!result) {
      throw new BadRequestError("Book not found");
    }
    return result;
  }

  static async searchBook(title=null, author=null, keywords=null, subject=null) {
    console.log(title)
    const filters = {};
    if (title) {
      filters.title = {
        contains: title,
        mode: "insensitive",
      };
    }

    if (author) {
      filters.author = {
        contains: author,
        mode: "insensitive",
      };
    }

    if (keywords) {
    // any of title, author, summary, subject contains any of the keywords
      filters.OR = [
        {
          title: {
            contains: keywords,
            mode: "insensitive",
          },
        },
        {
          author: {
            contains: keywords,
            mode: "insensitive",
          },
        },
        {
          summary: {
            contains: keywords,
            mode: "insensitive",
          },
        },
        {
          subject: {
            contains: keywords,
            mode: "insensitive",
          },
        },
      ];
    }

    if (subject) {
      filters.subject = {
        contains: subject,
        mode: "insensitive",
      };
    }

    const books = await searchBook(filters);
    if (!books) {
      throw new BadRequestError("Book not found");
    }

    return {
      status: 200,
      message: "Search Book Successfully",
      books: books,
    };
  }

  static async sortBy({ category, price }) {}

  static async getBookDetail(bookid, listingid) {
    const result = await getBookDetail(bookid, listingid);
    if (!result) {
      throw new BadRequestError("Book not found");
    }
    return {
      status: 200,
      message: "Get book detail successfully",
      book: result,
    };
  }

  static getBookByProvider(id) {

  }
}

module.exports = BookService;
