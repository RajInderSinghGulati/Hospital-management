const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/',appointmentController.addAppointment);
router.get('/',appointmentController.getAppointments);
router.get('/patient/:patientId',appointmentController.getAppointmentsByPatientId);
router.get('/doctor/:doctorId',appointmentController.getAppointmentsByDoctorId);
router.get('/:apptId',appointmentController.getAppointmentById,);
router.delete('/',appointmentController.deleteAllAppointments);
router.delete('/patient/:patientId',appointmentController.deleteAppointmentsOfPatient);
router.delete('/doctor/:doctorId',appointmentController.deleteAppointmentsOfDoctor);
router.delete('/:apptId',appointmentController.deleteAppointment);


module.exports = router;