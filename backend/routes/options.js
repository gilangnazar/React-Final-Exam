const express = require('express');
const doctorsController = require('../controllers/doctorsController');
const departmentsController = require('../controllers/departmentsController');

const router = express.Router();

router.get('/options/doctors', doctorsController.getAllDoctors);
router.get('/options/departments', departmentsController.getDepartments);

module.exports = router;
