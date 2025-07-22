const express = require('express');
const paymentsController = require('../controllers/paymentsController');

const router = express.Router();

router.get('/kasir/payments', paymentsController.fetchPayments);
router.put('/kasir/payments/:payment_id/paid', paymentsController.changePaymentStatusToPaid);

module.exports = router;
