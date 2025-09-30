const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const verifyJWT = require('../middleware/auth');

// POST /auth/register → calls registerUser
router.post('/register', registerUser);

// POST /auth/login → calls loginUser
router.post('/login', loginUser);

// GET /auth/protected → test route for JWT authentication
router.get('/protected', verifyJWT, (req, res) => {
  res.json({ message: 'You are authorized!', userId: req.user.userId });
});

module.exports = router;