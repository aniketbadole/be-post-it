const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const timelineController = require("../controllers/timelineController");

const router = express.Router();

// Show timeline
router.get("/home", authMiddleware, timelineController.getTimelineTweets);

module.exports = router;
