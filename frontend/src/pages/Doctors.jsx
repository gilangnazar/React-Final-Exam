// src/pages/Doctors.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    user_id: "",
    department_id: "",
    specialization: ""
  });

  const API_URL = "http://localhost:4000/api/doctors";

  // Ambil data dokter saat halaman dibuka
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("DATA DOKTER =>", response.data);
      setDoctors(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      fetchDoctors(); // refresh data
      setShowModal(false);
      setFormData({
        user_id: "",
        department_id: "",
        specialization: ""
      });
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Data Dokter</h3>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Tambah Dokter
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>User ID</th>
            <th>Department ID</th>
            <th>Specialization</th>
            <th>Deleted At</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {doctors && doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <tr key={doctor.doctor_id}>
                <td>{index + 1}</td>
                <td>{doctor.user_id}</td>
                <td>{doctor.department_id}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.deleted_at ? doctor.deleted_at : "-"}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm">
                    Hapus
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Tidak ada data dokter.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal Tambah Dokter */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Dokter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="number"
                name="user_id"
                value={formData.user_id}
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
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                value={formData.specialization}
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
}
