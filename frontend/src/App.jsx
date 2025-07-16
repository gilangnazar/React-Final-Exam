import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";

import DashboardPage from "./pages/DashboardPage";
import PendaftaranPage from "./pages/PendaftaranPage";
import Doctors from "./pages/Doctors";
import Departments from "./pages/Departments";
import KedatanganPage from "./pages/KedatanganPage";
import AntrianPage from "./pages/AntrianPage";
import PemeriksaanPage from "./pages/PemeriksaanPage";
import PembayaranPage from "./pages/PembayaranPage";
import PengambilanObatPage from "./pages/PengambilanObatPage";
import ManajemenUserPage from "./pages/ManajemenUserPage";
import ManajemenRoles from "./pages/ManajemenRoles";
import LoginPage from "./pages/LoginPage";

const Layout = ({ children }) => (
  <Container fluid>
    <Row className="vh-100">
      <Col md={2} className="p-0 bg-dark">
        <Sidebar />
      </Col>
      <Col md={10} className="p-4">
        {children}
      </Col>
    </Row>
  </Container>
);

export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<LoginPage />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Pendaftaran */}
      <Route
        path="/pendaftaran"
        element={
          <PrivateRoute>
            <Layout>
              <PendaftaranPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Doctors */}
      <Route
        path="/doctors"
        element={
          <PrivateRoute>
            <Layout>
              <Doctors />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Departments */}
      <Route
        path="/departments"
        element={
          <PrivateRoute>
            <Layout>
              <Departments />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Kedatangan */}
      <Route
        path="/kedatangan"
        element={
          <PrivateRoute>
            <Layout>
              <KedatanganPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Antrian */}
      <Route
        path="/antrian"
        element={
          <PrivateRoute>
            <Layout>
              <AntrianPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Pemeriksaan */}
      <Route
        path="/pemeriksaan"
        element={
          <PrivateRoute>
            <Layout>
              <PemeriksaanPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Pembayaran */}
      <Route
        path="/pembayaran"
        element={
          <PrivateRoute>
            <Layout>
              <PembayaranPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Pengambilan Obat */}
      <Route
        path="/pengambilan-obat"
        element={
          <PrivateRoute>
            <Layout>
              <PengambilanObatPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Manajemen User */}
      <Route
        path="/manajemen-user"
        element={
          <PrivateRoute>
            <Layout>
              <ManajemenUserPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Manajemen Roles */}
      <Route
        path="/manajemen-roles"
        element={
          <PrivateRoute>
            <Layout>
              <ManajemenRoles />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
