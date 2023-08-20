const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hashtags: [
    {
      type: String,
      lowercase: true,
      trim: true,
    },
  ],
  mentions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  originalTweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
  },
  retweetedTweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
  },
  retweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
