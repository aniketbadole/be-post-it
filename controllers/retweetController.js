const Tweet = require("../models/Tweet");

// Create a retweet
exports.createRetweet = async (req, res) => {
  try {
    const { tweetId, userId } = req.body; // Assuming you're passing the tweet ID and user ID

    // Find the original tweet
    const originalTweet = await Tweet.findById(tweetId);
    if (!originalTweet) {
      return res.status(404).json({ message: "Original tweet not found." });
    }

    // Check if the user has already retweeted this tweet
    if (originalTweet.retweets.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already retweeted this tweet." });
    }

    // Add the user to the retweets array and save the tweet
    originalTweet.retweets.push(userId);
    await originalTweet.save();

    res.status(201).json(originalTweet);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the retweet." });
  }
};

// Undo a retweet
exports.undoRetweet = async (req, res) => {
  try {
    const { tweetId, userId } = req.body; // Assuming you're passing the tweet ID and user ID

    // Find the tweet
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found." });
    }

    // Check if the user has retweeted the tweet
    if (!tweet.retweets.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have not retweeted this tweet." });
    }

    // Remove the user from the retweets array and save the tweet
    tweet.retweets.pull(userId);
    await tweet.save();

    res.status(200).json(tweet);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while undoing the retweet." });
  }
};
