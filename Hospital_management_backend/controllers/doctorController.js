const Department = require('../models/Department');
const Doctor = require('../models/Doctor');

exports.getAllDoctors = async (req,res) => {
    try{
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.getDoctorById = async (req, res) => {
    try{
        const {doctorId} = req.params;
        const doctor = await Doctor.findById(doctorId);
        if(!doctor) return res.status(404).json({message : "Doctor not found"});
        res.status(200).json(doctor);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.createDoctor = async (req,res) => {
    try{
        const newDoctor = new Doctor(req.body);
        await newDoctor.save();
        if(newDoctor.department){
            await Department.findByIdAndUpdate(newDoctor.department,{$addToSet : {doctors : newDoctor.id}});
        }
        res.status(201).json(newDoctor);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.deleteAllDoctors = async (req,res) => {
    try{
        await Doctor.deleteMany({});
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.deleteDoctorById = async (req,res) => {
    try{
        const {doctorId} = req.params;
        const result = await Doctor.deleteOne({_id : doctorId});
        if(result.deletedCount == 0) return res.status(404).json({message : "Patient not found"});
        res.status(200).json({message : "Doctor deleted"});
    } catch(err){
        res.status(500).json({error : err.message});
    }
};