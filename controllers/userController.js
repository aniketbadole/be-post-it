const User = require("../models/User");
const Tweet = require("../models/Tweet");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;
    const newUser = new User({
      username,
      email,
      password,
      name,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
};

// Get user details by username
exports.getUserByUsername = async (req, res) => {
  try {
    console.log("trying to get user ", req.params.username);
    const username = req.params.username;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching user details." });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    console.log("Request received to update the user profile");
    console.log("USer ID from token:", req.user.id);
    const userId = req.params.userId; // Assuming you're using a user's ID for identification
    console.log("User ID from URL:", userId);
    const updates = req.body; // Updated fields sent in the request body

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updated data against the schema
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating user profile." });
  }
};

// Get tweets by a specific user
exports.getTweetsByUser = async (req, res) => {
  try {
    console.log("here at least");
    const userId = req.params.userId;
    console.log(userId);
    const tweets = await Tweet.find({ author: userId });
    res.json(tweets);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the tweets." });
  }
};
