const express = require('express');
const appointmentsController = require('../controllers/appointmentsController');

const router = express.Router();

/* PENDAFTARAN APPOINTMENTS */
router.get('/pendaftaran/appointments', appointmentsController.pendaftaranFetchAppointments);
router.put('/pendaftaran/appointments/:appointment_id/confirmed', appointmentsController.pendaftaranConfirmedAppointments);
// router.get('/pendaftaran/', appointmentsController.);
/* PENDAFTARAN DAFTARONLINE END*/

module.exports = router;
