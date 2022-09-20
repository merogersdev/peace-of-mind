// JWT
const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_SECRET;

// Verify JWT Token, for protected Routes
const jwtAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Return unauthorized if no token
  if (token == null)
    return res.status(401).json({ error: "401: Unauthorized" });

  // If token is invalid, return Forbidden, else next
  jwt.verify(token, privateKey, (error, user) => {
    console.error(error);
    if (error) return res.status(403).json({ error: "403: Forbidden" });
    req.user = user;
    next();
  });
};

module.exports = { jwtAuth };
