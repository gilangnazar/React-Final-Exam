// src/pages/Doctors.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    user_id: "",
    department_id: "",
    specialization: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/doctors");
      setDoctors(res.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus data ini?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/doctors/${id}`);
      fetchDoctors();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleEdit = (doctor) => {
    setFormData({
      user_id: doctor.user_id,
      department_id: doctor.department_id,
      specialization: doctor.specialization
    });
    setEditingId(doctor.doctor_id);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:4000/api/doctors/${editingId}`, formData);
      } else {
        await axios.post("http://localhost:4000/api/doctors", formData);
      }
      setShowModal(false);
      setEditingId(null);
      setFormData({
        user_id: "",
        department_id: "",
        specialization: ""
      });
      fetchDoctors();
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Data Dokter</h3>
        <Button onClick={() => { setShowModal(true); setEditingId(null); }}>Tambah Dokter</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Dokter</th>
            <th>Department Name</th>
            <th>Specialization</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={doctor.doctor_id}>
              <td>{index + 1}</td>
              <td>{doctor.doctor_name}</td>
              <td>{doctor.department_name}</td>
              <td>{doctor.specialization}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(doctor)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(doctor.doctor_id)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Dokter" : "Tambah Dokter"}</Modal.Title>
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
            <Form.Group className="mb-2">
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
