const db = require('../db');

exports.createPrescription = async (req, res) => {
  try {
    const { exam_id, items } = req.body;

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
    res.status(201).json({ message: 'Resep berhasil dibuat', prescription_id });
  } catch (error) {
    console.error('Error creating prescription:', error);
    res.status(500).json({ message: 'Gagal membuat resep' });
  }
};
