const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/departments', async (req, res) => {
  try {
    const [data] = await db.execute(
      'SELECT * FROM departments WHERE deleted_at IS NULL ORDER BY department_id DESC'
    );

    res.status(200).json({
      msg: 'Data berhasil diambil',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Server error',
      err: error,
    });
  }
});

router.post('/departments', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) return res.status(400).json({ msg: 'Incomplete data' });

    await db.execute('INSERT INTO departments(name, description) VALUES(?,?)', [name, description]);

    return res.status(201).json({ msg: 'Departemen baru berhasil dibuat' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error });
  }
});

router.put('/departments/:department_id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const { department_id } = req.params;

    if (!name || !description) return res.status(400).json({ msg: 'Incomplete data' });
    if (!department_id) return res.status(400).json({ msg: 'Department ID Is Invalid or Missing' });

    await db.execute('UPDATE departments SET name = ?, description = ? WHERE department_id = ?', [
      name,
      description,
      department_id,
    ]);

    return res.json({ msg: 'Departemen berhasil Diedit' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
});

router.delete('/departments/:department_id', async (req, res) => {
  try {
    const { department_id } = req.params;
    if (!department_id) return res.status(400).json({ msg: 'Department ID Is Invalid or Missing' });

    await db.execute('UPDATE departments SET deleted_at = NOW() WHERE department_id = ?', [department_id]);

    return res.json({ msg: 'Departemen berhasil Terhapus (Soft delete)' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
});

router.put('/departments/:department_id/restore', async (req, res) => {
  try {
    const { department_id } = req.params;
    if (!department_id) return res.status(400).json({ msg: 'Department ID Is Invalid or Missing' });

    await db.execute('UPDATE departments SET deleted_at = NULL WHERE department_id = ?', [department_id]);

    return res.json({ msg: 'Department berhasil direstore' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error.message });
  }
});

module.exports = router;
