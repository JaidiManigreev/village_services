const mongoose = require('mongoose');

const vetAppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  animalType: { type: String, required: true },
  problemDescription: { type: String, required: true },
  durationOfProblem: { type: String, required: true },
  preferredDate: { type: String, required: true },
  preferredTimeSlot: { type: String, required: true },
  assignedDoctor: { type: String, default: null }, // Mapped later
  status: { type: String, enum: ['Pending', 'Scheduled', 'Completed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VetAppointment', vetAppointmentSchema);
