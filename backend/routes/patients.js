const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/patients/register', async (req, res) => {
  console.log('masuk regis pasien');
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

module.exports = router;
