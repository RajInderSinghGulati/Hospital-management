const Department = require('../models/Department');
const Doctor = require('../models/Doctor');

exports.addDepartment = async (req,res) => {
    try{
        const newDepartment = new Department(req.body);
        await newDepartment.save();
        res.status(201).json(newDepartment);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.getDepartments = async (req, res) => {
    try{
        const departments = await Department.find();
        res.json(departments);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.getDepartmentById = async (req, res) => {
    try{
        const {deptId} = req.params;
        const department = await Department.findById(deptId);
        if(!department) return res.status(404).json({message : "Department not Found"});
        res.status(200).json(department);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.addDoctorToDepartment = async (req, res) => {
    try{
        const {departmentId} = req.param.deptid;
        const {doctorId} = req.param.doctid;

        const department = await Department.findById(departmentId);
        if(!department) return res.status(404).json({error : "Department doesnt exist"});

        const doctor = await Doctor.findById(doctorId);
        if(!doctor) return res.status(404).json({error : "Doctor not found"});

        if(!department.doctors.some(id => String(id) === String(doctorId))){
            department.doctors.push(doctorId);
            doctor.id = departmentId;
            await doctor.save();
            await department.save();
        }

        res.status(201).json(department);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.deleteAllDepartments = async (req, res) => {
    try{
        await Doctor.updateMany({department :{$ne:null}},{$set : {department : null}});
        await Department.deleteMany({});
        res.status(200).json({message : "Deleted departments"});
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.deleteDepartmentById = async (req,res) => {
    try{
        const {departmentId} = req.params;
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        await Promise.all(department.doctors.map(async (doctorId) => {
            await Doctor.findByIdAndUpdate(doctorId, { $unset: { department: "" } });
        }));
        const result = await Department.deleteOne({_id : departmentId});
        if(result.deletedCount == 0) return res.status(404).json({message : "Department not found"});
        res.status(200).json({message : "Department deleted"});

    } catch(err){
        res.status(500).json({error : err.message});
    }
};