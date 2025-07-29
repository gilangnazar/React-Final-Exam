import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaUserInjured, FaStethoscope } from 'react-icons/fa6';
import { GiPayMoney, GiMedicines } from 'react-icons/gi';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
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
} from 'chart.js';

import { getDashboard } from '../services/adminService';

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
  const [dashboardData, setDashboardData] = useState(null);
  const fetchData = async () => {
    try {
      const data = await getDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log('Dashboard Data:', dashboardData);
  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  const summaryData = dashboardData.summaryData.map((item, idx) => {
    const icons = [
      <FaUserInjured size={30} />,
      <FaStethoscope size={30} />,
      <GiPayMoney size={30} />,
      <GiMedicines size={30} />,
    ];
    return { ...item, icon: icons[idx] };
  });

  const lineData = {
    labels: dashboardData.lineData.labels,
    datasets: [
      {
        label: 'Pasien',
        data: dashboardData.lineData.data,
        borderColor: 'blue',
        backgroundColor: 'rgba(0,0,255,0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const barData = {
    labels: dashboardData.barData.labels,
    datasets: [
      {
        label: 'Pasien',
        data: dashboardData.barData.data,
        backgroundColor: 'green',
      },
    ],
  };

  const pieData = {
    labels: dashboardData.pieData.labels,
    datasets: [
      {
        data: dashboardData.pieData.data,
        backgroundColor: ['#f1c40f', '#1abc9c', '#8e44ad'],
      },
    ],
  };

  const doughnutData = {
    labels: dashboardData.doughnutData.labels,
    datasets: [
      {
        data: dashboardData.doughnutData.data,
        backgroundColor: ['#e74c3c', '#f39c12', '#27ae60'],
      },
    ],
  };

  console.log('Dashboard Data:', dashboardData);
  if (!dashboardData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {/* Header */}
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h3>Dashboard Admin</h3>
      </div>

      {/* Summary Cards */}
      <Row className='mb-4'>
        {summaryData.map((card, idx) => (
          <Col md={3} key={idx} className='mb-3'>
            <Card className='text-center'>
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
        <Col md={6} className='mb-4'>
          <Card className='p-3'>
            <Card.Title>Jumlah Kunjungan per Hari</Card.Title>
            <Line data={lineData} />
          </Card>
        </Col>
        <Col md={6} className='mb-4'>
          <Card className='p-3'>
            <Card.Title>Poliklinik Terpopuler</Card.Title>
            <Bar data={barData} />
          </Card>
        </Col>
        <Col md={6} className='mb-4'>
          <Card className='p-3'>
            <Card.Title>Jenis Pembayaran</Card.Title>
            <Pie data={pieData} />
          </Card>
        </Col>
        <Col md={6} className='mb-4'>
          <Card className='p-3'>
            <Card.Title>Distribusi Resep Obat</Card.Title>
            <Doughnut data={doughnutData} />
          </Card>
        </Col>
      </Row>

      {/* Table */}
      {/* <Card>
        <Card.Body>
          <Card.Title>Riwayat Pemeriksaan Hari Ini</Card.Title>
          <table className='table table-bordered mt-3'>
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
      </Card> */}
    </div>
  );
};

export default DashboardPage;
