const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,       // from your .env
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// GET all categories for the logged-in user
const getCategories = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categories WHERE user_id = $1 ORDER BY id ASC',
      [req.user.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// POST a new category
const createCategory = async (req, res) => {
  const { name, type } = req.body;
  if (!name || !type) return res.status(400).json({ error: 'Name and type are required' });

  try {
    const result = await pool.query(
      'INSERT INTO categories (user_id, name, type) VALUES ($1, $2, $3) RETURNING *',
      [req.user.userId, name, type]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// PUT update a category by id
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;
  if (!name || !type) return res.status(400).json({ error: 'Name and type are required' });

  try {
    const result = await pool.query(
      'UPDATE categories SET name = $1, type = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [name, type, id, req.user.userId]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: 'Category not found' });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update category' });
  }
};

// DELETE a category by id
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM categories WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.userId]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: 'Category not found' });

    res.json({ message: 'Category deleted', category: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};