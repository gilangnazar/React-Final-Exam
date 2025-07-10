const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/departments', async (req, res) => {
  try {
    const [data] = await db.execute('SELECT * FROM departments');

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
    if (!name || !description) return res.status(400).json({ msg: 'Missing data' });

    await db.execute('INSERT INTO departments(name, description) VALUES(?,?)', [name, description]);

    return res.status(201).json({ msg: 'Departemen baru berhasil dibuat' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', err: error });
  }
});

module.exports = router;
