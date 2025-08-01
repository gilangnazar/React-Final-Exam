// src/pages/LoginPage.jsx
import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom"; // <-- Tambah Link

export default function LoginPage() {
  const navigate = useNavigate();

  const redirectByRole = {
    1: "/dashboard",
    2: "/pemeriksaan",
    3: "/pendaftaran",
    4: "/pengambilan-obat",
    5: "/pembayaran",
    6: "/kedatangan",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = parseInt(localStorage.getItem("userRole"));
    if (token && role && redirectByRole[role]) {
      navigate(redirectByRole[role]);
    }
  }, [navigate]);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    const password = e.target.password.value;

    if (!username || !password) {
      alert("Username dan Password tidak boleh kosong.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        username,
        password,
      });

      const { token, data } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("data_user", JSON.stringify(data));
      localStorage.setItem("userRole", data.role_id);

      const redirectPath = redirectByRole[data.role_id] || "/";
      navigate(redirectPath);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Username atau password salah.");
      } else {
        alert("Gagal login. Silakan coba lagi.");
      }
      console.error("Login error:", error);
    }
  }, [navigate]);

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
        {/* Left Logo */}
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

        {/* Right Form */}
        <div className="p-4" style={{ flex: "1" }}>
          <div className="text-center mb-3">
            <h1 className="mt-2">Rumah Sakit</h1>
          </div>
          <p className="text-center mb-4">Masukkan Username dan Password</p>

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
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
            Belum punya akun?{" "}
            <Link to="/register" style={{ color: "#0d6efd", textDecoration: "none" }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
