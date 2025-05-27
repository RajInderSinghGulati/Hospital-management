const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/',doctorController.getAllDoctors);
router.get('/:doctId',doctorController.getDoctorById);
router.post('/',doctorController.createDoctor);
router.delete('/',doctorController.deleteAllDoctors);
router.delete('/:doctId',doctorController.deleteDoctorById);

module.exports = router;
