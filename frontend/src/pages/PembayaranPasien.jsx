import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const PembayaranPasien = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [metodePembayaran, setMetodePembayaran] = useState("cash");

  // Ambil data dari backend
  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/kasir/payments");
      setData(res.data.data);
    } catch (error) {
      console.error("Gagal fetch data:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleClose = () => {
    setShow(false);
    setSelected(null);
  };

  const handleShow = (pasien) => {
    setSelected(pasien);
    setShow(true);
  };

  const handleBayar = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/kasir/payments/${selected.payment_id}/paid`,
        { metode: metodePembayaran }
      );
      fetchPayments();
      handleClose();
    } catch (error) {
      console.error("Gagal update status pembayaran:", error);
    }
  };

  const hitungBiayaObat = (obatList) => {
    if (!Array.isArray(obatList)) return 0;
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
          {Array.isArray(data) && data.map((pasien, idx) => (
            <tr key={pasien.payment_id}>
              <td>{idx + 1}</td>
              <td>{pasien.full_name}</td>
              <td>{pasien.schedule_date}</td>
              <td>{pasien.poli}</td>
              <td>{pasien.payment_status}</td>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tagihan Pasien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <>
              <p>
                <strong>Total Tagihan:</strong>{" "}
                Rp {(50000 + hitungBiayaObat(selected.obat || [])).toLocaleString()}
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
