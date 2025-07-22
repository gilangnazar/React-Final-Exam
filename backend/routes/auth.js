const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../db');
const router = express.Router();

require('dotenv').config();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.execute('select * from users where username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({
        msg: 'username tidak ditemukan',
      });
    }
    const user = rows[0];

    const validatePassword = await bcrypt.compare(password, user.password_hash);
    if (!validatePassword) {
      return res.status(401).json({
        msg: 'password salah',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role_id: user.role_id,
        full_name: user.full_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({
      token,
      data: {
        user_id: user.id,
        username: user.username,
        role_id: user.role_id,
        full_name: user.full_name,
      },
    });
  } catch (error) {
    console.error('login error: ', error);
    return res.status(500).json({
      msg: 'terjadi kesalahan saat login pada server',
      error: error,
    });
  }
});

router.post('/logout', (req, res) => {
  res.json({ msg: 'anda telah berhasil logout' });
});

module.exports = router;
