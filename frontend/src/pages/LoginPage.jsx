// src/pages/LoginPage.jsx
import React, { useCallback, useState } from "react";
import axios from "axios";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        username,
        password,
      });

      // Pastikan backend membalas token
      const { token } = response.data;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid username or password.");
      } else {
        alert("Login failed. Please try again.");
      }
      console.error(error);
    }
  }, []);

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
            Belum punya akun? <a href="#">Sign Up</a>
          </div>  
        </div>
      </div>
    </div>
  );
}
