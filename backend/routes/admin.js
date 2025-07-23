const express = require('express');
const medicinesController = require('../controllers/medicinesController');

const router = express.Router();

// Medicines
router.get('/admin/madicines', medicinesController.getMedicines);
router.post('/admin/madicines', medicinesController.postMedicines);
router.put('/admin/madicines/:medicine_id', medicinesController.putMedicines);
router.delete('/admin/madicines/:medicine_id', medicinesController.softDeleteMedicines);
router.put('/admin/madicines/:medicine_id', medicinesController.restoreMedicines);

// Departments
// router.get('/departments');

// router.post('/departments');

// router.put('/departments/:department_id');

// router.delete('/departments/:department_id');

// router.put('/departments/:department_id/restore');

module.exports = router;
