import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";

const dummyData = [
  {
    id: 1,
    nama: "Ahmad",
    tanggal: "2025-07-22",
    status: "Belum Diambil",
    resep: [
      { nama: "Paracetamol", dosis: "500mg", aturan: "3x sehari" },
      { nama: "Vitamin C", dosis: "100mg", aturan: "1x sehari" },
    ],
  },
  {
    id: 2,
    nama: "Siti",
    tanggal: "2025-07-21",
    status: "Sudah Diambil",
    resep: [
      { nama: "Amoxicillin", dosis: "250mg", aturan: "2x sehari" },
    ],
  },
];

const PengambilanObatPage = () => {
  const [data, setData] = useState(dummyData);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleShow = (pasien) => {
    setSelected(pasien);
    setShow(true);
  };

  const handleClose = () => {
    setSelected(null);
    setShow(false);
  };

  const handleKonfirmasi = () => {
    const updatedData = data.map((item) =>
      item.id === selected.id ? { ...item, status: "Sudah Diambil" } : item
    );
    setData(updatedData);
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
            <th>Tanggal</th>
            <th>Status Ambil</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pasien, idx) => (
            <tr key={pasien.id}>
              <td>{idx + 1}</td>
              <td>{pasien.nama}</td>
              <td>{pasien.tanggal}</td>
              <td>{pasien.status}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleShow(pasien)}>
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
                {selected.resep.map((item, i) => (
                  <tr key={i}>
                    <td>{item.nama}</td>
                    <td>{item.dosis}</td>
                    <td>{item.aturan}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          {selected?.status === "Belum Diambil" && (
            <Button variant="success" onClick={handleKonfirmasi}>
              Konfirmasi Pengambilan Obat
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PengambilanObatPage;
