const db = require('../db');

exports.createPrescription = async (req, res) => {
  try {
    const { exam_id, items } = req.body;

    // Get a connection from the pool
    connection = await db.getConnection();
    await connection.beginTransaction();

    const [prescriptionResult] = await db.execute(`INSERT INTO prescriptions (exam_id) VALUES (?)`, [
      exam_id,
    ]);
    const prescription_id = prescriptionResult.insertId;

    for (const item of items) {
      const { medicine_id, dosage, quantity, instructions } = item;
      await db.execute(
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
      const [medicineRows] = await db.execute(`SELECT price FROM medicines WHERE medicine_id = ?`, [
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
    await db.execute(
      `INSERT INTO payments (appointment_id, total_amount, payment_status)
   VALUES (?, ?, ?)`,
      [appointment_id, totalTagihan, 'unpaid']
    );

    await db.execute(
      `INSERT INTO medicine_pickup (prescription_id)
   VALUES (?)`,
      [prescription_id]
    );

    await connection.commit();

    res
      .status(201)
      .json({ message: 'Resep berhasil dibuat, dan telah membuat tagihan obat baru', prescription_id });
  } catch (error) {
    console.error('Error creating prescription:', error);
    res.status(500).json({ message: 'Gagal membuat resep' });
    if (connection) await connection.rollback();
  } finally {
    if (connection) await connection.release();
  }
};
