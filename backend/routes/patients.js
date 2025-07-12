const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/patients/register', async (req, res) => {
  try {
    const { username, password, full_name } = req.body;

    if (!username || !password || !full_name) return res.status(400).json({ msg: 'Incomplete data' });

    const role_id = 3;
    const password_hash = await bcrypt.hash(password, 10);

    await db.execute('INSERT INTO users(username, password_hash, full_name, role_id) VALUES(?,?,?,?)', [
      username,
      password_hash,
      full_name,
      role_id,
    ]);

    return res.status(201).json({ msg: 'Data Pasien Baru berhasil dibuat' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error });
  }
});

router.post('/patients/:user_id/profile', async (req, res) => {
  try {
    const { nik, gender, birth_date, phone, address } = req.body;
    const { user_id } = req.params;

    if (!nik || !gender || !birth_date || !phone || !address)
      return res.status(400).json({ msg: 'Incomplete data' });

    if (!user_id) return res.status(400).json({ msg: 'User ID is invalid or deleted' });

    await db.execute(
      'INSERT INTO patients(user_id, nik, gender, birth_date, phone, address) VALUES(?,?,?,?,?,?)',
      [user_id, nik, gender, birth_date, phone, address]
    );

    return res.status(201).json({ msg: 'Berhasil menambahkan data Profile Pasien' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error });
  }
});

router.put('/patients/:user_id/profile', async (req, res) => {
  try {
    const { nik, gender, birth_date, phone, address } = req.body;
    const { user_id } = req.params;

    if (!nik || !gender || !birth_date || !phone || !address)
      return res.status(400).json({ msg: 'Incomplete data' });

    if (!user_id) return res.status(400).json({ msg: 'User ID is invalid or deleted' });

    await db.execute(
      'UPDATE patients SET nik = ?, gender = ?, birth_date = ?, phone = ?, address = ? WHERE user_id = ?',
      [nik, gender, birth_date, phone, address, user_id]
    );

    return res.status(201).json({ msg: 'Berhasil edit data Profile Pasien' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error });
  }
});

router.get('/patients/daftaronline/:patient_id', async (req, res) => {
  try {
    const { patient_id } = req.params;

    const [data] = await db.execute(
      'SELECT * FROM appointments WHERE patient_id = ? ORDER BY department_id DESC',
      [patient_id]
    );

    res.status(200).json({
      msg: `Data berhasil diambil, pasien: ${patient_id}`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Server error',
      err: error,
    });
  }
});

router.post('/patients/daftaronline', async (req, res) => {
  try {
    const { patient_id, schedule_date, department_id, doctor_id } = req.body;

    if (!patient_id || !schedule_date || !department_id || !doctor_id)
      return res.status(400).json({ msg: 'Incomplete data' });

    const status = 'waiting';

    await db.execute(
      'INSERT INTO appointments(patient_id, schedule_date, department_id, doctor_id, status) VALUES(?,?,?,?,?)',
      [patient_id, schedule_date, department_id, doctor_id, status]
    );

    return res.status(201).json({ msg: 'Berhasil melakukan daftar online' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error });
  }
});

module.exports = router;
