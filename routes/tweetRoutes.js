const express = require("express");
const tweetController = require("../controllers/tweetController");
const retweetController = require("../controllers/retweetController");
const likeController = require("../controllers/likeController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new tweet
router.post("/tweets", authMiddleware, tweetController.createTweet);

// Delete a tweet
router.delete("/tweets/:tweetId", authMiddleware, tweetController.deleteTweet);

// Create a retweet
router.post("/retweets", retweetController.createRetweet);

// Undo a retweet
router.delete("/retweets", retweetController.undoRetweet);

// Like a tweet
router.post("/likes", likeController.likeTweet);

// Undo a like
router.delete("/likes", likeController.undoLike);

module.exports = router;
