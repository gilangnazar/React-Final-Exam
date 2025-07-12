import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import PendaftaranPage from "./pages/PendaftaranPage";
import Doctors from "./pages/Doctors";
import KedatanganPage from "./pages/KedatanganPage";
import AntrianPage from "./pages/AntrianPage";
import PemeriksaanPage from "./pages/PemeriksaanPage";
import PembayaranPage from "./pages/PembayaranPage";
import PengambilanObatPage from "./pages/PengambilanObatPage";
import ManajemenUserPage from "./pages/ManajemenUserPage";
import LoginPage from "./pages/LoginPage";

// Komponen PrivateRoute
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();

  // Jika path sekarang "/login", tampilkan login page TANPA sidebar
  if (location.pathname === "/login") {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Redirect semua path lain ke login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // Layout dengan sidebar dan semua halaman yang diproteksi
  return (
    <Container fluid>
      <Row className="vh-100">
        <Col md={2} className="p-0 bg-dark">
          <Sidebar />
        </Col>
        <Col md={10} className="p-4">
          <Routes>
            {/* Bungkus semua rute di PrivateRoute */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/pendaftaran"
              element={
                <PrivateRoute>
                  <PendaftaranPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctors"
              element={
                <PrivateRoute>
                  <Doctors />
                </PrivateRoute>
              }
            />
            <Route
              path="/kedatangan"
              element={
                <PrivateRoute>
                  <KedatanganPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/antrian"
              element={
                <PrivateRoute>
                  <AntrianPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/pemeriksaan"
              element={
                <PrivateRoute>
                  <PemeriksaanPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/pembayaran"
              element={
                <PrivateRoute>
                  <PembayaranPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/pengambilan-obat"
              element={
                <PrivateRoute>
                  <PengambilanObatPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/manajemen-user"
              element={
                <PrivateRoute>
                  <ManajemenUserPage />
                </PrivateRoute>
              }
            />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}
