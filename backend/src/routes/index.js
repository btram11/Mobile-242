"use strict";

const router = require("express").Router();

router.use("/api/v1/access", require("./access"));
router.use("/api/v1/books", require("./books"));
router.use("/api/v1/providers", require("./providers"));

module.exports = router;
