const express = require('express');
const medicinePickupController = require('../controllers/medicinePickupController');

const router = express.Router();

router.get('/apoteker/prescriptions', medicinePickupController.fetchPrescriptions);
router.put('/apoteker/pickup/:pickup_id', medicinePickupController.pickUpMedicine);

module.exports = router;
