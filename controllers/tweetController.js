const Tweet = require("../models/Tweet");

// Create a new tweet
exports.createTweet = async (req, res) => {
  try {
    console.log("Trying to post a tweet...");
    const { content } = req.body;
    const author = req.user.id;
    console.log("content:", content);
    console.log("author:", author);
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

// Delete a tweet
exports.deleteTweet = async (req, res) => {
  try {
    const { tweetId } = req.params; // Assuming you're using a tweet's ID for identification
    const userId = req.user.id;

    // Find the tweet
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found." });
    }

    // Check if the logged-in user is the author of the tweet
    if (tweet.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this tweet." });
    }

    // Delete the tweet
    await tweet.deleteOne();

    res.status(200).json({ message: "Tweet deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the tweet." });
  }
};

exports.showTweet = async (req, res) => {
  try {
    const { tweetId } = req.params;

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(403).json({ message: "Tweet not found" });
    }

    res.json(tweet);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while retrieving the tweet" });
  }
};

exports.createReply = async (req, res) => {
  try {
    const { tweetId } = req.params;
    const { content } = req.body;
    const author = req.user.id;

    const originalTweet = await Tweet.findById(tweetId);
    if (!originalTweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    const newTweet = new Tweet({
      content,
      author,
      originalTweet: originalTweet._id,
    });

    await newTweet.save();

    originalTweet.mentions.push(newTweet._id);
    await originalTweet.save();

    res.status(201).json({ message: "Reply tweet created successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occured while creating the reply tweet" });
  }
};
