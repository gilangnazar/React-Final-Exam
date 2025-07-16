import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManajemenUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    user_id: null,
    username: "",
    password_hash: "",
    full_name: "",
    role_id: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const apiUrl = "http://localhost:4000/api/users"; // ganti sesuai backend-mu

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      setUsers(res.data.data);
    } catch (err) {
      toast.error("Gagal mengambil data users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${apiUrl}/${formData.user_id}`, formData);
        toast.success("User berhasil diperbarui.");
      } else {
        await axios.post(apiUrl, formData);
        toast.success("User berhasil ditambahkan.");
      }
      setShowModal(false);
      setFormData({
        user_id: null,
        username: "",
        password_hash: "",
        full_name: "",
        role_id: "",
      });
      fetchUsers();
    } catch (err) {
      toast.error("Gagal menyimpan data");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin hapus user ini?")) return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      toast.success("User berhasil dihapus.");
      fetchUsers();
    } catch (err) {
      toast.error("Gagal menghapus data");
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setFormData({
      user_id: null,
      username: "",
      password_hash: "",
      full_name: "",
      role_id: "",
    });
    setIsEdit(false);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h3>Manajemen User</h3>
      <Button variant="primary" className="mb-3" onClick={handleAddNew}>
        Tambah User
      </Button>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.user_id}>
                <td>{u.user_id}</td>
                <td>{u.username}</td>
                <td>{u.full_name}</td>
                <td>{u.role_name}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEdit(u)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(u.user_id)}
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
          <Modal.Title>{isEdit ? "Edit User" : "Tambah User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password_hash"
                value={formData.password_hash}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Role ID</Form.Label>
              <Form.Control
                name="role_id"
                value={formData.role_id}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              {isEdit ? "Simpan Perubahan" : "Tambah User"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManajemenUserPage;
