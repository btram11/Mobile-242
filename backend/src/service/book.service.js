"use strict";

const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { getBooks, getBookDetail, getBookListingDetail } = require("../dbs/repositories/book.repo");
const isBoughtRepo = require("../dbs/repositories/isBought.repo");
const isRentedRepo = require("../dbs/repositories/isRented.repo");

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
    return {
      status: 200,
      message: "Get books successfully",
      books: result,
    };
  }

  static async sortBy({ category, price }) {}

  static async getBookListingDetail(bookid, listingid) {
    const result = await getBookListingDetail(bookid, listingid);
    if (!result) {
      throw new BadRequestError("Book not found");
    }
    return {
      status: 200,
      message: "Get book detail successfully",
      book: result,
    };
  }

  static async getBookDetail(bookid) {
    const result = await getBookDetail(bookid);
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

  static async buyBook(bookId, listingId, data) {
    const result = await isBoughtRepo.saveBought(bookId, listingId, data);
    if (!result) {
      throw new BadRequestError("Book not found");
    }
    return {
      status: 200,
      message: "Get book detail successfully",
      book: result,
    };
  }

  static async getBuyer(bookId, listingId) {
    const result = await isBoughtRepo.getBuyer(bookId, listingId);
    if (!result) {
      throw new BadRequestError("Book not found");
    }
    return {
      status: 200,
      message: "Get book detail successfully",
      book: result,
    };
  }

  static async rentBook(bookId, listingId, data) {
    const result = await isRentedRepo.saveRented(bookId, listingId, data);
    if (!result) {
      throw new BadRequestError("Book not found");
    }
    return {
      status: 200,
      message: "Get book detail successfully",
      book: result,
    };
  }

  static async getRenter(bookId, listingId) {
    const result = await isRentedRepo.getRenter(bookId, listingId);
    if (!result) {
      throw new BadRequestError("Book not found");
    }
    return {
      status: 200,
      message: "Get book detail successfully",
      book: result,
    };
  }

}

module.exports = BookService;
