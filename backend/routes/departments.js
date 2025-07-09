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

module.exports = router;
