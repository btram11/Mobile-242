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

  searchBook = async (req, res) => {
    const { title, author, keywords, subject } = req.query;
    console.log(req.query);
    const response = await BookService.searchBook(
      title,
      author,
      keywords,
      subject
    );
    return res.status(200).json(response);
  };

  sortByCondition = async (req, res) => {
    const response = await BookService.sortByCondition(req.body);
    return res.status(200).json(response);
  };

  getBookDetail = async (req, res) => {
    const { bookid, listingid } = req.params;
    const response = await BookService.getBookDetail(
      bookid,
      listingid
    );
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
