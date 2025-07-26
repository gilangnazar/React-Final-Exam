const db = require('../db');

exports.fetchPrescriptions = async (req, res) => {
  try {
    const query = `SELECT 
  p.prescription_id,
  i.medicine_id,
  m.name AS medicine_name,
  i.dosage,
  i.quantity,
  i.instructions,
  u.full_name AS patient_name,
  mp.pickup_date,
  mp.picked_by,
  mp.pickup_id,
  pay.payment_status
FROM prescriptions p
JOIN prescription_items i ON i.prescription_id = p.prescription_id
JOIN medicines m ON m.medicine_id = i.medicine_id
JOIN examinations e ON e.exam_id = p.exam_id
JOIN appointments a ON a.appointment_id = e.appointment_id
JOIN patients pt ON pt.patient_id = a.patient_id
JOIN users u ON u.user_id = pt.user_id
JOIN payments pay ON pay.appointment_id = a.appointment_id
LEFT JOIN medicine_pickups mp ON mp.prescription_id = p.prescription_id
WHERE pay.payment_status = 'paid'
  AND mp.pickup_date IS NULL
  AND mp.picked_by IS NULL
ORDER BY p.prescription_id DESC;
`;
    const [rows] = await db.execute(query);

    const grouped = {};

    rows.forEach((row) => {
      const { prescription_id, payment_status, pickup_id, pickup_date, picked_by, patient_name, ...item } =
        row;

      if (!grouped[prescription_id]) {
        grouped[prescription_id] = {
          prescription_id,
          pickup_id,
          patient_name,
          pickup_date,
          picked_by,
          payment_status,
          items: [],
        };
      }

      grouped[prescription_id].items.push(item);
    });

    const result = Object.values(grouped);

    return res.status(200).json({ msg: 'Data resep', data: result });
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error', error });
  }
};

exports.pickUpMedicine = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const { pickup_id } = req.params;
    const { picked_by } = req.body;

    const query = `UPDATE medicine_pickups SET pickup_date = NOW(), picked_by = ? WHERE pickup_id = ?`;
    const [response] = await connection.execute(query, [picked_by, pickup_id]);

    await connection.commit();
    return res.status(200).json({ msg: 'Obat berhasil diambil' });
  } catch (error) {
    await connection.rollback();
    return res.status(500).json({ msg: 'server error', error });
  }
};
