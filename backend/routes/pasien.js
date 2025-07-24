const express = require('express');
const bcrypt = require('bcrypt');

const db = require('../db');
const appointmentsController = require('../controllers/appointmentsController');

const router = express.Router();

/* PASIEN DAFTARONLINE */
router.post('/pasien/:user_id/appointments', appointmentsController.createAppointment);
router.get('/pasien/:user_id/appointments', appointmentsController.fetchAppointment);

router.get('/pasien/:user_id/dashboard', async (req, res) => {
  const { user_id } = req.params;

  try {
    // 1. Dapatkan patient_id dari user_id
    const [patientRows] = await db.execute(`SELECT patient_id FROM patients WHERE user_id = ?`, [user_id]);
    if (patientRows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    const patient_id = patientRows[0].patient_id;

    // 2. Ambil appointment aktif hari ini
    const [todayAppointmentRows] = await db.execute(
      `
      SELECT a.appointment_id, q.queue_number, d.name AS department, doc.specialization AS doctor
      FROM appointments a
      LEFT JOIN queues q ON q.appointment_id = a.appointment_id
      JOIN departments d ON d.department_id = a.department_id
      JOIN doctors doc ON doc.doctor_id = a.doctor_id
      WHERE a.patient_id = ? AND a.schedule_date = CURDATE()
      LIMIT 1
    `,
      [patient_id]
    );

    const myQueue = todayAppointmentRows[0]?.queue_number || null;

    // 3. Ambil current queue number yang sedang dipanggil (status = 'called') hari ini
    const [currentQueueRows] = await db.execute(`
      SELECT MAX(q.queue_number) AS current_queue
      FROM queues q
      JOIN appointments a ON a.appointment_id = q.appointment_id
      WHERE q.status = 'called' AND a.schedule_date = CURDATE()
    `);

    const currentQueue = currentQueueRows[0]?.current_queue || 0;

    // 4. Daftar semua appointment milik pasien
    const [appointmentListRows] = await db.execute(
      `
      SELECT 
        a.appointment_id,
        q.queue_number,
        d.name AS department,
        doc.specialization AS doctor,
        a.status
      FROM appointments a
      LEFT JOIN queues q ON q.appointment_id = a.appointment_id
      JOIN departments d ON d.department_id = a.department_id
      JOIN doctors doc ON doc.doctor_id = a.doctor_id
      WHERE a.patient_id = ?
      ORDER BY a.created_at DESC
    `,
      [patient_id]
    );

    res.json({
      my_queue: myQueue,
      current_queue: currentQueue,
      appointments: appointmentListRows,
    });
  } catch (error) {
    console.error('Error in getDashboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
/* PASIEN DAFTARONLINE END*/

/* REGISTER DAN PROFILE PASIEN */
router.post('/pasien/register', async (req, res) => {
  try {
    const { username, password, full_name } = req.body;

    if (!username || !password || !full_name) return res.status(400).json({ msg: 'Incomplete data' });

    const role_id = 3;
    const password_hash = await bcrypt.hash(password, 10);

    const [createUser] = await db.execute(
      'INSERT INTO users(username, password_hash, full_name, role_id) VALUES(?,?,?,?)',
      [username, password_hash, full_name, role_id]
    );

    const user_id = createUser.insertId;
    console.log(user_id);
    await db.execute(
      'INSERT INTO patients(user_id, nik, gender, birth_date, phone, address) VALUES(?, null,null,null,null,null)',
      [user_id]
    );

    return res.status(201).json({ msg: 'Data Pasien Baru berhasil dibuat' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error });
  }
});

router.get('/pasien/:user_id/profile', async (req, res) => {
  try {
    const { user_id } = req.params;

    const query = `SELECT 
  u.user_id,
  u.username,
  u.full_name,
  p.patient_id,
  p.nik,
  p.phone,
  p.gender,
  p.birth_date,
  p.address
FROM users u
JOIN patients p ON p.user_id = u.user_id
WHERE u.user_id = ?;`;

    const [data] = await db.execute(query, [user_id]);
    if (data.length === 0) return res.status(400).json({ msg: 'profile tidak ditemukan' });

    return res.status(200).json({
      msg: 'Profile Pasien',
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Server Error',
      error: error,
    });
  }
});

// router.post('/pasien/:user_id/profile', async (req, res) => {
//   try {
//     const { nik, gender, birth_date, phone, address } = req.body;
//     const { user_id } = req.params;

//     if (!nik || !gender || !birth_date || !phone || !address)
//       return res.status(400).json({ msg: 'Incomplete data' });

//     if (!user_id) return res.status(400).json({ msg: 'User ID is invalid or deleted' });

//     await db.execute(
//       'INSERT INTO patients(user_id, nik, gender, birth_date, phone, address) VALUES(?,?,?,?,?,?)',
//       [user_id, nik, gender, birth_date, phone, address]
//     );

//     return res.status(201).json({ msg: 'Berhasil menambahkan data Profile Pasien' });
//   } catch (error) {
//     return res.status(500).json({ msg: 'Server error', err: error });
//   }
// });

router.put('/pasien/:user_id/profile', async (req, res) => {
  try {
    const { nik, gender, birth_date, phone, address } = req.body;
    const { user_id } = req.params;

    if (!nik || !gender || !birth_date || !phone || !address)
      return res.status(400).json({ msg: 'Incomplete data' });

    if (!user_id) return res.status(400).json({ msg: 'User ID is invalid or deleted' });

    await db.execute(
      'UPDATE patients SET nik = ?, gender = ?, birth_date = ?, phone = ?, address = ? WHERE user_id = ?',
      [nik, gender, birth_date, phone, address, user_id]
    );

    return res.status(201).json({ msg: 'Berhasil edit data Profile Pasien' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error });
  }
});
/* REGISTER DAN PROFILE PASIEN END */

module.exports = router;
