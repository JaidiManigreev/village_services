const express = require('express');
const router = express.Router();
const VetAppointment = require('../models/VetAppointment');
const auth = require('../middleware/authMiddleware');

router.get('/my-appointments', auth, async (req, res) => {
  try {
    const appointments = await VetAppointment.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const newAppt = new VetAppointment({
      ...req.body,
      userId: req.user.id
    });
    const saved = await newAppt.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
