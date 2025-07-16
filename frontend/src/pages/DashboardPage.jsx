import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FaUserInjured, FaStethoscope } from "react-icons/fa6";
import { GiPayMoney, GiMedicines } from "react-icons/gi";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const navigate = useNavigate();

  // Fungsi logout
const handleLogout = () => {
  // Hapus semua data autentikasi
  localStorage.removeItem("token");
  localStorage.removeItem("username");

  // Redirect ke halaman login
  navigate("/");
};


  const summaryData = [
    { title: "Pasien Hari Ini", count: 120, icon: <FaUserInjured size={30} /> },
    { title: "Pemeriksaan", count: 90, icon: <FaStethoscope size={30} /> },
    { title: "Pembayaran", count: 85, icon: <GiPayMoney size={30} /> },
    { title: "Obat Diberikan", count: 75, icon: <GiMedicines size={30} /> },
  ];

  const lineData = {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum"],
    datasets: [
      {
        label: "Pasien",
        data: [20, 35, 50, 30, 55],
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ["Umum", "Gigi", "Anak", "Syaraf"],
    datasets: [
      {
        label: "Pasien",
        data: [60, 15, 35, 25],
        backgroundColor: "green",
      },
    ],
  };

  const pieData = {
    labels: ["Cash", "BPJS", "Asuransi"],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ["#f1c40f", "#1abc9c", "#8e44ad"],
      },
    ],
  };

  const doughnutData = {
    labels: ["Antibiotik", "Vitamin", "Obat Batuk"],
    datasets: [
      {
        data: [40, 30, 30],
        backgroundColor: ["#e74c3c", "#f39c12", "#27ae60"],
      },
    ],
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Dashboard Admin</h3>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Summary Cards */}
      <Row className="mb-4">
        {summaryData.map((card, idx) => (
          <Col md={3} key={idx} className="mb-3">
            <Card className="text-center">
              <Card.Body>
                <div>{card.icon}</div>
                <Card.Title>{card.title}</Card.Title>
                <h2>{card.count}</h2>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts */}
      <Row>
        <Col md={6} className="mb-4">
          <Card className="p-3">
            <Card.Title>Jumlah Kunjungan per Hari</Card.Title>
            <Line data={lineData} />
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="p-3">
            <Card.Title>Poliklinik Terpopuler</Card.Title>
            <Bar data={barData} />
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="p-3">
            <Card.Title>Jenis Pembayaran</Card.Title>
            <Pie data={pieData} />
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="p-3">
            <Card.Title>Distribusi Resep Obat</Card.Title>
            <Doughnut data={doughnutData} />
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Card>
        <Card.Body>
          <Card.Title>Riwayat Pemeriksaan Hari Ini</Card.Title>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Nama Pasien</th>
                <th>Poliklinik</th>
                <th>Dokter</th>
                <th>Diagnosa</th>
                <th>Waktu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ahmad</td>
                <td>Umum</td>
                <td>dr. Budi</td>
                <td>Flu</td>
                <td>08:30</td>
              </tr>
              <tr>
                <td>Siti</td>
                <td>Anak</td>
                <td>dr. Diah</td>
                <td>Batuk</td>
                <td>09:15</td>
              </tr>
              <tr>
                <td>Rina</td>
                <td>Gigi</td>
                <td>dr. Andi</td>
                <td>Sakit Gigi</td>
                <td>10:00</td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardPage;
