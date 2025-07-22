import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const dummyPayments = [
  {
    payment_id: 1,
    appointment_id: 2,
    total_amount: 35000.0,
    payment_method: "cash",
    payment_status: "paid",
    payment_date: "2025-07-09 09:30:00",
  },
];

const PembayaranPage = () => {
  const [data, setData] = useState(dummyPayments);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    appointment_id: "",
    total_amount: "",
    payment_method: "",
    payment_status: "",
    payment_date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (index) => {
    setForm(data[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus data pembayaran ini?")) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const newData = [...data];
      newData[editingIndex] = { ...data[editingIndex], ...form };
      setData(newData);
    }
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h3>Manajemen Pembayaran</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Appointment ID</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            <th>Payment Date</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((payment, index) => (
            <tr key={payment.payment_id}>
              <td>{payment.payment_id}</td>
              <td>{payment.appointment_id}</td>
              <td>{payment.total_amount}</td>
              <td>{payment.payment_method}</td>
              <td>{payment.payment_status}</td>
              <td>{payment.payment_date}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(index)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(index)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Pembayaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["appointment_id", "total_amount", "payment_method", "payment_status", "payment_date"].map((field) => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{field.replace(/_/g, " ").toUpperCase()}</Form.Label>
                <Form.Control
                  type={field === "total_amount" ? "number" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="success" onClick={handleSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PembayaranPage;
