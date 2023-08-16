const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("auth token:", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token not provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("**** Decoded User:", decoded.user);
    console.log("**** Decoded Token:", decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
