"use strict";

const { BadRequestError, AuthFailureError } = require("../core/error.response");
const {
  getBooks,
  getBookDetail,
  getBookListingDetail,
  getListings: findListings,
  getSimilarBooks: findSimilarBooks,
  saveListing,
  deleteListing
} = require("../dbs/repositories/book.repo");
const isBoughtRepo = require("../dbs/repositories/isBought.repo");
const isRentedRepo = require("../dbs/repositories/isRented.repo");
const { DateTime } = require("luxon");

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
    category = null,
    sortby = ""
  ) {
    const result = await getBooks(
      page,
      pageSize,
      isSold,
      isLeased,
      keyword,
      category,
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

  static getBookByProvider(id) {}

  static async buyBook(bookId, listingId, data) {
    const result = await isBoughtRepo.saveBought(bookId, listingId, data).catch((err) => {
      throw new BadRequestError("Book already bought");
    });
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
    const pickupDate = DateTime.fromISO(data.pickup_date, { setZone: true });
    const endDate = DateTime.fromISO(data.end_date, { setZone: true });

    if (!pickupDate.isValid) {
      throw new BadRequestError("Invalid pickup date format");
    }

    if (!endDate.isValid) {
      throw new BadRequestError("Invalid end date format");
    }

    if (endDate <= pickupDate) {
      throw new BadRequestError("End date must be after pickup date");
    }

    data.pickup_date = pickupDate.toISO();
    data.end_date = endDate.toISO();

    const result = await isRentedRepo.saveRented(bookId, listingId, data).catch((err) => {
      throw new BadRequestError("Book already rented");
    });
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

  static async getListings(bookId, buyerId, sellerId, leaserId, renterId) {
    const result = await findListings(
      bookId,
      buyerId,
      sellerId,
      leaserId,
      renterId
    );
    if (!result) {
      throw new BadRequestError("Book not found");
    }
    return {
      status: 200,
      message: "Get book detail successfully",
      book: result,
    };
  }

  static async addListing(bookId, listing) {
    const result = await saveListing(bookId, listing);
    if (!result) {
      throw new BadRequestError("Book not found");
    }
    return {
      status: 200,
      message: "Get book detail successfully",
      book: result,
    };
  }

  static async deleteListing(bookId, listingId) {
    const result = await deleteListing(bookId, listingId);
    if (!result) {
      throw new BadRequestError("Listing not found");
    }
    return {
      status: 200,
      message: "Delete listing successfully",
      listing: result,
    };
  }

  static async getSimilarBooks(bookId, page = 1, pageSize = 10) {
    const result = await findSimilarBooks(bookId, page, pageSize);
    if (!result) {
      throw new BadRequestError("No similar books found");
    }
    return {
      status: 200,
      message: "Get similar books successfully",
      books: result,
    };
  }

  static async confirmPurchase(bookId, listingId, is_bought) {
    let result;
    if (is_bought) {
      result = await isBoughtRepo.confirmBought(bookId, listingId);
    }
    else {
      console.log("is rented");
      result = await isRentedRepo.confirmRented(bookId, listingId);
    }
    if (!result) {
      throw new BadRequestError("Book not found");
    }

    return {
      status: 200,
      message: "Confirm purchase successfully",
      book: result,
    };
  }

  static async denyPurchase(bookId, listingId, is_bought) {
    let result;
    if (is_bought) {
      result = await isBoughtRepo.denyBought(bookId, listingId);
    }
    else {
      console.log("is rented");
      result = await isRentedRepo.denyRented(bookId, listingId);
    }
    if (!result) {
      throw new BadRequestError("Book not found");
    }

    return {
      status: 200,
      message: "Deny purchase successfully",
      book: result,
    };
  }

}

module.exports = BookService;
