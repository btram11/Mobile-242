"use strict";

const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { getBooks, getBookDetail } = require("../dbs/repositories/book.repo");

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
