const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const [data] = await db.execute('SELECT * FROM users WHERE deleted_at IS NULL ORDER BY user_id DESC');

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

router.post('/users', async (req, res) => {
  try {
    const { username, password_hash, full_name, role_id } = req.body;
    if (!username || !password_hash || !full_name || !role_id)
      return res.status(400).json({ msg: 'Incomplete data' });

    await db.execute('INSERT INTO users(username, password_hash, full_name, role_id) VALUES(?,?,?,?)', [
      username,
      password_hash,
      full_name,
      role_id,
    ]);

    return res.status(201).json({ msg: 'User baru berhasil dibuat' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error });
  }
});

router.put('/users/:user_id', async (req, res) => {
  try {
    const { username, password_hash, full_name, role_id } = req.body;
    const { user_id } = req.params;

    if (!username || !password_hash || !full_name || !role_id)
      return res.status(400).json({ msg: 'Incomplete data' });
    if (!user_id) return res.status(400).json({ msg: 'User ID Is Invalid or Missing' });

    await db.execute(
      'UPDATE users SET username = ?, password_hash = ?, full_name = ?, role_id = ? WHERE user_id = ?',
      [username, password_hash, full_name, role_id, user_id]
    );

    return res.json({ msg: 'User berhasil Diedit' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
});

router.delete('/users/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) return res.status(400).json({ msg: 'User ID Is Invalid or Missing' });

    await db.execute('UPDATE users SET deleted_at = NOW() WHERE user_id = ?', [user_id]);

    return res.json({ msg: 'User berhasil Terhapus (Soft delete)' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
});

router.put('/users/:user_id/restore', async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) return res.status(400).json({ msg: 'User ID Is Invalid or Missing' });

    await db.execute('UPDATE users SET deleted_at = NULL WHERE user_id = ?', [user_id]);

    return res.json({ msg: 'User berhasil direstore' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
});

module.exports = router;
