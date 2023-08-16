const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Create a new user
router.post("/users", userController.createUser);

// Get user details by username
router.get("/users/:username", userController.getUserByUsername);

// Update user profile
router.put("/users/:userId", userController.updateUserProfile);

module.exports = router;
