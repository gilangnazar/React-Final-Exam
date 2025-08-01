const db = require('../db');

exports.getRoles = async (req, res) => {
  try {
    const [data] = await db.execute('SELECT * FROM roles WHERE deleted_at IS NULL ORDER BY role_id DESC');

    res.status(200).json({
      msg: 'Data Role berhasil diambil',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Server error',
      err: error,
    });
  }
};

exports.postRoles = async (req, res) => {
  try {
    const { role_name } = req.body;
    if (!role_name) return res.status(400).json({ msg: 'Incomplete data' });

    await db.execute('INSERT INTO roles(role_name) VALUES(?)', [role_name]);

    return res.status(201).json({ msg: 'Data Role baru berhasil dibuat' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error });
  }
};

exports.putRoles = async (req, res) => {
  try {
    const { role_name } = req.body;
    const { role_id } = req.params;

    if (!role_name) return res.status(400).json({ msg: 'Incomplete data' });
    if (!role_id) return res.status(400).json({ msg: 'Role ID Is Invalid or Missing' });

    await db.execute('UPDATE roles SET role_name = ? WHERE role_id = ?', [role_name, role_id]);

    return res.json({ msg: 'Data Role berhasil Diedit' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

exports.softDeleteRoles = async (req, res) => {
  try {
    const { role_id } = req.params;
    if (!role_id) return res.status(400).json({ msg: 'Department ID Is Invalid or Missing' });

    await db.execute('UPDATE roles SET deleted_at = NOW() WHERE role_id = ?', [role_id]);

    return res.json({ msg: 'Data obat berhasil Terhapus (Soft delete)' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

exports.restoreRoles = async (req, res) => {
  try {
    const { role_id } = req.params;
    if (!role_id) return res.status(400).json({ msg: 'role ID Is Invalid or Missing' });

    await db.execute('UPDATE roles SET deleted_at = NULL WHERE role_id = ?', [role_id]);

    return res.json({ msg: 'Data Role berhasil direstore' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};
