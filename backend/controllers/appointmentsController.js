const db = require('../db');
const { getPatientId, getDoctorId } = require('../utils/userRoles');

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

    const [rows] = await db.execute('SELECT * FROM appointments WHERE patient_id = ?', [patient_id]);

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
