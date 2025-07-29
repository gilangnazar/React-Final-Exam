import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getAllPrescriptions, updatePrescriptionStatus, getAllPatients } from '../services/apotekerService';

// const dummyData = [
//   {
//     id: 1,
//     nama: "Ahmad",
//     tanggal: "2025-07-22",
//     status: "Belum Diambil",
//     resep: [
//       { nama: "Paracetamol", dosis: "500mg", aturan: "3x sehari" },
//       { nama: "Vitamin C", dosis: "100mg", aturan: "1x sehari" },
//     ],
//   },
//   {
//     id: 2,
//     nama: "Siti",
//     tanggal: "2025-07-21",
//     status: "Sudah Diambil",
//     resep: [
//       { nama: "Amoxicillin", dosis: "250mg", aturan: "2x sehari" },
//     ],
//   },
// ];

const PengambilanObatPage = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [patient, setPatient] = useState(null);
  const [pickedBy, setPickedBy] = useState(null);

  const fetchdata = async () => {
    try {
      const response = await getAllPrescriptions();
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await getAllPatients();
      setPatient(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const confirmPickup = async (pickupId, pickedBy) => {
    try {
      await updatePrescriptionStatus(pickupId, pickedBy);
      fetchdata();
    } catch (error) {
      console.error('Error confirming pickup:', error);
    }
  };

  useEffect(() => {
    fetchdata();
    fetchPatients();
  }, []);
  console.log(data);

  const handleShow = (pasien) => {
    setSelected(pasien);
    setShow(true);
  };

  const handleClose = () => {
    setSelected(null);
    setPickedBy(null);
    setShow(false);
    fetchdata();
  };

  const handleKonfirmasi = async () => {
    await confirmPickup(selected.pickup_id, pickedBy);
    handleClose();
  };

  return (
    <div>
      <h3>Pengambilan Obat</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pasien</th>
            <th>Tanggal Pengambilan</th>
            <th>Status Ambil</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pasien, idx) => (
            <tr key={pasien.pickup_id}>
              <td>{idx + 1}</td>
              <td>{pasien.patient_name}</td>
              <td>{pasien.pickup_date}</td>
              <td>{pasien.payment_status}</td>
              <td>
                <Button variant='primary' size='sm' onClick={() => handleShow(pasien)}>
                  Lihat Resep
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Resep Obat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <Table bordered>
              <thead>
                <tr>
                  <th>Nama Obat</th>
                  <th>Dosis</th>
                  <th>Aturan Pakai</th>
                </tr>
              </thead>
              <tbody>
                {selected.items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.medicine_name}</td>
                    <td>{item.dosage}</td>
                    <td>{item.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {patient && (
            <Form.Group>
              <Form.Label>Diambil Oleh</Form.Label>
              <Form.Select onChange={(e) => setPickedBy(e.target.value)}>
                <option value=''>--Pilih Pasien--</option>
                {patient.map((p) => (
                  <option key={p.patient_id} value={p.patient_id}>
                    {p.full_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Tutup
          </Button>
          {selected?.payment_status === 'paid' && (
            <Button variant='success' onClick={handleKonfirmasi}>
              Konfirmasi Pengambilan Obat
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PengambilanObatPage;
