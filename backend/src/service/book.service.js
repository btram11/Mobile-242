"use strict";

const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { getBooks, searchBook } = require("../dbs/repositories/book.repo");

class BookService {
  static async getBooks({ page, pageSize }) {
    const result = await getBooks(parseInt(page), parseInt(pageSize));
    if (!result) {
      throw new BadRequestError("Book not found");
    }

    return {
      status: 200,
      message: "Get books successfully",
      books: result,
    };
  }
  static async searchBook({ title, author, keywords, category }) {
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
      filters.keywords = {
        contains: keywords,
        mode: "insensitive",
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
