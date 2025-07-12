import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Ambil data
  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/departments");
      setDepartments(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Handle input form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Simpan data (Tambah/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Edit
        await axios.put(
          `http://localhost:4000/api/departments/${editingId}`,
          formData
        );
      } else {
        // Tambah
        await axios.post("http://localhost:4000/api/departments", formData);
      }

      fetchDepartments();
      setShowModal(false);
      setFormData({ name: "", description: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Edit
  const handleEdit = (dept) => {
    setFormData({
      name: dept.name,
      description: dept.description
    });
    setEditingId(dept.department_id);
    setShowModal(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/departments/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Data Departemen</h3>
        <Button
          variant="primary"
          onClick={() => {
            setShowModal(true);
            setEditingId(null);
            setFormData({ name: "", description: "" });
          }}
        >
          Tambah Departemen
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Departemen</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept, idx) => (
            <tr key={dept.department_id}>
              <td>{idx + 1}</td>
              <td>{dept.name}</td>
              <td>{dept.description}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(dept)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(dept.department_id)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
          {departments.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal Tambah/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Edit Departemen" : "Tambah Departemen"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Departemen</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success" className="w-100">
              {editingId ? "Update" : "Simpan"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
