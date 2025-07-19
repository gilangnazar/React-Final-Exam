const db = require('../db');

async function getPatientId(user_id) {
  const [row] = await db.execute('SELECT patient_id FROM patients WHERE user_id = ? AND deleted_at IS null', [
    user_id,
  ]);

  if (!row.length) throw new Error('Patient not found');

  return row[0].patient_id;
}

async function getDoctorId(user_id) {
  const [row] = await db.execute('SELECT doctor_id FROM doctors WHERE user_id = ? AND deleted_at IS null', [
    user_id,
  ]);

  if (!row.length) throw new Error('Doctor not found');

  return row[0].doctor_id;
}

module.exports = { getPatientId, getDoctorId };
