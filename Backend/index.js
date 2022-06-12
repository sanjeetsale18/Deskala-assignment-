require("dotenv").config();

// Express Import
const express = require("express");

// Mongoose import
const mongoose = require("mongoose");

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

// v1 routes
app.use("/v1", routes);
