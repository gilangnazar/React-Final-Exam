import React, { useState } from "react";
import { Table, Badge, Button, Modal, Form } from "react-bootstrap";

const PendaftaranPage = () => {
  const [appointments, setAppointments] = useState([
    {
      appointment_id: 1,
      patient_id: 1,
      schedule_date: "2025-07-08",
      department_id: "Pelayanan umum dan pemeriksaan dasar",
      doctor_id: "Dokter Umum",
      status: "waiting",
      created_at: "2025-07-07 14:37:21"
    },
    {
      appointment_id: 2,
      patient_id: 2,
      schedule_date: "2025-07-09",
      department_id: "Spesialisasi anak-anak",
      doctor_id: "Dokter Anak",
      status: "confirmed",
      created_at: "2025-07-07 14:37:21"
    }
  ]);

  const [formData, setFormData] = useState({
    patient_id: "",
    schedule_date: "",
    department_id: "",
    doctor_id: "",
    status: "waiting"
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
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      appointment_id: appointments.length + 1,
      patient_id: formData.patient_id,
      schedule_date: formData.schedule_date,
      department_id: formData.department_id,
      doctor_id: formData.doctor_id,
      status: formData.status,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " ")
    };
    setAppointments([...appointments, newAppointment]);
    setShowModal(false); // Tutup modal
    setFormData({
      patient_id: "",
      schedule_date: "",
      department_id: "",
      doctor_id: "",
      status: "waiting"
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Data Pendaftaran Online Pasien</h3>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Registrasi
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Patient ID</th>
            <th>Schedule Date</th>
            <th>Department</th>
            <th>Doctor</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.appointment_id}>
              <td>{appt.appointment_id}</td>
              <td>{appt.patient_id}</td>
              <td>{appt.schedule_date}</td>
              <td>{appt.department_id}</td>
              <td>{appt.doctor_id}</td>
              <td>{renderStatus(appt.status)}</td>
              <td>{appt.created_at}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* MODAL TAMBAH DATA */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pendaftaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Patient ID</Form.Label>
              <Form.Control
                type="number"
                name="patient_id"
                value={formData.patient_id}
                onChange={handleChange}
                required
              />
            </Form.Group>

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
              <Form.Label>Department ID</Form.Label>
              <Form.Control
                type="number"
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Doctor ID</Form.Label>
              <Form.Control
                type="number"
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="waiting">Waiting</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
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
