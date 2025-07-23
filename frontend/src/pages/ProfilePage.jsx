import React, { useState, useEffect } from "react";
import { Container, Card, Button, Spinner, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.user_id;
  const fullName = decoded.full_name;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nik: "",
    gender: "",
    birth_date: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/pasien/${userId}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setForm(res.data);
      } catch (err) {
        console.log("Belum ada data profil");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/pasien/${userId}/profile`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profil berhasil diperbarui");
      setProfile(form);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan profil");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "100%", maxWidth: "500px" }} className="text-center">
        <Card.Img
          variant="top"
          src="https://bootdey.com/img/Content/avatar/avatar7.png"
          className="mx-auto mt-4"
          style={{ width: "100px", borderRadius: "50%" }}
        />
        <Card.Body>
          <Card.Title>{fullName}</Card.Title>
          <Card.Subtitle className="text-muted mb-3">Pasien</Card.Subtitle>

          <div className="text-start">
            <p><strong>NIK:</strong> {profile?.nik || "-"}</p>
            <p><strong>Jenis Kelamin:</strong> {profile?.gender === "L" ? "Laki-laki" : profile?.gender === "P" ? "Perempuan" : "-"}</p>
            <p><strong>Tanggal Lahir:</strong> {profile?.birth_date || "-"}</p>
            <p><strong>No HP:</strong> {profile?.phone || "-"}</p>
            <p><strong>Alamat:</strong> {profile?.address || "-"}</p>
          </div>

          <Button variant="primary" onClick={() => setShowModal(true)}>
            {profile ? "Edit Profil" : "Lengkapi Profil"}
          </Button>
        </Card.Body>
      </Card>

      {/* Modal Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{profile ? "Edit Profil" : "Lengkapi Profil"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>NIK</Form.Label>
              <Form.Control
                type="text"
                name="nik"
                value={form.nik}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">-- Pilih --</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="date"
                name="birth_date"
                value={form.birth_date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>No HP</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit">Simpan</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
