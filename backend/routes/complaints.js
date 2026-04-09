const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const auth = require('../middleware/authMiddleware');

// Get all complaints for dashboard
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 }).limit(20);
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new complaint
router.post('/', auth, async (req, res) => {
  try {
    const newComplaint = new Complaint({
      ...req.body,
      userId: req.user.id
    });
    const saved = await newComplaint.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
