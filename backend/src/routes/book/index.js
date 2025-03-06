const router = require("express").Router();
const { asyncHandler } = require("../../helper/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const bookController = require("../../controller/book.controller");

router.get("/book", asyncHandler(bookController.getBooks));
router.get("/book/search", asyncHandler(bookController.searchBook));

module.exports = router;
