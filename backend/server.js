const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Backend Database'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Test basic route
app.get('/', (req, res) => {
  res.send('Village Services API is running!');
});

const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const bookingRoutes = require('./routes/bookings');
const vetAppointmentRoutes = require('./routes/vetAppointments');
const driverLogRoutes = require('./routes/driverLogs');

app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/vet-appointments', vetAppointmentRoutes);
app.use('/api/driver-logs', driverLogRoutes);

app.listen(PORT, () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});
