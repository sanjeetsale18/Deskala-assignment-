const route = require("express").Router();
const { canditateValidate } = require("../Validator/canditateValidator");

const {
  createCandidate,
  deleteById,
  updateById,
} = require("../Controller/canditateController");

route.post("/new", canditateValidate, createCandidate);
route.delete("/:id", deleteById);
route.patch("/:id", updateById);

module.exports = route;
