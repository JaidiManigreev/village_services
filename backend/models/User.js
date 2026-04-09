const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  aadhaar: { type: String }, // Optional or hashed
  password: { type: String, required: true },
  role: { type: String, default: 'villager' }, // e.g., 'villager', 'driver', 'owner'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
