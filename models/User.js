const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bio: String,
  dateOfBirth: Date,
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  profilePicture: {
    type: String,
    default: "pictures/default.jpg", // Default value for the profile picture
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
