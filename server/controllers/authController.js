const pool = require('../db');       // Reusable PostgreSQL pool
const bcrypt = require('bcrypt');    // Hash passwords
const jwt = require('jsonwebtoken'); // JWT authentication

// -------------------------
// REGISTER NEW USER
// -------------------------
async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    // 1️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2️⃣ Insert user into DB
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    // 3️⃣ Return user info (without password)
    res.json({ user: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// -------------------------
// LOGIN EXISTING USER
// -------------------------
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // 1️⃣ Get user by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0)
      return res.status(400).json({ error: 'User not found' });

    const user = result.rows[0];

    // 2️⃣ Compare password
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res.status(400).json({ error: 'Incorrect password' });

    // 3️⃣ Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 4️⃣ Return token
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { registerUser, loginUser };