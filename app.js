const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authMiddleware = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const tweetsRoutes = require("./routes/tweetRoutes");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const timelineRoute = require("./routes/timelineRoute");

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(errorMiddleware);

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Twitter Clone API!" });
});

// Auth routes
app.use("/auth", authRoutes);

// User routes
app.use("/users", userRoutes);

// Tweets routes
app.use("/tweets", tweetsRoutes);

// Timeline route
app.use("/timeline", timelineRoute);

// Connect to the database
connectDB();

module.exports = app;
