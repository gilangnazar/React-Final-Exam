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

exports.getAntrianPasienByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const query = `SELECT
  (
    SELECT q1.queue_number
    FROM queues q1
    WHERE q1.status = 'calling'
      AND q1.deleted_at IS NULL
    ORDER BY q1.call_time ASC
    LIMIT 1
  ) AS antriansekarang,

  (
    SELECT q2.queue_number
    FROM queues q2
    JOIN appointments a ON q2.appointment_id = a.appointment_id
    JOIN patients p ON a.patient_id = p.patient_id
    WHERE p.user_id = ?
      AND q2.status IN ('waiting', 'calling')
      AND q2.deleted_at IS NULL
    ORDER BY q2.created_at DESC
    LIMIT 1
  ) AS antriansaya;`;

    const [queue] = await db.execute(query, [user_id]);

    res.status(200).json({
      message: 'Queue information fetched successfully',
      data: queue[0] || { antriansekarang: null, antriansaya: null },
    });
  } catch (error) {
    console.error('Error fetching patient queue:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
