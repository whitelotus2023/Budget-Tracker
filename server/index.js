const express = require('express');
require('dotenv').config();
const app = express();
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use(express.json());      // parse JSON request bodies
app.use('/auth', authRoutes); // mount auth routes

app.use(express.json());            // parse JSON bodies
app.use('/auth', authRoutes);       // auth routes
app.use('/categories', categoryRoutes); // categories routes


app.listen(3001, () => console.log('Server running on port 3001'));