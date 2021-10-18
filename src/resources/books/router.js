const express = require("express");
const {
  getAll,
  getOneById,
  getFictionBooks,
  getNonFictionBooks,
  getAuthorBooks,
  createOne,
  updateOneById,
  deleteOneById,
} = require("./controller");

const router = express.Router();

router.get("/", getAll);

router.get("/fiction", getFictionBooks);

router.get("/non-fiction", getNonFictionBooks);

router.get("/author/:name", getAuthorBooks);

router.get("/:id", getOneById);

router.post("/", createOne);

router.patch("/:id", updateOneById);

router.delete("/:id", deleteOneById);

module.exports = router;
