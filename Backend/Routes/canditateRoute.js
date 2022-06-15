const route = require("express").Router();
const passport = require("passport");
const { canditateValidate } = require("../Validator/canditateValidator");

const {
  createCandidate,
  deleteById,
  updateById,
} = require("../Controller/canditateController");

// adding a token authentication using passport
const authenticate = passport.authenticate("jwt", { session: false });

route.post("/new", authenticate, canditateValidate, createCandidate);
route.delete("/:id", authenticate, deleteById);
route.patch("/:id", authenticate, updateById);

module.exports = route;
