import React, { useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";

const PemeriksaanPage = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      no_antri: "A001",
      nama: "Ahmad",
      tanggal: "2025-07-22",
      status: "Menunggu",
    },
    {
      id: 2,
      no_antri: "A002",
      nama: "Budi",
      tanggal: "2025-07-22",
      status: "Dipanggil",
    },
  ]);

  const [showExaminationModal, setShowExaminationModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [examinationForm, setExaminationForm] = useState({
    komplain: "",
    diagnosis: "",
    notes: "",
  });

  const [prescriptionForm, setPrescriptionForm] = useState({
    nama_obat: "",
    dosis: "",
    quantity: 1,
    instruction: "",
  });

  const handleOpenExamination = (patient) => {
    setSelectedPatient(patient);
    setExaminationForm({ komplain: "", diagnosis: "", notes: "" });
    setShowExaminationModal(true);
  };

  const handleOpenPrescription = (patient) => {
    setSelectedPatient(patient);
    setPrescriptionForm({
      nama_obat: "",
      dosis: "",
      quantity: 1,
      instruction: "",
    });
    setShowPrescriptionModal(true);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Pemeriksaan Pasien</h3>
        <Button variant="info">
          Panggil Pasien
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No Antri</th>
            <th>Nama Pasien</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.no_antri}</td>
              <td>{p.nama}</td>
              <td>{p.tanggal}</td>
              <td>{p.status}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleOpenExamination(p)}
                >
                  Isi Pemeriksaan
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleOpenPrescription(p)}
                >
                  Tambah Resep
                </Button>
                <Button variant="success" size="sm">
                  Selesai
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Pemeriksaan */}
      <Modal
        show={showExaminationModal}
        onHide={() => setShowExaminationModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Isi Pemeriksaan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Komplain</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={examinationForm.komplain}
                onChange={(e) =>
                  setExaminationForm({
                    ...examinationForm,
                    komplain: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={examinationForm.diagnosis}
                onChange={(e) =>
                  setExaminationForm({
                    ...examinationForm,
                    diagnosis: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Catatan</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={examinationForm.notes}
                onChange={(e) =>
                  setExaminationForm({
                    ...examinationForm,
                    notes: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button
              variant="success"
              onClick={() => setShowExaminationModal(false)}
              className="w-100"
            >
              Simpan Pemeriksaan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Tambah Resep */}
      <Modal
        show={showPrescriptionModal}
        onHide={() => setShowPrescriptionModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Resep</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama Obat</Form.Label>
              <Form.Control
                type="text"
                value={prescriptionForm.nama_obat}
                onChange={(e) =>
                  setPrescriptionForm({
                    ...prescriptionForm,
                    nama_obat: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Row>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Dosis</Form.Label>
                <Form.Control
                  type="text"
                  value={prescriptionForm.dosis}
                  onChange={(e) =>
                    setPrescriptionForm({
                      ...prescriptionForm,
                      dosis: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={prescriptionForm.quantity}
                  onChange={(e) =>
                    setPrescriptionForm({
                      ...prescriptionForm,
                      quantity: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Instruksi</Form.Label>
              <Form.Control
                as="textarea"
                value={prescriptionForm.instruction}
                onChange={(e) =>
                  setPrescriptionForm({
                    ...prescriptionForm,
                    instruction: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button
              variant="success"
              onClick={() => setShowPrescriptionModal(false)}
              className="w-100"
            >
              Simpan Resep
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PemeriksaanPage;
