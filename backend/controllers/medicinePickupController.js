const db = require('../db');

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
    return res.status(200).json({ msg: 'Obat berhasil diambil', response });
  } catch (error) {
    await connection.rollback();
    return res.status(500).json({ msg: 'server error', error });
  }
};
