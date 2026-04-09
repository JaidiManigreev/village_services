const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/authMiddleware');

// Get user bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const newBooking = new Booking({
      ...req.body,
      userId: req.user.id
    });
    const saved = await newBooking.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
