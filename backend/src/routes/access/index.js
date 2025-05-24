const router = require("express").Router();
const accessController = require("../../controller/access.controller");
const { asyncHandler } = require("../../helper/asyncHandler");
const { authentication } = require("../../auth/authUtils");

// login
/**
 * @swagger
 * '/api/v1/access/user/login':
 *  post:
 *     tags:
 *     - User controller
 *     summary: Login for user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *     responses:
 *      200:
 *        description: Login successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 200
 *                message:
 *                  type: string
 *                  description: message response
 *                access_token:
 *                  type: string
 *                  description: A token used for accessing protected routes
 *                userId:
 *                  type: string
 *                  description: The ID of user
 *                role:
 *                  type: string
 *                  description: Role of user
 *      400:
 *        description: Bad Request (Invalid email or password)
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict (User is already logged in)
 *      500:
 *        description: Server error
 */
router.post("/user/login", asyncHandler(accessController.login));

// reset-password
/**
 * @swagger
 * '/api/v1/access/user/reset-password':
 *  post:
 *     tags:
 *     - User controller
 *     summary: Reset password for user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - old_password
 *              - new_password
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              old_password:
 *                type: string
 *                format: password
 *              new_password:
 *                type: string
 *                format: password
 *     responses:
 *      200:
 *        description: Reset password successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 200
 *                message:
 *                  type: string
 *                  description: message response
 *                role:
 *                  type: string
 *                  description: Role of user
 *      400:
 *        description: Bad Request (Invalid email or password)
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server error
 */
router.post(
  "/user/reset-password",
  asyncHandler(accessController.resetPassword)
);

// authentication
// router.use(authentication);

// logout
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: authorization
 *       description: "Bearer token for authorization"
 *     ClientIdAuth:
 *       type: apiKey
 *       in: header
 *       name: client_id
 *       description: "Client ID for identifying the client application"
 * '/api/v1/access/user/logout':
 *  post:
 *     tags:
 *     - User controller
 *     summary: Logout for user
 *     security:
 *       - BearerAuth: []
 *       - ClientIdAuth: []
 *     responses:
 *      200:
 *        description: Logout successfully
 *      400:
 *        description: Bad Request (Invalid or missing token)
 *      401:
 *        description: Unauthorized (Token is invalid or expired)
 *      500:
 *        description: Server error
 */
router.post("/user/logout", asyncHandler(accessController.logout));

module.exports = router;
