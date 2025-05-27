const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

exports.addAppointment = async (req,res) => {
    try{
        const {doctorId,patientId} = req.body;
        const doctor = await Doctor.findById(doctorId);
        if(!doctor) return res.status(404).json({error : "Doctor not found"});
        const patient = await Patient.findById(patientId);
        if(!patient) return res.status(404).json({error : "Patient not found"});

        const appointment = new Appointment();
        appointment.doctorID = doctorId;
        appointment.patientID = patientId;
        appointment.time = new Date(Date.now() + 5 * 60000);
        await appointment.save();
        res.status(201).json(appointment);

    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.getAppointments = async (req,res) => {
    try{
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.getAppointmentById = async (req,res) => {
    try{
        const {apptId} = req.params;
        const appointment = await Appointment.findById(apptId);
        if(!appointment) return res.status(404).json({message : "Appointment not found"});
        res.status(200).json(appointment);
    } catch(err){
        res.status(500).json({error : err.message});
    }
}

exports.getAppointmentsByPatientId = async (req,res) => {
    try{
        const {patientId} = req.params;
        const appointments = await Appointment.find({patientID : patientId});
        res.status(200).json(appointments);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.getAppointmentsByDoctorId = async (req,res) => {
    try{
        const {doctorId} = req.params;
        const appointments = await Appointment.find({doctorID : doctorId});
        res.status(200).json(appointments);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};


exports.deleteAllAppointments = async (req, res) => {
    try{
        await Appointment.deleteMany({});
        res.status(200).json({message : "All appointments deleted succesfully."});
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.deleteAppointment = async (req,res) => {
    try{
        const {apptId} = req.params;
        const result = await Appointment.deleteOne({_id : apptId});
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({message : "Appointment deleted"});
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.deleteAppointmentsOfPatient = async (req, res) => {
    try{
        const {patientId} = req.params;
        await Appointment.deleteMany({patientID : patientId});
        res.status(200).json({message : "All appointments deleted succesfully."});
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.deleteAppointmentsOfDoctor = async (req, res) => {
    try{
        const {doctorId} = req.params;
        await Appointment.deleteMany({doctorID : doctorId});
        res.status(200).json({message : "All appointments deleted succesfully."});
    } catch(err){
        res.status(500).json({error : err.message});
    }
};