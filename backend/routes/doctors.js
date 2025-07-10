const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/doctors', async (req, res) => {
  try {
    const [data] = await db.execute('SELECT * FROM doctors WHERE deleted_at IS NULL ORDER BY doctor_id DESC');

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
