const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.post('/', departmentController.addDepartment);
router.get('/', departmentController.getDepartments);
router.get('/:deptId',departmentController.getDepartmentById);
router.post('/:deptId/:doctId', departmentController.addDoctorToDepartment);
router.delete('/',departmentController.deleteAllDepartments);
router.delete('/:deptId',departmentController.deleteDepartmentById);

module.exports = router;
