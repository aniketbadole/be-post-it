const User = require("../models/User");
const Tweet = require("../models/Tweet");

exports.search = async (req, res) => {
  try {
    const { type, q } = req.query;

    if (!type || !q) {
      return res.status(400).json({ error: "Missing parameters." });
    }

    let searchResults;

    if (type === "tweets") {
      searchResults = await Tweet.find({
        $or: [
          { content: { $regex: q, $options: "i" } },
          { hashtags: { $regex: q, $options: "i" } },
        ],
      }).populate("author", "id username");
    } else if (type === "users") {
      searchResults = await User.find({
        $or: [
          { username: { $regex: q, $options: "i" } },
          { name: { $regex: q, $options: "i" } },
        ],
      }).select("id username");
    } else {
      return res.status(400).json({ error: "Invalid search type." });
    }

    res.json({ searchResults });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while searching." });
  }
};
