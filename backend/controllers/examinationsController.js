const db = require('../db');
const { getDoctorId } = require('../utils/userRoles');

exports.getExaminations = async (req, res) => {
  try {
    const { user_id } = req.params;
    const doctor_id = await getDoctorId(user_id);
    if (!doctor_id) return res.status(400).json({ msg: 'Invalid Doctor Id' });

    const query = `
      SELECT 
    e.exam_id,
    e.appointment_id,
    e.complaint,
    e.diagnosis,
    e.notes,
    a.patient_id,
    u.full_name AS patient_name,
    a.status AS appointment_status
FROM examinations e
JOIN appointments a ON e.appointment_id = a.appointment_id
JOIN users u ON a.patient_id = u.user_id
WHERE a.doctor_id = ?
    `;

    const [rows] = await db.execute(query, [doctor_id]);

    return res.status(200).json({
      msg: 'Data pemeriksaan berhasil diambil',
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching examinations:', error);
    return res.status(500).json({ message: 'Gagal mengambil data pemeriksaan' });
  }
};

exports.createExamination = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { appointment_id, complaint, diagnosis, notes } = req.body;
    const doctor_id = await getDoctorId(user_id);
    if (!doctor_id) return res.json(400).json({ msg: 'Invalid Doctor Id' });

    const query = `INSERT INTO examinations (appointment_id, doctor_id, complaint, diagnosis, notes, exam_date) VALUES (?, ?, ?, ?, ?, NOW())`;
    const [result] = await db.execute(query, [appointment_id, doctor_id, complaint, diagnosis, notes]);

    return res.status(201).json({
      message: 'Pemeriksaan berhasil disimpan',
      exam_id: result.insertId,
    });
  } catch (error) {
    console.error('Error creating examination:', error);
    return res.status(500).json({ message: 'Gagal menyimpan data pemeriksaan' });
  }
};
