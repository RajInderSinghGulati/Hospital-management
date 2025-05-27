const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/',patientController.getAllPatients);
router.get('/:patientId',patientController.getPatientById);
router.post('/',patientController.createPatient);
router.delete('/',patientController.deleteAllPatients);
router.delete('/:patientId',patientController.deletePatientById);

module.exports = router;
