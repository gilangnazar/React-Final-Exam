// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // untuk pesan error

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Semua field harus diisi.");
      return;
    }

    // Jika sudah diisi semua, hapus error
    setError("");

    // Simpan status login dummy
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
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
        {/* Left Image */}
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
            alt="Illustration"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        {/* Right Form */}
        <div className="p-4" style={{ flex: "1" }}>
          <div className="text-center mb-3">
            <h1 className="mt-2">Rumah Sakit</h1>
          </div>
          <p className="text-center mb-4">Enter your Username and Password</p>

          {/* ALERT */}
          {error && (
            <Alert variant="danger" onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              SIGN IN
            </Button>
          </Form>

          <div className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
            Belum punya akun? <a href="#">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}
