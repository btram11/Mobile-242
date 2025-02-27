"use strict";

const router = require("express").Router();

router.use("/api/v1", require("./access"));

module.exports = router;
