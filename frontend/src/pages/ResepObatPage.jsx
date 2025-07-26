import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Row, Col } from 'react-bootstrap';
import {
  dokterGetExaminations,
  dokterCreateExamination,
  getMedicines,
  dokterCreatePrescription,
} from '../services/dokterService';
import { jwtDecode } from 'jwt-decode';

const ResepObatPage = () => {
  const token = jwtDecode(localStorage.getItem('token'));
  const user_id = token.user_id;

  const [examinations, setExaminations] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedExamID, setSelectedExamID] = useState(null);

  const [prescriptionForm, setPrescriptionForm] = useState({ items: [] });

  const getExaminations = async (user_id) => {
    try {
      const response = await dokterGetExaminations(user_id);
      setExaminations(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchMedicines = async () => {
    try {
      const response = await getMedicines();
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  useEffect(() => {
    getExaminations(user_id);
    fetchMedicines();
  }, []);

  const handleSubmit = async (e, prescriptionForm, selectedExamID) => {
    e.preventDefault();
    const prescriptionData = {
      exam_id: selectedExamID,
      items: prescriptionForm.items.map((item) => ({
        medicine_id: item.medicine_id,
        dosage: item.dosage,
        quantity: item.quantity,
        instructions: item.instructions,
      })),
    };

    try {
      await dokterCreatePrescription(prescriptionData);
    } catch (error) {
      console.error('Error creating prescription:', error);
    }

    setShowPrescriptionModal(false);
  };

  const handleOpenPrescription = (patient, exam_id) => {
    setSelectedPatient(patient);
    setSelectedExamID(exam_id);
    setPrescriptionForm({
      items: [],
    });
    setShowPrescriptionModal(true);
  };

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h3>Resep Obat</h3>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No Antri</th>
            <th>Nama Pasien</th>
            <th>Complaint</th>
            <th>Diagnosis</th>
            <th>Catatan</th>
            <th>Status Pemeriksaan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {examinations.map((p, i) => (
            <tr key={p.exam_id}>
              <td>{i + 1}</td>
              <td>{p.patient_name}</td>
              <td>{p.complaint}</td>
              <td>{p.diagnosis}</td>
              <td>{p.notes}</td>
              <td>{p.appointment_status}</td>
              <td>
                <Button
                  variant='warning'
                  size='sm'
                  className='me-2'
                  onClick={() => handleOpenPrescription(p, p.exam_id)}>
                  Tambah Resep
                </Button>
                <Button variant='success' size='sm'>
                  Selesai
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Tambah Resep */}
      <Modal show={showPrescriptionModal} onHide={() => setShowPrescriptionModal(false)} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Resep untuk {selectedPatient?.patient_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e, prescriptionForm, selectedExamID)}>
            {prescriptionForm.items?.map((item, index) => (
              <div key={index} className='border rounded p-3 mb-3'>
                <Row className='mb-2'>
                  <Col md={6}>
                    <Form.Label>Nama Obat</Form.Label>
                    <Form.Select
                      value={item.medicine_id}
                      onChange={(e) => {
                        const updated = [...prescriptionForm.items];
                        updated[index].medicine_id = parseInt(e.target.value);
                        setPrescriptionForm({ ...prescriptionForm, items: updated });
                      }}>
                      <option value=''>Pilih Obat</option>
                      {medicines.map((med) => (
                        <option key={med.medicine_id} value={med.medicine_id}>
                          {med.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <Form.Label>Dosis</Form.Label>
                    <Form.Control
                      type='text'
                      value={item.dosage}
                      onChange={(e) => {
                        const updated = [...prescriptionForm.items];
                        updated[index].dosage = e.target.value;
                        setPrescriptionForm({ ...prescriptionForm, items: updated });
                      }}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>Jumlah</Form.Label>
                    <Form.Control
                      type='number'
                      min={1}
                      value={item.quantity}
                      onChange={(e) => {
                        const updated = [...prescriptionForm.items];
                        updated[index].quantity = parseInt(e.target.value);
                        setPrescriptionForm({ ...prescriptionForm, items: updated });
                      }}
                    />
                  </Col>
                </Row>
                <Form.Group className='mb-2'>
                  <Form.Label>Instruksi</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={2}
                    value={item.instructions}
                    onChange={(e) => {
                      const updated = [...prescriptionForm.items];
                      updated[index].instructions = e.target.value;
                      setPrescriptionForm({ ...prescriptionForm, items: updated });
                    }}
                  />
                </Form.Group>
                <Button
                  variant='danger'
                  size='sm'
                  onClick={() => {
                    const updated = prescriptionForm.items.filter((_, i) => i !== index);
                    setPrescriptionForm({ ...prescriptionForm, items: updated });
                  }}>
                  🗑 Hapus Obat
                </Button>
              </div>
            ))}

            <Button
              variant='secondary'
              className='w-100 mb-3'
              onClick={() =>
                setPrescriptionForm({
                  ...prescriptionForm,
                  items: [
                    ...(prescriptionForm.items || []),
                    {
                      medicine_id: '',
                      dosage: '',
                      quantity: 1,
                      instructions: '',
                    },
                  ],
                })
              }>
              + Tambah Obat
            </Button>

            <Button type='submit' variant='success' className='w-100'>
              💾 Simpan Resep
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ResepObatPage;
