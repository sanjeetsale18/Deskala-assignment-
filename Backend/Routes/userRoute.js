const router = require("express").Router();
const {
  getUserById,
  checkLogIn,
  postSignUp,
} = require("../Controller/userController");

const { validateSchema } = require("../Validator/userValidators");
const { loginValidate } = require("../Validator/userValidators");

router.post("/signup", validateSchema, postSignUp);
router.post("/login", loginValidate, checkLogIn);
router.get("/:id", getUserById);

module.exports = router;
