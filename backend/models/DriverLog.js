const mongoose = require('mongoose');

const driverLogSchema = new mongoose.Schema({
  driverUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // The driver logging the work
  date: { type: String, required: true },
  time: { type: String, required: true },
  ownerName: { type: String, required: true },
  locationField: { type: String, required: true },
  equipmentUsed: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DriverLog', driverLogSchema);
