const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }

  try {
    // Verify token (strip 'Bearer ' from token)
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    // Set req.user to the authenticated user's ID
    req.user = { id: decoded.user.id };

    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
