const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookingType: { type: String, enum: ['Labor', 'Tractor'], required: true },
  
  // Specific to Labor
  workType: { type: String },
  workerCategory: { type: String }, // 'Boys', 'Ladies', etc.
  
  // Specific to Tractor/Equipment
  equipmentCategory: { type: String },
  equipmentType: { type: String },
  
  // Common details
  dateRequired: { type: String, required: true },
  timeDuration: { type: String }, // Optional now
  description: { type: String },
  
  // Custom Booker Details
  bookerName: { type: String },
  bookerContact: { type: String },
  numberOfLabors: { type: Number },
  
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
