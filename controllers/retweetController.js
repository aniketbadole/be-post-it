const Tweet = require("../models/Tweet");

// Create a retweet
exports.createRetweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const userId = req.user.id;

    // Check if the user has already retweeted this tweet
    const existingRetweet = await Tweet.findOne({
      retweetedTweet: tweetId,
      author: userId,
    });

    if (existingRetweet) {
      return res
        .status(400)
        .json({ error: "You have already retweeted this tweet." });
    }

    // Find the original tweet
    const retweetedTweet = await Tweet.findById(tweetId);
    if (!retweetedTweet) {
      return res.status(404).json({ error: "Original tweet not found." });
    }

    // Create a new tweet as a retweet
    const newRetweet = new Tweet({
      content: retweetedTweet.content,
      author: userId,
      retweetedTweet: retweetedTweet._id,
    });

    await newRetweet.save();

    // Update the retweet array and user list of the original tweet
    retweetedTweet.retweets.push(newRetweet._id);
    await retweetedTweet.save();

    res.status(201).json({ message: "Retweet created successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the retweet." });
  }
};

// Undo a retweet
exports.undoRetweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const userId = req.user.id;

    // Find the retweet to be undone
    const retweet = await Tweet.findOne({
      _id: tweetId, // This should be the retweet ID
      author: userId,
    });

    if (!retweet) {
      return res.status(404).json({ error: "Retweet not found." });
    }

    // Remove the retweet's ID from the original tweet's retweets array
    const retweetedTweet = await Tweet.findById(retweet.retweetedTweet);
    if (retweetedTweet) {
      retweetedTweet.retweets.pull(retweet._id);
      await retweetedTweet.save();
    }

    // Delete the retweet
    await retweet.deleteOne();

    res.json({ message: "Retweet undone successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while undoing the retweet." });
  }
};
