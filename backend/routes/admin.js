const express = require('express');
const medicinesController = require('../controllers/medicinesController');
const departmentsController = require('../controllers/departmentsController');
const rolesController = require('../controllers/rolesController');
const usersController = require('../controllers/usersController');
const patientsController = require('../controllers/patientsController');

const router = express.Router();

// Medicines
router.get('/admin/madicines', medicinesController.getMedicines);
router.post('/admin/madicines', medicinesController.postMedicines);
router.put('/admin/madicines/:medicine_id', medicinesController.putMedicines);
router.delete('/admin/madicines/:medicine_id', medicinesController.softDeleteMedicines);
router.put('/admin/madicines/:medicine_id', medicinesController.restoreMedicines);

// Departments
router.get('/admin/departments', departmentsController.getDepartments);
router.post('/admin/departments', departmentsController.postDepartments);
router.put('/admin/departments/:department_id', departmentsController.putDepartments);
router.delete('/admin/departments/:department_id', departmentsController.deleteDepartments);
router.put('/admin/departments/:department_id/restore', departmentsController.restoreDepartments);

// Roles
router.get('/admin/roles', rolesController.getRoles);
router.post('/admin/roles', rolesController.postRoles);
router.put('/admin/roles/:role_id', rolesController.putRoles);
router.delete('/admin/roles/:role_id', rolesController.softDeleteRoles);
router.put('/admin/roles/:role_id/restore', rolesController.restoreRoles);

// Users
router.get('/admin/users', usersController.getUsers);
router.post('/admin/users', usersController.postUsers);
router.put('/admin/users/:user_id', usersController.putUsers);
router.delete('/admin/users/:user_id', usersController.deleteUsers);
router.put('/admin/users/:user_id/restore', usersController.restoreUsers);

// Patients
router.get('/admin/patients', patientsController.getAllPatients);
router.delete('/admin/patients/:patient_id', patientsController.softDeletePatients);
router.put('/admin/patients/:patient_id/restore', patientsController.restorePatients);
router.put('/admin/patients/:patient_id/deactivate', patientsController.deactivatePatient);
router.put('/admin/patients/:patient_id/activate', patientsController.activatePatient);

// Appointments
router.get('/admin/appointments', );


module.exports = router;
