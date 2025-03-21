"use strict";
const BookService = require("../service/book.service");

class BookController {
  getBooks = async (req, res) => {
    const response = await BookService.getBooks(req.query);
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
