import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getPaymentsData, markPaymentAsPaid } from '../services/kasirService';

const PembayaranPage = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    appointment_id: '',
    total_amount: '',
    payment_method: '',
    payment_status: '',
    payment_date: '',
  });

  const fetchData = async () => {
    try {
      const response = await getPaymentsData();
      setData(response.data);
    } catch (error) {
      console.error('Error fetching pembayaran data:', error);
    }
  };

  const handlePaid = async (payment_id) => {
    try {
      await markPaymentAsPaid(payment_id);
      fetchData();
    } catch (error) {
      console.error('Error marking payment as paid:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log('data:', data);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (index) => {
    setForm(data[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Yakin ingin menghapus data pembayaran ini?')) {
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
    <div className='container mt-4'>
      <h3>Manajemen Pembayaran</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pasien</th>
            <th>Tanggal Pemeriksaan</th>
            <th>Total Tagihan</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            <th>Payment Date</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((payment, index) => (
            <tr key={payment.payment_id}>
              <td>{index + 1}</td>
              <td>{payment.full_name}</td>
              <td>{new Date(payment.schedule_date).toLocaleDateString('id-ID')}</td>
              <td>{payment.total_amount}</td>
              <td>{payment.payment_method}</td>
              <td>{payment.payment_status}</td>
              <td>{payment.payment_date}</td>
              <td>
                <Button
                  variant='success'
                  size='sm'
                  onClick={() => handlePaid(payment.payment_id)}
                  className='me-2'>
                  Bayar
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
            {['appointment_id', 'total_amount', 'payment_method', 'payment_status', 'payment_date'].map(
              (field) => (
                <Form.Group key={field} className='mb-3'>
                  <Form.Label>{field.replace(/_/g, ' ').toUpperCase()}</Form.Label>
                  <Form.Control
                    type={field === 'total_amount' ? 'number' : 'text'}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                  />
                </Form.Group>
              )
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant='success' onClick={handleSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PembayaranPage;
