require("dotenv").config();

// Express Import
const express = require("express");

// Mongoose import
const mongoose = require("mongoose");

// cros import
const cors = require("cors");

// workspaceip import
const config = require("./ipConfig.json");

// import passort libary to auth the token
const passport = require("passport");
const jwtStrategy = require("./Config/passport");

// App creation
const app = express();

// port assign
const port = 3002;

// routes
const routes = require("./Routes/index");

// Connect to Mongo server
mongoose
  .connect(`mongodb://localhost:27017/assignment`)
  .then(() => {
    console.log("Connected to DB");

    app.listen(port, () => {
      console.log("Listening at ....", port);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

// Express Json
app.use(express.json());

// using the passport strategy

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// applying a cros to resolve the same-origin error
app.use(
  cors({
    origin: `http://${config.workspaceIp}:${process.env.FRONTEND_PORT}`,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    credentials: true,
  })
);

// v1 routes
app.use("/v1", routes);
