const db = require('../db');

exports.getAllDoctors = async (req, res) => {
  try {
    const query = `SELECT 
  d.doctor_id,
  d.department_id,
  u.user_id,
  u.full_name AS doctor_name,
  d.specialization,
  dp.name AS department_name
FROM doctors d
JOIN users u ON u.user_id = d.user_id
JOIN departments dp ON dp.department_id = d.department_id
WHERE d.deleted_at IS NULL
ORDER BY u.full_name ASC;`;
    const [data] = await db.execute(query);

    res.status(200).json({
      msg: 'Data dokter berhasil diambil',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Server error',
      err: error,
    });
  }
};

exports.softDeleteDoctor = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    if (!doctor_id) return res.status(400).json({ msg: 'Doctor ID Is Invalid or Missing' });

    await db.execute('UPDATE doctors SET deleted_at = NOW() WHERE doctor_id = ?', [doctor_id]);

    return res.json({ msg: 'Data dokter berhasil dihapus (Soft delete)' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

exports.restoreDoctor = async (req, res) => {
  try {
    const { doctor_id } = req.params;
    if (!doctor_id) return res.status(400).json({ msg: 'Doctor ID Is Invalid or Missing' });

    await db.execute('UPDATE doctors SET deleted_at = NULL WHERE doctor_id = ?', [doctor_id]);

    return res.json({ msg: 'Data dokter berhasil direstore' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};
