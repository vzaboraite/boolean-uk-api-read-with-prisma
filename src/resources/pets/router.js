const express = require("express");
const { getAll, getOneById, getPetTypes, createOne } = require("./controller");

const router = express.Router();

router.get("/", getAll);

router.get("/types", getPetTypes);

router.get("/:id", getOneById);

router.post("/", createOne);

module.exports = router;
