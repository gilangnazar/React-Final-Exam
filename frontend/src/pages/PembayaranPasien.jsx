import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const dummyData = [
  {
    id: 1,
    nama: "Ahmad",
    tanggal: "2025-07-22",
    poli: "Umum",
    status: "Belum Dibayar",
    obat: [
      { nama: "Paracetamol", harga: 10000 },
      { nama: "Vitamin C", harga: 15000 },
    ],
  },
  {
    id: 2,
    nama: "Siti",
    tanggal: "2025-07-22",
    poli: "Anak",
    status: "Sudah Dibayar",
    obat: [
      { nama: "Obat Batuk", harga: 20000 },
    ],
  },
];

const PembayaranPasien = () => {
  const [data] = useState(dummyData);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [metodePembayaran, setMetodePembayaran] = useState("cash");

  const handleClose = () => {
    setShow(false);
    setSelected(null);
  };

  const handleShow = (pasien) => {
    setSelected(pasien);
    setShow(true);
  };

  const handleBayar = () => {
    alert("Pembayaran berhasil dengan metode: " + metodePembayaran);
    handleClose();
  };

  const hitungBiayaObat = (obatList) => {
    return obatList.reduce((total, item) => total + item.harga, 0);
  };

  return (
    <div>
      <h3>Pembayaran Pasien</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pasien</th>
            <th>Tanggal Pemeriksaan</th>
            <th>Poli</th>
            <th>Status Pembayaran</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pasien, idx) => (
            <tr key={pasien.id}>
              <td>{idx + 1}</td>
              <td>{pasien.nama}</td>
              <td>{pasien.tanggal}</td>
              <td>{pasien.poli}</td>
              <td>{pasien.status}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleShow(pasien)}
                >
                  Lihat Tagihan
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tagihan Pasien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <>
              <p><strong>Biaya Pemeriksaan:</strong> Rp 50.000</p>
              <p><strong>Biaya Obat:</strong> Rp {hitungBiayaObat(selected.obat).toLocaleString()}</p>
              <p>
                <strong>Total Tagihan:</strong>{" "}
                Rp {(50000 + hitungBiayaObat(selected.obat)).toLocaleString()}
              </p>
              <Form.Group>
                <Form.Label>Metode Pembayaran</Form.Label>
                <Form.Select
                  value={metodePembayaran}
                  onChange={(e) => setMetodePembayaran(e.target.value)}
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="insurance">Insurance</option>
                </Form.Select>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="success" onClick={handleBayar}>
            Bayar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PembayaranPasien;
