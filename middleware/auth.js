const jwt = require('jsonwebtoken');

// Middleware for verifying JWT token
module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user info to request object
    console.log(req.user);
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
