/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: API endpoints for managing providers
 */

/**
 * @swagger
 * /api/v1/providers:
 *   get:
 *     summary: Get a list of all providers
 *     tags: [Providers]
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
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter providers by name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort results by
 *     responses:
 *       200:
 *         description: A list of providers
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/providers/{id}:
 *   get:
 *     summary: Get a provider by ID
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The provider ID
 *     responses:
 *       200:
 *         description: Provider details
 *       404:
 *         description: Provider not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/providers/{id}/books:
 *   get:
 *     summary: Get books by a specific provider
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The provider ID
 *       - in: path
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of items to skip for pagination
 *       - in: path
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of items to return
 *     responses:
 *       200:
 *         description: A list of books by the provider
 *       404:
 *         description: Provider not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/providers/{id}/listings:
 *   get:
 *     summary: Get in-progress listings by a specific provider
 *     tags: [Providers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The provider ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: pagesize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: inprogress
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Filter for in-progress listings
 *       - in: query
 *         name: iscomplete
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Filter for completed listings
 * 
 *     responses:
 *       200:
 *         description: A list of in-progress listings by the provider
 *       401:
 *         description: Unauthorized - Authentication required
 *       404:
 *         description: Provider not found
 *       500:
 *         description: Internal server error
 */
const router = require("express").Router();
const { asyncHandler } = require("../../helper/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const providerController = require("../../controller/provider.controller");

router.get("/", asyncHandler(providerController.getProviders));
router.get("/:id", asyncHandler(providerController.getProviderById));
router.get("/:id/books", asyncHandler(providerController.getBookByProvider));
router.get("/:id/listings",asyncHandler(providerController.getListings));

module.exports = router;
