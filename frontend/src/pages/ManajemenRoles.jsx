import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManajemenRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    role_id: null,
    role_name: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const apiUrl = "http://localhost:4000/api/roles"; // Ganti sesuai backend

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      setRoles(res.data.data);
    } catch (err) {
      toast.error("Gagal mengambil data roles");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${apiUrl}/${formData.role_id}`, formData);
        toast.success("Role berhasil diperbarui.");
      } else {
        await axios.post(apiUrl, formData);
        toast.success("Role berhasil ditambahkan.");
      }
      setShowModal(false);
      setFormData({ role_id: null, role_name: "" });
      fetchRoles();
    } catch (err) {
      toast.error("Gagal menyimpan data");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin hapus role ini?")) return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      toast.success("Role berhasil dihapus.");
      fetchRoles();
    } catch (err) {
      toast.error("Gagal menghapus data");
    }
  };

  const handleEdit = (role) => {
    setFormData(role);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setFormData({ role_id: null, role_name: "" });
    setIsEdit(false);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h3>Manajemen Roles</h3>
      <Button variant="primary" className="mb-3" onClick={handleAddNew}>
        Tambah Role
      </Button>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.role_id}>
                <td>{r.role_id}</td>
                <td>{r.role_name}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEdit(r)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(r.role_id)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Role" : "Tambah Role"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Nama Role</Form.Label>
              <Form.Control
                name="role_name"
                value={formData.role_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              {isEdit ? "Simpan Perubahan" : "Tambah Role"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManajemenRoles;
