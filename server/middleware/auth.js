const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyJWT(req, res, next) {
  const authHeader = req.headers['authorization']; // expects "Bearer <token>"
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1]; // get the token part
  if (!token) return res.status(401).json({ error: 'Malformed token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId }; // attach user info with the correct property
    next(); // pass control to the next middleware/route
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = verifyJWT;