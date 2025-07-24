const db = require('../db');

exports.fetchPayments = async (req, res) => {
  try {
    const queryFetchPayments = `SELECT pay.payment_id, u.full_name, a.schedule_date, d.name as poli, pay.payment_method, pay.payment_status, pay.total_amount
FROM payments pay 
JOIN appointments a ON pay.appointment_id = a.appointment_id
JOIN patients p ON a.patient_id = p.patient_id
JOIN users u ON p.user_id = u.user_id
JOIN departments d ON a.department_id = d.department_id
WHERE pay.payment_status = 'unpaid'
ORDER BY a.schedule_date DESC`;

    const [data] = await db.execute(queryFetchPayments);

    return res.status(200).json({ msg: 'Data Payments berhasil di-fetch', data });
  } catch (error) {
    return res.status(200).json({ msg: 'server error', error });
  }
};

exports.changePaymentStatusToPaid = async (req, res) => {
  console.log("masuk ke changePaymentStatusToPaid");
  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const { payment_id } = req.params;
    const { payment_method } = req.body;

    const query = `UPDATE payments SET payment_method = ?, payment_date = NOW(), payment_status = 'paid' WHERE payment_id = ?`;
    await connection.execute(query, [payment_method, payment_id]);

    await connection.commit();
    return res.status(200).json({ msg: 'Pembayaran berhasil, Status payment berhasil di ubah' });
  } catch (error) {
    await connection.rollback();
    return res.status(200).json({ msg: 'server error', error });
  }
};
