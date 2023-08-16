const Tweet = require("../models/Tweet");

// Create a new tweet
exports.createTweet = async (req, res) => {
  try {
    const { content, author } = req.body;
    const newTweet = new Tweet({
      content,
      author,
    });
    const tweet = await newTweet.save();
    res.status(201).json(tweet);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the tweet." });
  }
};

// Get tweets by a specific user
exports.getTweetsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tweets = await Tweet.find({ author: userId });
    res.json(tweets);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the tweets." });
  }
};

// Delete a tweet
exports.deleteTweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId; // Assuming you're using a tweet's ID for identification

    // Find the tweet
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found." });
    }

    // Check if the logged-in user is the author of the tweet
    if (tweet.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this tweet." });
    }

    // Delete the tweet
    await tweet.remove();

    res.status(200).json({ message: "Tweet deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the tweet." });
  }
};
