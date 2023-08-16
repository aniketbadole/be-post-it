const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user." });
  }
};

// Login user and generate JWT
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT
    const token = jwt.sign({ user: { id: user._id } }, process.env.SECRET_KEY);

    console.log(`User ${user._id} logged in.`);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in." });
  }
};
