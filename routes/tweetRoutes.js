const express = require("express");
const tweetController = require("../controllers/tweetController");
const retweetController = require("../controllers/retweetController");
const likeController = require("../controllers/likeController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new tweet
router.post("/tweets", authMiddleware, tweetController.createTweet);

// Create a reply tweet
router.post(
  "/tweets/:tweetId/replies",
  authMiddleware,
  tweetController.createReply
);

// Delete a tweet
router.delete("/tweets/:tweetId", authMiddleware, tweetController.deleteTweet);

// Create a retweet
router.post(
  "/:tweetId/retweet",
  authMiddleware,
  retweetController.createRetweet
);

// Undo a retweet
router.delete(
  "/:tweetId/undoretweet",
  authMiddleware,
  retweetController.undoRetweet
);

// Like a tweet
router.post("/:tweetId/like", authMiddleware, likeController.likeTweet);

// Undo a like
router.delete("/:tweetId/undolike", authMiddleware, likeController.undoLike);

// Get a tweet
router.get("/tweets/:tweetId", tweetController.showTweet);

module.exports = router;
