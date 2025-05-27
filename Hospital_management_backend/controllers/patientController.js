const Patient = require('../models/Patient');

exports.getAllPatients = async (req,res) => {
    try{
        const patients = await Patient.find();  
        res.json(patients);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.getPatientById = async (req, res) => {
    try{
        const {patientId} = req.params;
        const patient = await Patient.findById(patientId);
        if(!patient) return res.status(404).json({message : "Patient not found"});
        res.status(200).json(patient);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.createPatient = async (req,res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json(newPatient);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.deleteAllPatients = async (req,res) => {
    try{
        await Patient.deleteMany({});
    } catch(err){
        res.status(500).json({error : err.message});
    }
};  

exports.deletePatientById = async (req,res) => {
    try{
        const {patientId} = req.params;
        const result = await Patient.deleteOne({_id : patientId});
        if(result.deletedCount == 0) return res.status(404).json({message : "Patient not found"});
        res.status(200).json({message : "Patient deleted"});
    } catch(err){
        res.status(500).json({error : err.message});
    }
};