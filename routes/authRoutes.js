const express = require("express");
const authController = require("../controllers/authController");
const validateRequest = require("../middlewares/validateRequest"); // Validation middleware if needed

const router = express.Router();

// Register a new user
router.post("/register", validateRequest, authController.registerUser);

// Login user
router.post("/login", validateRequest, authController.loginUser);

module.exports = router;
