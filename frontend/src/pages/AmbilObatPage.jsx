import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

import { getAllPatients } from '../services/apotekerService';

const AmbilObatPage = () => {
  const [data, setData] = useState([]);
  const [pasien, setPasien] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [pickedBy, setPickedBy] = useState('');

  // Ambil data dari backend
  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/apoteker/prescriptions');
      setData(res.data.data);
    } catch (error) {
      console.error('Gagal fetch data:', error);
    }
  };

  const fetchPasien = async () => {
    try {
      const res = await getAllPatients();
      setPasien(res.data);
    } catch (error) {
      console.error('Gagal fetch data:', error);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
    fetchPasien();
  }, []);

  console.log('Data apotek:', data);
  console.log('Data pasien:', pasien);

  const handleClose = () => {
    setShow(false);
    setSelected(null);
    setMetodePembayaran('');
  };

  const handleShow = (pasien) => {
    setSelected(pasien);
    setShow(true);
  };

  const handleAmbilObat = async () => {
    try {
      await axios.put(`http://localhost:4000/api/apoteker/pickup/${selected.pickup_id}`, {
        picked_by: pickedBy,
      });
      fetchPrescriptions();
      handleClose();
      alert('Pengambilan obat berhasil!');
    } catch (error) {
      console.error('Gagal update status pengambilan:', error);
    }
  };

  return (
    <div>
      <h3>Pick Up Obat</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pasien</th>
            <th>Di ambil oleh</th>
            <th>Tanggal Pengambilan</th>
            <th>Status Pembayaran</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((d, idx) => (
              <tr key={d.prescription_id}>
                <td>{idx + 1}</td>
                <td>{d.patient_name}</td>
                <td>{d.schedule_date}</td>
                <td>{d.poli}</td>
                <td>{d.payment_status}</td>
                <td>
                  <Button
                    variant='primary'
                    size='sm'
                    onClick={() => handleShow(d)}
                    disabled={d.payment_status !== 'paid'}>
                    {d.payment_status === 'paid' ? 'Lihat Resep Obat' : 'Belum Bayar'}
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tagihan Pasien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <>
              <Form.Group>
                <Form.Label>Diambil Oleh</Form.Label>
                <Form.Select value={pickedBy} onChange={(e) => setPickedBy(e.target.value)}>
                  <option value=''>--Pilih Pengambil--</option>
                  {pasien.map((p) => (
                    <option key={p.patient_id} value={p.patient_id}>
                      {p.full_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Batal
          </Button>
          <Button variant='success' onClick={handleAmbilObat}>
            Ambil Obat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AmbilObatPage;
