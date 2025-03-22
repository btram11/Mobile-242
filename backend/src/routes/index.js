"use strict";

const router = require("express").Router();

router.use("/api/v1/access", require("./access"));
router.use("/api/v1/book", require("./book"));

module.exports = router;
