const { body, validationResult } = require("express-validator");

const validateRequest = [
  body("email").isEmail().withMessage("Invalid email format."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
  // Add more validation rules as needed
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateRequest;
