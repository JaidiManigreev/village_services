const express = require('express');
const router = express.Router();
const DriverLog = require('../models/DriverLog');
const auth = require('../middleware/authMiddleware');

router.get('/my-logs', auth, async (req, res) => {
  try {
    const logs = await DriverLog.find({ driverUserId: req.user.id }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const newLog = new DriverLog({
      ...req.body,
      driverUserId: req.user.id
    });
    const saved = await newLog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
