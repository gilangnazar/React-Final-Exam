const db = require('../db');
const { getPatientId } = require('../utils/userRoles');

exports.createAppointment = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { schedule_date, department_id, doctor_id } = req.body;

    const patient_id = await getPatientId(user_id);

    if (!patient_id) return res.status(400).json({ msg: 'Invalid User Id' });

    if (!schedule_date || !department_id || !doctor_id)
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
};

exports.fetchAppointment = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) return res.status(400).json({ msg: 'User Id invalid, try to login first' });

    const patient_id = await getPatientId(user_id);

    const [rows] = await db.execute('SELECT * FROM appointments WHERE patient_id = ?', [patient_id]);

    return res.status(200).json({ msg: 'Data daftar online pasien', data: rows });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

exports.pendaftaranFetchAppointments = async (req, res) => {
  try {
    const query = `SELECT a.appointment_id, u.full_name, a.schedule_date, dep.name as department_name, a.status
FROM appointments a 
JOIN departments dep ON dep.department_id = a.department_id
JOIN patients p ON a.patient_id = p.patient_id
JOIN users u ON p.user_id = u.user_id
WHERE a.status = 'waiting' AND a.deleted_at IS null`;

    const [rows] = await db.execute(query);

    return res.status(200).json({ msg: 'Berhasil Fetch data Appointments Pasien', data: rows });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

exports.pendaftaranConfirmedAppointments = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    if (!appointment_id) return res.status(400).json({ msg: 'Invalid ID' });

    const query = `UPDATE appointments SET status = 'confirmed' WHERE appointment_id = ?`;

    const [rows] = await db.execute(query, [appointment_id]);

    return res.status(200).json({ msg: 'Berhasil ubah status Appointment' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};
