require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

app.use(express.json()); // Middleware to parse JSON
app.use('/api/patients', patientRoutes);
app.use('/api/doctors',doctorRoutes);
app.use('/api/departments',departmentRoutes);
app.use('/api/appointments',appointmentRoutes);

app.get('/', (req, res) => {
  res.send("Welcome to hospital management system!");
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
    process.exit(1); // Exit the process if DB connection fails
  });
