const db = require('../db');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
  try {
    const [data] = await db.execute(`
      SELECT 
      u.user_id, u.username, u.full_name, u.role_id, r.role_name, u.status, u.created_at, u.deleted_at
      FROM users u 
      INNER JOIN roles r ON u.role_id = r.role_id
      WHERE u.deleted_at IS NULL ORDER BY user_id DESC
      `);

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
};

exports.postUsers = async (req, res) => {
  try {
    const { username, password, full_name, role_id } = req.body;
    if (!username || !password || !full_name || !role_id)
      return res.status(400).json({ msg: 'Incomplete data' });

    const password_hash = await bcrypt.hash(password, 10);

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
};

exports.putUsers = async (req, res) => {
  try {
    const { username, password, full_name, role_id } = req.body;
    const { user_id } = req.params;

    if (!username || !password || !full_name || !role_id)
      return res.status(400).json({ msg: 'Incomplete data' });
    if (!user_id) return res.status(400).json({ msg: 'User ID Is Invalid or Missing' });

    const password_hash = await bcrypt.hash(password, 10);

    await db.execute(
      'UPDATE users SET username = ?, password_hash = ?, full_name = ?, role_id = ? WHERE user_id = ?',
      [username, password_hash, full_name, role_id, user_id]
    );

    return res.json({ msg: 'User berhasil Diedit' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) return res.status(400).json({ msg: 'User ID Is Invalid or Missing' });

    await db.execute('UPDATE users SET deleted_at = NOW() WHERE user_id = ?', [user_id]);

    return res.json({ msg: 'User berhasil Terhapus (Soft delete)' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

exports.restoreUsers = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) return res.status(400).json({ msg: 'User ID Is Invalid or Missing' });

    await db.execute('UPDATE users SET deleted_at = NULL WHERE user_id = ?', [user_id]);

    return res.json({ msg: 'User berhasil direstore' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};
