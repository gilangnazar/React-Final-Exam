const express = require('express');
const medicinesController = require('../controllers/medicinesController');
const departmentsController = require('../controllers/departmentsController');

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

module.exports = router;
