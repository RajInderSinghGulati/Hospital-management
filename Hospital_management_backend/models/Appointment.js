const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patientID : {
        type : mongoose.Schema.ObjectId,
        ref : 'Patient'
    },
    doctorID : {
        type : mongoose.Schema.ObjectId,
        ref : 'Doctor'
    },
    time : Date
});

module.exports = mongoose.model('Appointment',AppointmentSchema);