const express = require('express');
const bcrypt = require('bcrypt');

const db = require('../db');
const appointmentsController = require('../controllers/appointmentsController');

const router = express.Router();

/* PASIEN DAFTARONLINE */
router.post('/pasien/:user_id/appointments', appointmentsController.createAppointment);
router.get('/pasien/:user_id/appointments', appointmentsController.fetchAppointment);
/* PASIEN DAFTARONLINE END*/

/* REGISTER DAN PROFILE PASIEN */
router.post('/pasien/register', async (req, res) => {
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

router.post('/pasien/:user_id/profile', async (req, res) => {
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

router.put('/pasien/:user_id/profile', async (req, res) => {
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
/* REGISTER DAN PROFILE PASIEN END */

module.exports = router;
