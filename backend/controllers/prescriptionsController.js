const db = require('../db');

exports.createPrescription = async (req, res) => {
  let connection;
  try {
    // Get a connection from the pool
    connection = await db.getConnection();
    await connection.beginTransaction();

    const { exam_id, items } = req.body;

    const [prescriptionResult] = await connection.execute(`INSERT INTO prescriptions (exam_id) VALUES (?)`, [
      exam_id,
    ]);
    const prescription_id = prescriptionResult.insertId;

    for (const item of items) {
      const { medicine_id, dosage, quantity, instructions } = item;
      await connection.execute(
        `INSERT INTO prescription_items
         (prescription_id, medicine_id, dosage, quantity, instructions)
         VALUES (?, ?, ?, ?, ?)`,
        [prescription_id, medicine_id, dosage, quantity, instructions]
      );
    }

    // Get appointment_id from the examination
    const [[examRow]] = await connection.execute(
      'SELECT appointment_id FROM examinations WHERE exam_id = ?',
      [exam_id]
    );
    const appointment_id = examRow ? examRow.appointment_id : null;
    if (!appointment_id) throw new Error('Appointment ID not found for this examination');

    // Hitung total biaya obat
    let totalObat = 0;
    for (const item of items) {
      const [medicineRows] = await connection.execute(`SELECT price FROM medicines WHERE medicine_id = ?`, [
        item.medicine_id,
      ]);
      if (medicineRows.length > 0) {
        totalObat += medicineRows[0].price * item.quantity;
      }
    }

    // Tambah biaya pemeriksaan tetap
    const biayaPemeriksaan = 50000;
    const totalTagihan = totalObat + biayaPemeriksaan;

    // Insert ke payments
    await connection.execute(
      `INSERT INTO payments (appointment_id, total_amount, payment_status)
     VALUES (?, ?, ?)`,
      [appointment_id, totalTagihan, 'unpaid']
    );

    await connection.execute(
      `INSERT INTO medicine_pickups (prescription_id)
     VALUES (?)`,
      [prescription_id]
    );

    await connection.commit();

    res.status(201).json({ message: 'Resep berhasil dibuat', prescription_id });
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat resep', error });
    await connection.rollback();
  } finally {
    connection.release();
  }
};
