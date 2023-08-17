const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Get user details by username
router.get("/users/:username", userController.getUserByUsername);

// Update user profile
router.put("/users/:userId", authMiddleware, userController.updateUserProfile);

module.exports = router;
