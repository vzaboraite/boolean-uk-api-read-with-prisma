const express = require("express");
const { getAll, getOneById, getFictionBooks } = require("./controller");

const router = express.Router();

router.get("/", getAll);

router.get("/fiction", getFictionBooks);

router.get("/:id", getOneById);

module.exports = router;
