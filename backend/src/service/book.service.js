"use strict";

const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { getBooks, searchBook } = require("../dbs/repositories/book.repo");

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
    pageSize = 100,
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

  static async searchBook({ title, author, keywords, category }) {
    const filters = {};
    if (title) {
      filters.title = {
        contains: title,
        mode: "intensive",
      };
    }

    if (author) {
      filters.author = {
        contains: author,
        mode: "intensive",
      };
    }

    if (keywords) {
      filters.keywords = {
        contains: keywords,
        mode: "intensive",
      };
    }

    if (category) {
      filters.category = {
        contains: category,
        mode: "intensive",
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

  static sortBy({ category, price }) {}
  static getDetailBook(id) {}
  static getBookBySeller(id) {}
  static getBookByRenter(id) {}
}

module.exports = BookService;
