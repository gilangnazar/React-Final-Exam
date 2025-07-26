const express = require('express');
const doctorsController = require('../controllers/doctorsController');
const departmentsController = require('../controllers/departmentsController');
const medicinesController = require('../controllers/medicinesController');
const patientsController = require('../controllers/patientsController');

const router = express.Router();

router.get('/options/doctors', doctorsController.getAllDoctors);
router.get('/options/departments', departmentsController.getDepartments);
router.get('/options/medicines', medicinesController.getMedicines);
router.get('/options/patients', patientsController.getAllPatients);

module.exports = router;
