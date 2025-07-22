const express = require('express');
const medicinePickupController = require('../controllers/medicinePickupController');

const router = express.Router();

router.put('/apoteker/pickup/:pickup_id', medicinePickupController.pickUpMedicine);

module.exports = router;
