const router = require("express").Router();
const { asyncHandler } = require("../../helper/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const bookController = require("../../controller/book.controller");

/**
 * @swagger
 * /api/v1/book:
 *   get:
 *     tags: [Book]
 *     summary: Get books with optional filtering
 *     description: Retrieves a list of books with pagination and filtering options
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: isSold
 *         schema:
 *           type: boolean
 *         description: Filter by sold status
 *       - in: query
 *         name: isLeased
 *         schema:
 *           type: boolean
 *         description: Filter by leased status
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword
 *       - in: query
 *         name: sortby
 *         schema:
 *           type: string
 *         description: Field to sort results by
 *     responses:
 *       200:
 *         description: A list of books
 */
router.get("/", asyncHandler(bookController.getBooks));
router.get("/:bookid/listing/:listingid", asyncHandler(bookController.getBookDetail));


module.exports = router;
