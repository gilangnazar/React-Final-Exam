const express = require('express');
const db = require('../db');
const appointmentsController = require('../controllers/appointmentsController');
const examinationsController = require('../controllers/examinationsController');
const prescriptionsController = require('../controllers/prescriptionsController');

const router = express.Router();

router.get('/doctors/:user_id/appointments', appointmentsController.doctorFetchAppointments);
router.get('/doctors/:user_id/examinations', examinationsController.getExaminations);
router.post('/doctors/:user_id/examinations', examinationsController.createExamination);
router.post('/doctors/prescriptions', prescriptionsController.createPrescription);
router.put(
  '/doctors/appointments/:appointment_id/completed',
  appointmentsController.doctorCompletedAppointment
);

router.get('/doctors', async (req, res) => {
  try {
    const query = `SELECT
doc.doctor_id,
u.full_name AS doctor_name,
dep.name AS department_name,
doc.specialization,
doc.user_id
FROM doctors doc
JOIN departments dep ON doc.department_id = dep.department_id AND dep.deleted_at IS NULL
JOIN users u ON doc.user_id = u.user_id AND u.deleted_at IS NULL
WHERE doc.deleted_at IS NULL
ORDER BY doc.doctor_id DESC;`;

    const [data] = await db.execute(query);

    res.status(200).json({
      msg: 'Data berhasil diambil',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Server error',
      err: error,
    });
  }
});

router.post('/doctors', async (req, res) => {
  try {
    const { user_id, department_id, specialization } = req.body;
    if (!user_id || !department_id || !specialization)
      return res.status(400).json({ msg: 'Incomplete data' });

    await db.execute('INSERT INTO doctors(user_id, department_id, specialization) VALUES(?,?,?)', [
      user_id,
      department_id,
      specialization,
    ]);

    return res.status(201).json({ msg: 'Data Dokter baru berhasil dibuat' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error });
  }
});

router.put('/doctors/:doctor_id', async (req, res) => {
  try {
    const { user_id, department_id, specialization } = req.body;
    const { doctor_id } = req.params;

    if (!user_id || !department_id || !specialization)
      return res.status(400).json({ msg: 'Incomplete data' });
    if (!doctor_id) return res.status(400).json({ msg: 'Doctor ID Is Invalid or Missing' });

    await db.execute(
      'UPDATE doctors SET user_id = ?, department_id = ?, specialization = ? WHERE doctor_id = ?',
      [user_id, department_id, specialization, doctor_id]
    );

    return res.json({ msg: 'Data Dokter berhasil Diedit' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
});

router.delete('/doctors/:doctor_id', async (req, res) => {
  try {
    const { doctor_id } = req.params;
    if (!doctor_id) return res.status(400).json({ msg: 'Doctor ID Is Invalid or Missing' });

    await db.execute('UPDATE doctors SET deleted_at = NOW() WHERE doctor_id = ?', [doctor_id]);

    return res.json({ msg: 'Dokter berhasil Terhapus (Soft delete)' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
});

router.put('/doctors/:doctor_id/restore', async (req, res) => {
  try {
    const { doctor_id } = req.params;
    if (!doctor_id) return res.status(400).json({ msg: 'Doctor ID Is Invalid or Missing' });

    await db.execute('UPDATE doctors SET deleted_at = NULL WHERE doctor_id = ?', [doctor_id]);

    return res.json({ msg: 'Dokter berhasil direstore' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
});

module.exports = router;
