/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: API endpoints for managing providers
 */

/**
 * @swagger
 * /providers:
 *   get:
 *     summary: Get a list of all providers
 *     tags: [Providers]
 *     responses:
 *       200:
 *         description: A list of provider
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /providers/{id}:
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
 * /providers/{id}/books:
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
 *     responses:
 *       200:
 *         description: A list of books by the provider
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

module.exports = router;