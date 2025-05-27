const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name : String,
    age : Number,
    gender : String,
    address : String,
    department : {
        type : mongoose.Schema.ObjectId,
        ref : 'Department',
        required : false
    }
});

module.exports = mongoose.model('Doctor',DoctorSchema);