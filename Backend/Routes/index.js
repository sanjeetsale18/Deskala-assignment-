const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const candidateRoute = require("./canditateRoute");

// routes for user login and signup
router.use("/users", userRoute);

// routes for canditate
router.use("/canditate", candidateRoute);

module.exports = router;
