const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Twitter Clone API!" });
});

// Connect to the database
connectDB();

module.exports = app;
