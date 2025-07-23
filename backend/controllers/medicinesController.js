const db = require('../db');

exports.getMedicines = async (req, res) => {
  try {
    const [data] = await db.execute(
      'SELECT * FROM medicines WHERE deleted_at IS NULL ORDER BY medicine_id DESC'
    );

    res.status(200).json({
      msg: 'Data obat berhasil diambil',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Server error',
      err: error,
    });
  }
};

exports.postMedicines = async (req, res) => {
  try {
    const { name, stock, price } = req.body;
    if (!name || !stock || !price) return res.status(400).json({ msg: 'Incomplete data' });

    await db.execute('INSERT INTO medicines(name, stock, price) VALUES(?,?, ?)', [name, stock, price]);

    return res.status(201).json({ msg: 'Data Obat baru berhasil dibuat' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error });
  }
};

exports.putMedicines = async (req, res) => {
  try {
    const { name, stock, price } = req.body;
    const { medicine_id } = req.params;

    if (!name || !stock || !price) return res.status(400).json({ msg: 'Incomplete data' });
    if (!medicine_id) return res.status(400).json({ msg: 'Department ID Is Invalid or Missing' });

    await db.execute('UPDATE medicines SET name = ?, stock = ?, price = ?  WHERE medicine_id = ?', [
      name,
      stock,
      price,
      medicine_id,
    ]);

    return res.json({ msg: 'Data Obat berhasil Diedit' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

exports.softDeleteMedicines = async (req, res) => {
  try {
    const { medicine_id } = req.params;
    if (!medicine_id) return res.status(400).json({ msg: 'Department ID Is Invalid or Missing' });

    await db.execute('UPDATE medicines SET deleted_at = NOW() WHERE medicine_id = ?', [medicine_id]);

    return res.json({ msg: 'Departemen berhasil Terhapus (Soft delete)' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};

exports.restoreMedicines = async (req, res) => {
  try {
    const { medicine_id } = req.params;
    if (!medicine_id) return res.status(400).json({ msg: 'Medicine ID Is Invalid or Missing' });

    await db.execute('UPDATE medicines SET deleted_at = NULL WHERE medicine_id = ?', [medicine_id]);

    return res.json({ msg: 'Data Obat berhasil direstore' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
};
