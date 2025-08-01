const db = require('../db');
const { getPatientId, getDoctorId } = require('../utils/userRoles');

// ROLE: ADMIN
exports.adminGetAllAppointments = async (req, res) => {
  try {
    query = `SELECT a.appointment_id, u.full_name, a.schedule_date, dep.name as department_name, a.status
FROM appointments a 
JOIN departments dep ON dep.department_id = a.department_id
JOIN patients p ON a.patient_id = p.patient_id
JOIN users u ON p.user_id = u.user_id
WHERE a.deleted_at IS null`;

    const [data] = await db.execute(query);

    return res.status(200).json({ msg: 'Data Appointments fetched successfully', data: data });
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error', err: error });
  }
};

exports.adminSoftDeleteAppointment = async (req, res) => {
  try {
    const { appointment_id } = req.params;

    if (!appointment_id) return res.status(400).json({ msg: 'Invalid Appointment ID' });

    const query = `UPDATE appointments SET deleted_at = NOW() WHERE appointment_id = ?`;
    await db.execute(query, [appointment_id]);

    return res.status(200).json({ msg: 'Appointment successfully soft deleted' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

exports.adminRestoreAppointment = async (req, res) => {
  try {
    const { appointment_id } = req.params;

    if (!appointment_id) return res.status(400).json({ msg: 'Invalid Appointment ID' });

    const query = `UPDATE appointments SET deleted_at = NULL WHERE appointment_id = ?`;
    await db.execute(query, [appointment_id]);

    return res.status(200).json({ msg: 'Appointment successfully restored' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

// ROLE: PASIEN
exports.createAppointment = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { schedule_date, department_id, doctor_id } = req.body;

    const patient_id = await getPatientId(user_id);

    if (!patient_id) return res.status(400).json({ msg: 'Invalid User Id' });

    if (!schedule_date || !department_id || !doctor_id)
      return res.status(400).json({ msg: 'Incomplete data' });

    const queryCheckMultipleAppointment = `SELECT * FROM appointments WHERE patient_id = 1 AND schedule_date = CURDATE() AND department_id = 1 AND status IN ('waiting', 'confirmed');`;
    const [checkMultipleAppointment] = await db.execute(queryCheckMultipleAppointment);
    if (checkMultipleAppointment.length > 0)
      return res.status(400).json({ msg: 'Tidak dapat membuat 2 Pertemuan di Poli yang sama' });

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

    const query = `SELECT 
  a.appointment_id,
  a.patient_id,
  a.schedule_date,
  a.status,
  
  d.doctor_id,
  d.specialization,
  u.full_name AS doctor_name,
  
  dept.department_id,
  dept.name AS department_name

FROM appointments a
JOIN doctors d ON d.doctor_id = a.doctor_id
JOIN users u ON u.user_id = d.user_id
JOIN departments dept ON dept.department_id = d.department_id

WHERE a.patient_id = ? AND a.deleted_at IS NULL
ORDER BY a.schedule_date DESC;`;
    const [rows] = await db.execute(query, [patient_id]);

    return res.status(200).json({ msg: 'Data daftar online pasien', data: rows });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

// ROLE: PENDAFTARAN
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

    const queryConfirmedAppointment = `UPDATE appointments SET status = 'confirmed' WHERE appointment_id = ?`;
    await db.execute(queryConfirmedAppointment, [appointment_id]);

    const queryFetchLastNumber = `SELECT MAX(queue_number) AS last_queue FROM queues WHERE DATE(created_at) = CURDATE()`;
    const last_number = await db.execute(queryFetchLastNumber);
    console.log('last number of q: ', last_number[0][0].last_queue);

    const queue_number = Number(last_number[0][0].last_queue ? last_number[0][0].last_queue : 0) + 1;
    const status = queue_number === 1 ? 'calling' : 'waiting';

    const queryCraeteQueue = `INSERT INTO queues(appointment_id, queue_number, status) VALUES(?, ?, ?)`;
    const [queueResult] = await db.execute(queryCraeteQueue, [appointment_id, queue_number, status]);

    if (queue_number === 1) {
      const queue_id = queueResult.insertId;
      const querySetCallTime = `UPDATE queues SET call_time = NOW() WHERE queue_id = ?`;
      await db.execute(querySetCallTime, [queue_id]);
    }

    return res.status(200).json({ msg: 'Berhasil ubah status Appointment, dan membuat nomor antrian baru' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

// ROLE: DOCTOR
exports.doctorFetchAppointments = async (req, res) => {
  try {
    const { user_id } = req.params;

    const doctor_id = await getDoctorId(user_id);

    const queryFetchDoctorAppointments = `SELECT 
  a.appointment_id,
  a.doctor_id,
  a.status,
  p.patient_id,
  u.full_name AS patient_name,
  d.name AS department_name
FROM appointments a
JOIN patients p ON a.patient_id = p.patient_id
JOIN departments d ON a.department_id = d.department_id
JOIN users u ON p.user_id = u.user_id
WHERE a.doctor_id = ? AND schedule_date = CURDATE()`;

    const [data] = await db.execute(queryFetchDoctorAppointments, [doctor_id]);

    res.status(200).json({ msg: 'Data Appointments fetched successfully', data: data });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error', err: error });
  }
};

exports.doctorCompletedAppointment = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const { appointment_id } = req.params;

    const queryChangeQueueStatus = `UPDATE queues SET status = 'done' WHERE appointment_id = ?`;
    await connection.execute(queryChangeQueueStatus, [appointment_id]);

    const queryChangeAppointmentStatus = `UPDATE appointments SET status = 'completed' WHERE appointment_id = ?`;
    await connection.execute(queryChangeAppointmentStatus, [appointment_id]);

    await connection.commit();
    return res.status(200).json({ msg: 'Appointment dan Queue berhasil diselesaikan' });
  } catch (error) {
    await connection.rollback();
    return res.status(500).json({ msg: 'SERVER ERROR', error });
  }
};
