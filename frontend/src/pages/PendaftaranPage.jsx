import React, { useState } from "react";
import { Table, Button, Modal, Form, Row, Col, Card } from "react-bootstrap";
import { FaUserInjured, FaStethoscope } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa6";
import { BiSolidUserDetail } from "react-icons/bi";

const PendaftaranPage = () => {
  const [appointments, setAppointments] = useState([
    {
      appointment_id: 1,
      schedule_date: "2025-07-08",
      department_id: "Pelayanan umum dan pemeriksaan dasar",
      doctor_id: "Dokter Umum",
      status: "waiting",
    },
    {
      appointment_id: 2,
      schedule_date: "2025-07-09",
      department_id: "Spesialisasi anak-anak",
      doctor_id: "Dokter Anak",
      status: "confirmed",
    },
  ]);

  const summaryData = [
    { title: " Nomor Antrian Anda", count: 10, icon: <FaUserClock size={30} /> },
    { title: "Nomor Antrian Sekarang", count: 5, icon: <BiSolidUserDetail size={30} /> },
  ];

  const [formData, setFormData] = useState({
    schedule_date: "",
    department_id: "",
    doctor_id: "",
    status: "waiting",
  });

  const [showModal, setShowModal] = useState(false);

  const renderStatus = (status) => {
    switch (status) {
      case "waiting":
        return (
          <span className="px-2 py-1 bg-warning text-dark rounded small">
            Waiting
          </span>
        );
      case "confirmed":
        return (
          <span className="px-2 py-1 bg-success text-white rounded small">
            Confirmed
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-danger text-white rounded small">
            {status}
          </span>
        );
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      appointment_id: appointments.length + 1,
      schedule_date: formData.schedule_date,
      department_id: formData.department_id,
      doctor_id: formData.doctor_id,
      status: formData.status,
    };
    setAppointments([...appointments, newAppointment]);
    setShowModal(false);
    setFormData({
      schedule_date: "",
      department_id: "",
      doctor_id: "",
      status: "waiting",
    });
  };

  return (
    <div>
      {/* Summary Cards - 2 dan diposisikan ke tengah */}
      <Row className="mb-4 justify-content-center">
        {summaryData.map((item, idx) => (
          <Col key={idx} md={4} className="mb-3">
            <Card className="text-center shadow-sm">
              <Card.Body>
                <div className="mb-2">{item.icon}</div>
                <Card.Title style={{ fontSize: "1rem" }}>{item.title}</Card.Title>
                <h4>{item.count}</h4>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Header dan Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Daftar Online</h3>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Registrasi
        </Button>
      </div>

      {/* Tabel */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Schedule Date</th>
            <th>Department</th>
            <th>Doctor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.appointment_id}>
              <td>{appt.appointment_id}</td>
              <td>{appt.schedule_date}</td>
              <td>{appt.department_id}</td>
              <td>{appt.doctor_id}</td>
              <td>{renderStatus(appt.status)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Tambah Data */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pendaftaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Schedule Date</Form.Label>
              <Form.Control
                type="date"
                name="schedule_date"
                value={formData.schedule_date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Doctor</Form.Label>
              <Form.Control
                type="text"
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" variant="success" className="w-100">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PendaftaranPage;
