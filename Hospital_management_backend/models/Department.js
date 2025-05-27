const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    name : String,
    doctors : [{
        type : mongoose.Schema.ObjectId,
        ref : 'Doctor',
        required : false
    }]
});

module.exports = mongoose.model('Department',DepartmentSchema);