import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    full_name: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, full_name } = formData;

    if (!username || !password || !full_name) {
      setError("Semua field wajib diisi.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/pasien/register", {
        username,
        password,
        full_name,
      });

      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        setError("Username sudah digunakan.");
      } else {
        setError("Terjadi kesalahan saat registrasi.");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        className="bg-white rounded shadow-lg d-flex overflow-hidden"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        {/* Kiri - Logo */}
        <div
          style={{
            flex: "1",
            background: "#f9f9f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <img
            src="/Logo/RS.png"
            alt="Logo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        {/* Kanan - Form */}
        <div className="p-4" style={{ flex: "1" }}>
          <div className="text-center mb-3">
            <h1 className="mt-2">Daftar Akun Pasien</h1>
          </div>
          <p className="text-center mb-4">Lengkapi data di bawah untuk mendaftar</p>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nama Lengkap"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                style={{
                  borderRadius: "50px",
                  border: "1px solid #0d6efd",
                  padding: "0.75rem 1rem",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                style={{
                  borderRadius: "50px",
                  border: "1px solid #0d6efd",
                  padding: "0.75rem 1rem",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  borderRadius: "50px",
                  border: "1px solid #0d6efd",
                  padding: "0.75rem 1rem",
                }}
              />
            </Form.Group>
            <Button
              type="submit"
              className="w-100"
              style={{
                borderRadius: "50px",
                padding: "0.75rem",
                backgroundColor: "#0d6efd",
                border: "none",
              }}
            >
              SIGN UP
            </Button>
          </Form>

          <div className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
            Sudah punya akun? <a href="/login">Login di sini</a>
          </div>
        </div>
      </div>
    </div>
  );
}
