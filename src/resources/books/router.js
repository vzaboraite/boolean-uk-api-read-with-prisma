const express = require("express");
const {
  getAll,
  getOneById,
  getFictionBooks,
  getNonFictionBooks,
} = require("./controller");

const router = express.Router();

router.get("/", getAll);

router.get("/fiction", getFictionBooks);

router.get("/non-fiction", getNonFictionBooks);

router.get("/:id", getOneById);

module.exports = router;
