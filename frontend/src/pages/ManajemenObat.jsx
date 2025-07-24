import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManajemenObat = () => {
  const [medicines, setMedicines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    stock: "",
    price: "",
  });
  const [selectedId, setSelectedId] = useState(null);

  const fetchMedicines = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/medicines");
      setMedicines(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengambil data obat");
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:4000/api/admin/medicines/${selectedId}`,
          form
        );
        toast.success("Obat berhasil diupdate");
      } else {
        await axios.post("http://localhost:4000/api/admin/medicines", form);
        toast.success("Obat berhasil ditambahkan");
      }
      setShowModal(false);
      setForm({ name: "", stock: "", price: "" });
      fetchMedicines();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan data");
    }
  };

  const handleEdit = (medicine) => {
    setForm({
      name: medicine.name,
      stock: medicine.stock,
      price: medicine.price,
    });
    setSelectedId(medicine.medicine_id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus obat ini?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/admin/medicines/${id}`);
      toast.success("Obat berhasil dihapus (soft delete)");
      fetchMedicines();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus obat");
    }
  };

  return (
    <div className="p-4">
      <h3>Manajemen Obat</h3>
      <Button onClick={() => { setShowModal(true); setEditMode(false); setForm({ name: "", stock: "", price: "" }); }}>
        Tambah Obat
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Obat</th>
            <th>Stok</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med, i) => (
            <tr key={med.medicine_id}>
              <td>{i + 1}</td>
              <td>{med.name}</td>
              <td>{med.stock}</td>
              <td>Rp {Number(med.price).toLocaleString()}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(med)}>Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(med.medicine_id)}>Hapus</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Tambah / Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Obat" : "Tambah Obat"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Obat</Form.Label>
              <Form.Control type="text" name="name" value={form.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stok</Form.Label>
              <Form.Control type="number" name="stock" value={form.stock} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Harga</Form.Label>
              <Form.Control type="number" name="price" value={form.price} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editMode ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ManajemenObat;
