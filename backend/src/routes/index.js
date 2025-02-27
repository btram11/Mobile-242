"use strict";

const router = require("express").Router();

router.use("/api/v1", require("./access"));
router.use("/api/v1", require("./book"));

module.exports = router;
