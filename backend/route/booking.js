const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import the pool from db.js

// Example: Fetch all bookings
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
