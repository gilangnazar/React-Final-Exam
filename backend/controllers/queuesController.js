const db = require('../db');

exports.getAllQueues = async (req, res) => {
  try {
    const query = `SELECT 
  q.queue_id,
  q.queue_number,
  q.status AS queue_status,
  q.created_at AS queue_created_at,
  
  u.full_name AS patient_name,
  dpt.name AS department_name,
  doc.doctor_id,
  du.full_name AS doctor_name,
  ap.schedule_date,
  ap.appointment_id
  
FROM queues q
JOIN appointments ap ON ap.appointment_id = q.appointment_id
JOIN patients p ON p.patient_id = ap.patient_id
JOIN users u ON u.user_id = p.user_id

JOIN doctors doc ON doc.doctor_id = ap.doctor_id
JOIN users du ON du.user_id = doc.user_id
JOIN departments dpt ON dpt.department_id = doc.department_id

ORDER BY q.queue_number ASC`;
    const [data] = await db.query(query);
    res.status(200).json({
      message: 'Queues fetched successfully',
      data: data,
    });
  } catch (error) {
    console.error('Error fetching queues:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
