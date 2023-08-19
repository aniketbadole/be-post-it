const User = require("../models/User");
const Tweet = require("../models/Tweet");
const bcrypt = require("bcrypt");

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
    const user = await User.findOne({ username }).select("-password");
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
    const username = req.params.username;
    console.log(username);
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const tweets = await Tweet.find({ author: user._id });
    res.json(tweets);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the tweets." });
  }
};

// Follow or unfollow a user
exports.toggleFollowUser = async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isFollowing = user.following.includes(targetUserId.toString());

    if (isFollowing) {
      // Unfollow user
      user.following = user.following.filter(
        (id) => id.toString() !== targetUserId
      );
    } else {
      // Follow user
      user.following.push(targetUserId);
      targetUser.followers.push(userId);
    }

    await user.save();
    await targetUser.save();

    res.json({
      message: `${isFollowing ? "Unfollowed" : "Followed"} ${
        targetUser.name
      } successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while following/unfollowing the user.",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while updating the password" });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id name username profilePicture");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while fetching the users" });
  }
};
