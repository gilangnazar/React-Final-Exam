const db = require('../db');

async function getPatientId(user_id) {
  const [row] = await db.execute('SELECT patient_id FROM patients WHERE user_id = 4 AND deleted_at IS null', [
    user_id,
  ]);

  if (!row.length) throw new Error('Patient not found');

  return row[0].patient_id;
}

module.exports = { getPatientId };
