const db = require('../db');
const { getDoctorId } = require('../utils/userRoles');

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
