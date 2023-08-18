const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // const token = req.header("Authorization");
  const token = req.headers.authorization.split(" ")[1];
  console.log(req.headers.authorization.split(" ")[1]);
  if (!token) {
    console.log("No token provided.");
    return res
      .status(401)
      .json({ message: "Authorization token not provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    console.log("USER OBJECT:", req.user);
    next();
  } catch (error) {
    //console.log("Invalid token:", error);
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
