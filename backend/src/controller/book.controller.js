"use strict";
const BookService = require("../service/book.service");

class BookController {
  getBooks = async (req, res) => {
    const { page, pagesize, issold, isleased, keyword, sortby } = req.query;
    const response = await BookService.getBooks(
      parseInt(page),
      parseInt(pagesize),
      issold === "true" ? true : issold === "false" ? false : null,
      isleased === "true" ? true : isleased === "false" ? false : null,
      keyword,
      sortby
    );
    return res.status(200).json(response);
  };

  sortByCondition = async (req, res) => {
    const response = await BookService.sortByCondition(req.body);
    return res.status(200).json(response);
  };

  getBookDetail = async (req, res) => {
    const { bookid } = req.params;
    const response = await BookService.getBookDetail(bookid);
    return res.status(200).json(response);
  };

  getBookListingDetail = async (req, res) => {
    const { bookid, listingid } = req.params;
    const response = await BookService.getBookListingDetail(bookid, listingid);
    return res.status(200).json(response);
  };

  getBookBySeller = async (req, res) => {
    const response = await BookService.getBookBySeller(req.body);
    return res.status(200).json(response);
  };

  getBookByRenter = async (req, res) => {
    const response = await BookService.getBookByRenter(req.body);
    return res.status(200).json(response);
  };

  buyBook = async (req, res) => {
    const { bookid, listingid } = req.params;
    console.log(req.body);
    const response = await BookService.buyBook(bookid, listingid, req.body);
    return res.status(200).json(response);
  };

  getBuyer = async (req, res) => {
    const { bookid, listingid } = req.params;
    const response = await BookService.getBuyer(bookid, listingid);
    return res.status(200).json(response);
  };

  rentBook = async (req, res) => {
    const { bookid, listingid } = req.params;
    const response = await BookService.rentBook(bookid, listingid, req.body);
    return res.status(200).json(response);
  };

  getRenter = async (req, res) => {
    const { bookid, listingid } = req.params;
    const response = await BookService.getRenter(bookid, listingid);
    return res.status(200).json(response);
  };

  getListings = async (req, res) => {
    const { bookid, buyerid, sellerid, leaserid, renterid } = req.query;
    const response = await BookService.getListings(bookid, buyerid, sellerid, leaserid, renterid);
    return res.status(200).json(response);
  };

  addListing = async (req, res) => {
    const { bookid } = req.params;
    const response = await BookService.addListing(bookid, req.body);
    return res.status(200).json(response);
  };

  deleteListing = async (req, res) => {
    const { bookid, listingid } = req.params;
    const response = await BookService.deleteListing(bookid, listingid);
    return res.status(200).json(response);
  };

  getSimilarBooks = async (req, res) => {
    const bookid = req.params.bookid;
    const { page, pagesize } = req.query;
    const response = await BookService.getSimilarBooks(bookid, parseInt(page), parseInt(pagesize));
    return res.status(200).json(response);
  }

  confirmBuying = async (req, res) => {
    const { bookid, listingid } = req.params;
    const response = await BookService.confirmPurchase(bookid, listingid, true);
    return res.status(200).json(response);
  };

  confirmRenting = async (req, res) => {
    const { bookid, listingid } = req.params;
    const response = await BookService.confirmPurchase(bookid, listingid, false);
    return res.status(200).json(response);
  }

  denyBuying = async (req, res) => {
    const { bookid, listingid } = req.params;
    const response = await BookService.denyPurchase(bookid, listingid, true);
    return res.status(200).json(response);
  };

  denyRenting = async (req, res) => {
    const { bookid, listingid } = req.params;
    const response = await BookService.denyPurchase(bookid, listingid, false);
    return res.status(200).json(response);
  };
}

module.exports = new BookController();
