const express = require("express");
const {
  getAll,
  getOneById,
  getPetTypes,
  createOne,
  updateOneById,
  deleteOneById,
} = require("./controller");

const router = express.Router();

router.get("/", getAll);

router.get("/types", getPetTypes);

router.get("/:id", getOneById);

router.post("/", createOne);

router.patch("/:id", updateOneById);

router.delete("/:id", deleteOneById);

module.exports = router;
