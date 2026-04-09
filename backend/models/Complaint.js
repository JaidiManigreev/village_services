const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  streetNo: { type: String, required: true },
  issueType: { type: String, required: true },
  description: { type: String, required: true },
  photoUrls: [{ type: String }],
  status: { type: String, enum: ['Received', 'In Progress', 'Resolved'], default: 'Received' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);
