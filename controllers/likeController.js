const Tweet = require("../models/Tweet");

// Like a tweet
exports.likeTweet = async (req, res) => {
  try {
    const { tweetId, userId } = req.body; // Assuming you're passing the tweet ID and user ID

    // Find the tweet
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found." });
    }

    // Check if the user has already liked this tweet
    if (tweet.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this tweet." });
    }

    // Add the user to the likes array and save the tweet
    tweet.likes.push(userId);
    await tweet.save();

    res.status(201).json(tweet);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while liking the tweet." });
  }
};

// Undo a like
exports.undoLike = async (req, res) => {
  try {
    const { tweetId, userId } = req.body; // Assuming you're passing the tweet ID and user ID

    // Find the tweet
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found." });
    }

    // Check if the user has liked the tweet
    if (!tweet.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have not liked this tweet." });
    }

    // Remove the user from the likes array and save the tweet
    tweet.likes.pull(userId);
    await tweet.save();

    res.status(200).json(tweet);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while undoing the like." });
  }
};
