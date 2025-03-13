const router = require("express").Router();
const { asyncHandler } = require("../../helper/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const bookController = require("../../controller/book.controller");

router.get("/", asyncHandler(bookController.getBooks));
router.get("/search", asyncHandler(bookController.searchBook));

module.exports = router;
