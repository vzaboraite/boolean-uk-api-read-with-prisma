const express = require("express");
const {
  getAll,
  getOneById,
  getFictionBooks,
  getNonFictionBooks,
  getAuthorBooks,
  createOne,
} = require("./controller");

const router = express.Router();

router.get("/", getAll);

router.get("/fiction", getFictionBooks);

router.get("/non-fiction", getNonFictionBooks);

router.get("/author/:name", getAuthorBooks);

router.get("/:id", getOneById);

router.post("/", createOne);

module.exports = router;
