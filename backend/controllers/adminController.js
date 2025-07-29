const db = require('../db');

exports.getDashboardData = async (req, res) => {
  try {
    // 1. Summary Data
    const [pasienHariIni] = await db.execute(`
      SELECT COUNT(*) AS count FROM appointments
      WHERE DATE(schedule_date) = CURDATE() AND deleted_at IS NULL
    `);
    const [pemeriksaanHariIni] = await db.execute(`
      SELECT COUNT(*) AS count FROM examinations
      WHERE DATE(exam_date) = CURDATE() AND deleted_at IS NULL
    `);
    const [pembayaranHariIni] = await db.execute(`
      SELECT COUNT(*) AS count FROM payments
      WHERE DATE(payment_date) = CURDATE() AND deleted_at IS NULL
    `);
    const [obatHariIni] = await db.execute(`
      SELECT COUNT(DISTINCT prescription_id) AS count FROM medicine_pickups
      WHERE DATE(pickup_date) = CURDATE() AND deleted_at IS NULL
    `);

    const summaryData = [
      { title: 'Pasien Hari Ini', count: pasienHariIni[0].count },
      { title: 'Pemeriksaan', count: pemeriksaanHariIni[0].count },
      { title: 'Pembayaran', count: pembayaranHariIni[0].count },
      { title: 'Obat Diberikan', count: obatHariIni[0].count },
    ];

    // 2. Line Chart (Pasien per Hari)
    const [lineRows] = await db.execute(`
      SELECT DATE_FORMAT(schedule_date, '%a') AS label, COUNT(*) AS count
      FROM appointments
      WHERE schedule_date >= CURDATE() - INTERVAL 4 DAY
      AND deleted_at IS NULL
      GROUP BY schedule_date
      ORDER BY schedule_date
    `);
    const lineData = {
      labels: lineRows.map((r) => r.label),
      data: lineRows.map((r) => r.count),
    };

    // 3. Bar Chart (Pasien per Departemen)
    const [barRows] = await db.execute(`
      SELECT d.name AS label, COUNT(*) AS count
      FROM appointments a
      JOIN departments d ON a.department_id = d.department_id
      WHERE a.deleted_at IS NULL
      GROUP BY a.department_id
    `);
    const barData = {
      labels: barRows.map((r) => r.label),
      data: barRows.map((r) => r.count),
    };

    // 4. Pie Chart (Metode Pembayaran)
    const [pieRows] = await db.execute(`
      SELECT payment_method AS label, COUNT(*) AS count
      FROM payments
      WHERE deleted_at IS NULL
      GROUP BY payment_method
    `);
    const pieData = {
      labels: pieRows.map((r) => r.label),
      data: pieRows.map((r) => r.count),
    };

    // 5. Doughnut Chart (Obat Paling Banyak)
    const [doughnutRows] = await db.execute(`
      SELECT m.name AS label, SUM(pi.quantity) AS count
      FROM prescription_items pi
      JOIN medicines m ON pi.medicine_id = m.medicine_id
      WHERE pi.deleted_at IS NULL
      GROUP BY pi.medicine_id
      ORDER BY count DESC
      LIMIT 3
    `);
    const doughnutData = {
      labels: doughnutRows.map((r) => r.label),
      data: doughnutRows.map((r) => r.count),
    };

    // 6. Riwayat Pemeriksaan Hari Ini
    const [tableRows] = await db.execute(`
      SELECT 
        e.exam_id,
        u.full_name AS dokter_name,
        e.diagnosis,
        e.notes,
        e.exam_date
      FROM examinations e
      JOIN users u ON e.doctor_id = u.user_id
      WHERE DATE(e.exam_date) = CURDATE()
      AND e.deleted_at IS NULL
      ORDER BY e.exam_date DESC
    `);

    res.json({
      msg: 'Dashboard summary',
      summaryData,
      lineData,
      barData,
      pieData,
      doughnutData,
      riwayatPemeriksaanHariIni: tableRows,
    });
  } catch (err) {
    console.error('[DASHBOARD ERROR]', err);
    res.status(500).json({ msg: 'Terjadi kesalahan', error: err.message });
  }
};
