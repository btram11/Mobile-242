"use strict";
const BookService = require("../service/book.service");

class BookController {
  getBooks = async (req, res) => {
    const { page, pageSize, isSold, isLeased, keyword, sortby } = req.query;
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

  searchBook = async (req, res) => {
    const response = await BookService.searchBook(req.query);
    return res.status(200).json(response);
  };

  sortByCondition = async (req, res) => {
    const response = await BookService.sortByCondition(req.body);
    return res.status(200).json(response);
  };

  getDetailBook = async (req, res) => {
    const response = await BookService.getDetailBook(req.body);
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
}

module.exports = new BookController();
