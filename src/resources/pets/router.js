const express = require("express");
const { getAll, getOneById, getPetTypes } = require("./controller");

const router = express.Router();

router.get("/", getAll);

router.get("/types", getPetTypes);

router.get("/:id", getOneById);

module.exports = router;
