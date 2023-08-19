// controllers/timelineController.js

const User = require("../models/User");
const Tweet = require("../models/Tweet");

exports.getTimelineTweets = async (req, res) => {
  try {
    const userId = req.user.id; // Logged-in user's ID
    const user = await User.findById(userId);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const followingUsers = user.following; // List of users the logged-in user is following

    // Retrieve tweets from the following users
    const timelineTweets = await Tweet.find({ author: { $in: followingUsers } })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (most recent first)
      .skip(skip)
      .limit(limit)
      .populate("author", "_id username"); // Populate the author field to get user details

    res.json(timelineTweets);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the timeline tweets." });
  }
};
