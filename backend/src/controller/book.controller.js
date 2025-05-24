"use strict";
const BookService = require("../service/book.service");

class BookController {
  getBooks = async (req, res) => {
    const { page, pageSize, isSold, isLeased, keyword, sortby } = req.query;
    console.log(req.query);
    const response = await BookService.getBooks(
      parseInt(page),
      parseInt(pageSize),
      isSold === "true" ? true : isSold === "false" ? false : null,
      isLeased === "true" ? true : isLeased === "false" ? false : null,
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
}

module.exports = new BookController();
