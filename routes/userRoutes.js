const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Get user details by username
router.get("/users/:username", userController.getUserByUsername);

// Update user profile
router.put("/users/:userId", authMiddleware, userController.updateUserProfile);

// Get tweets by a specific user
router.get("/users/:username/tweets", userController.getTweetsByUser);

// Follow or unfollow a user
router.post(
  "/users/:targetUserId/follow",
  authMiddleware,
  userController.toggleFollowUser
);

router.put(
  "users/changepassword",
  authMiddleware,
  userController.changePassword
);

router.get("users/all", userController.getAllUsers);

module.exports = router;
