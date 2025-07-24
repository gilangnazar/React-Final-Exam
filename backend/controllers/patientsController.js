const db = require('../db');
const userRoles = require('../utils/userRoles');

exports.getAllPatients = async (req, res) => {
  try {
    query = `SELECT 
        p.patient_id,
        u.user_id,
      	p.nik,
        u.full_name,
        p.gender,
        p.birth_date,
        p.phone,
        p.address, 
        u.status
      FROM patients p
      JOIN users u ON u.user_id = p.user_id
      WHERE u.deleted_at IS null
      ORDER BY u.created_at DESC`;
    const [data] = await db.execute(query);

    res.status(200).json({
      msg: 'Data pasien berhasil diambil',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Server error',
      err: error,
    });
  }
};

exports.softDeletePatients = async (req, res) => {
  try {
    const { patient_id } = req.params;
    if (!patient_id) return res.status(400).json({ msg: 'patient ID Is Invalid or Missing' });

    await db.execute('UPDATE patients SET deleted_at = NOW() WHERE patient_id = ?', [patient_id]);

    return res.json({ msg: 'Data pasien berhasil Terhapus (Soft delete)' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

exports.restorePatients = async (req, res) => {
  try {
    const { patient_id } = req.params;
    if (!patient_id) return res.status(400).json({ msg: 'patient ID Is Invalid or Missing' });

    await db.execute('UPDATE patients SET deleted_at = NULL WHERE patient_id = ?', [patient_id]);

    return res.json({ msg: 'Data pasien berhasil direstore' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

exports.deactivatePatient = async (req, res) => {
  try {
    const { patient_id } = req.params;
    if (!patient_id) return res.status(400).json({ msg: 'patient ID Is Invalid or Missing' });

    const user_id = await userRoles.getUserId('patients', 'patient_id', patient_id);

    await db.execute('UPDATE users SET status = "inactive" WHERE user_id = ?', [user_id]);

    return res.json({ msg: 'Data pasien inactive' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

exports.activatePatient = async (req, res) => {
  try {
    const { patient_id } = req.params;
    if (!patient_id) return res.status(400).json({ msg: 'patient ID Is Invalid or Missing' });

    const user_id = await userRoles.getUserId('patients', 'patient_id', patient_id);

    await db.execute('UPDATE users SET status = "active" WHERE user_id = ?', [user_id]);

    return res.json({ msg: 'Data pasien active' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};
