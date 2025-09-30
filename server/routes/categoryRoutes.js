const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/auth');

const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

// GET all categories for the logged-in user
router.get('/', verifyJWT, getCategories);

// POST a new category
router.post('/', verifyJWT, createCategory);

// PUT update a category by id
router.put('/:id', verifyJWT, updateCategory);

// DELETE a category by id
router.delete('/:id', verifyJWT, deleteCategory);

module.exports = router;
