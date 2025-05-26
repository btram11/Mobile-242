const router = require("express").Router();
const { asyncHandler } = require("../../helper/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const bookController = require("../../controller/book.controller");

/**
 * @swagger
 * /api/v1/books:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Get books successfully
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       book_id:
 *                         type: string
 *                         format: uuid
 *                         example: 00000000-0000-0000-0000-000000000000
 *                       title:
 *                         type: string
 *                         example: Lậptrìnhcơ bản - Tự học Python bằng hình ảnh
 *                       img_url:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       author:
 *                         type: string
 *                         example: Nguyễn, Quốc Huy.
 *                       publisher:
 *                         type: string
 *                         example: "Hà Nội : Thanh niên"
 *                       publishing_year:
 *                         type: integer
 *                         example: 2022
 *                       subject:
 *                         type: string
 *                         example: Python (Ngôn ngữlậptrìnhmáy tính).
 *                       summary:
 *                         type: string
 *                         nullable: true
 *                         example: Giới thiệu những tính năng nổi bật của ngôn ngữ lập trình Python...
 *                       price:
 *                         type: number
 *                         format: float
 *                         nullable: true
 *                         example: null
 */

router.get("/", asyncHandler(bookController.getBooks));

/**
 * @swagger
 * /api/v1/books/listings:
 *   get:
 *     tags: [Book]
 *     summary: Get book listings with filtering options
 *     description: Retrieves book listings based on different filter criteria
 *     parameters:
 *       - in: query
 *         name: bookid
 *         schema:
 *           type: string
 *         description: Filter listings by book ID
 *       - in: query
 *         name: buyerid
 *         schema:
 *           type: string
 *         description: Filter listings by buyer ID
 *       - in: query
 *         name: sellerid
 *         schema:
 *           type: string
 *         description: Filter listings by seller ID
 *       - in: query
 *         name: leaserid
 *         schema:
 *           type: string
 *         description: Filter listings by leaser ID
 *       - in: query
 *         name: renterid
 *         schema:
 *           type: string
 *         description: Filter listings by renter ID
 *     responses:
 *       200:
 *         description: A list of book listings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Get listings successfully
 *                 listings:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: No listings found
 *       500:
 *         description: Server error
 */
router.get(
  "/listings",
  asyncHandler(bookController.getListings)
)

/**
 * @swagger
 * /api/v1/books/{bookid}:
 *   get:
 *     tags: [Book]
 *     summary: Get book details by ID
 *     description: Retrieves detailed information about a specific book
 *     parameters:
 *       - in: path
 *         name: bookid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to retrieve
 *     responses:
 *       200:
 *         description: Detailed book information
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get("/:bookid", asyncHandler(bookController.getBookDetail));

/**
 * @swagger
 * /api/v1/books/{bookid}/similarBooks:
 *   get:
 *     tags: [Book]
 *     summary: Get similar books by book ID
 *     description: Retrieves a list of books that are similar to the specified book based on various criteria like subject, author, or category
 *     parameters:
 *       - in: path
 *         name: bookid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to find similar books for
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
 *     responses:
 *       200:
 *         description: List of similar books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Get similar books successfully
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       book_id:
 *                         type: string
 *                         format: uuid
 *                         example: 00000000-0000-0000-0000-000000000000
 *                       title:
 *                         type: string
 *                         example: Advanced Python Programming
 *                       img_url:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       author:
 *                         type: string
 *                         example: John Doe
 *                       publisher:
 *                         type: string
 *                         example: Tech Publications
 *                       publishing_year:
 *                         type: integer
 *                         example: 2023
 *                       subject:
 *                         type: string
 *                         example: Python (Computer programming language)
 *       404:
 *         description: Book not found or no similar books available
 *       500:
 *         description: Server error
 */
router.get(
  "/:bookid/similarBooks",
  asyncHandler(bookController.getSimilarBooks)
);

/**
 * @swagger
 * /api/v1/books/{bookid}/listing/{listingid}:
 *   get:
 *     tags: [Book]
 *     summary: Get book details by book ID and listing ID
 *     description: Retrieves detailed information about a specific book and its listing
 *     parameters:
 *       - in: path
 *         name: bookid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to retrieve
 *       - in: path
 *         name: listingid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the listing associated with the book
 *     responses:
 *       200:
 *         description: Detailed book and listing information
 *       404:
 *         description: Book or listing not found
 *       500:
 *         description: Server error
 */
router.get(
  "/:bookid/listing/:listingid",
  asyncHandler(bookController.getBookListingDetail)
);

/**
 * @swagger
 * /api/v1/books/{bookid}/listing/{listingid}/buy:
 *   post:
 *     tags: [Book]
 *     summary: Purchase a book
 *     description: Process a book purchase transaction using the specified book and listing IDs
 *     parameters:
 *       - in: path
 *         name: bookid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to purchase
 *       - in: path
 *         name: listingid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the listing associated with the book
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: string
 *                required: true
 *              modifiable:
 *                type: boolean
 *                required: true
 *     responses:
 *       200:
 *         description: Purchase successful
 *       400:
 *         description: Invalid request or book unavailable
 *       404:
 *         description: Book or listing not found
 *       500:
 *         description: Server error
 */
router.post(
  "/:bookid/listing/:listingid/buy",
  asyncHandler(bookController.buyBook)
);

/**
 * @swagger
 * /api/v1/books/{bookid}/listing/{listingid}/buyer:
 *   get:
 *     tags: [Book]
 *     summary: Get buyer information for a book listing
 *     description: Retrieves information about the buyer associated with a specific book listing
 *     parameters:
 *       - in: path
 *         name: bookid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book
 *       - in: path
 *         name: listingid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the listing associated with the book
 *     responses:
 *       200:
 *         description: Buyer information retrieved successfully
 *       404:
 *         description: Book, listing, or buyer information not found
 *       500:
 *         description: Server error
 */
router.get(
  "/:bookid/listing/:listingid/buyer",
  asyncHandler(bookController.getBuyer)
);

/**
 * @swagger
 * /api/v1/books/{bookid}/listing/{listingid}/rent:
 *   post:
 *     tags: [Book]
 *     summary: Rent a book
 *     description: Process a book rental transaction using the specified book and listing IDs
 *     parameters:
 *       - in: path
 *         name: bookid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to rent
 *       - in: path
 *         name: listingid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the listing associated with the book
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: string
 *                required: true
 *              modifiable:
 *                type: boolean
 *                required: true
 *                description: Modifiable flag for the rental
 *              pickup_date:
 *                type: string
 *                format: date-time
 *                required: true
 *              end_date:
 *                type: string
 *                format: date-time
 *                required: true
 *     responses:
 *       200:
 *         description: Rental successful
 *       400:
 *         description: Invalid request or book unavailable for rent
 *       404:
 *         description: Book or listing not found
 *       500:
 *         description: Server error
 */
router.post(
  "/:bookid/listing/:listingid/rent",
  asyncHandler(bookController.rentBook)
);

/**
 * @swagger
 * /api/v1/books/{bookid}/listing/{listingid}/renter:
 *   get:
 *     tags: [Book]
 *     summary: Get renter information for a book listing
 *     description: Retrieves information about the renter associated with a specific book listing
 *     parameters:
 *       - in: path
 *         name: bookid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book
 *       - in: path
 *         name: listingid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the listing associated with the book
 *     responses:
 *       200:
 *         description: Renter information retrieved successfully
 *       404:
 *         description: Book, listing, or renter information not found
 *       500:
 *         description: Server error
 */
router.get(
  "/:bookid/listing/:listingid/renter",
  asyncHandler(bookController.getRenter)
);

/**
 * @swagger
 * /api/v1/books/{bookid}/listing:
 *   post:
 *     tags: [Book]
 *     summary: Add a new listing for a book
 *     description: Creates a new listing for a specific book with sale or rental options
 *     parameters:
 *       - in: path
 *         name: bookid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to create listing for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider_id:
 *                 type: string
 *                 required: true
 *                 description: ID of the user creating the listing
 *               is_sold:
 *                 type: boolean
 *                 required: true
 *                 description: Indicates if the book is for sale
 *               is_leased:
 *                 type: boolean
 *                 required: true
 *                 description: Indicates if the book is for sale
 *               sold_price:
 *                 type: number
 *                 format: float
 *                 description: Price for sale (required if listing_type includes sale)
 *               leased_price:
 *                 type: number
 *                 format: float
 *                 description: Price for rent (required if listing_type includes rent)
 *               leased_period:
 *                 type: string
 *                 description: Duration for which the book can be rented
 *               condition:
 *                 type: string
 *                 description: Condition of the book
 *     responses:
 *       201:
 *         description: Listing created successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.post(
  "/:bookid/listing",
  asyncHandler(bookController.addListing)
);

/**
 * @swagger
 * /api/v1/books/{bookid}/listing/{listingid}:
 *   delete:
 *     tags: [Book]
 *     summary: Delete a book listing
 *     description: Deletes a specific book listing by its ID
 *     parameters:
 *       - in: path
 *         name: bookid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to delete
 *       - in: path
 *         name: listingid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the listing to delete
 *     responses:
 *       200:
 *         description: Listing deleted successfully
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/:bookid/listing/:listingid",
  asyncHandler(bookController.deleteListing)
);


module.exports = router;
