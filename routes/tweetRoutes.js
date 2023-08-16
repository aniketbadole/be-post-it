const express = require("express");
const tweetController = require("../controllers/tweetController");

const router = express.Router();

// Create a new tweet
router.post("/tweets", tweetController.createTweet);

// Get tweets by a specific user
router.get("/users/:userId/tweets", tweetController.getTweetsByUser);

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
