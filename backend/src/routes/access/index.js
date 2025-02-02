const router = require("express").Router();
const accessController = require("../../controller/access.controller");
const { asyncHandler } = require("../../helper/asyncHandler");
const { authentication } = require("../../auth/authUtils");

// login
router.post("/user/login", asyncHandler(accessController.login));

// reset-password
router.post(
  "/user/reset-password",
  asyncHandler(accessController.resetPassword)
);

// authentication
router.use(authentication);

// logout
router.post("/user/logout", asyncHandler(accessController.logout));

module.exports = router;
