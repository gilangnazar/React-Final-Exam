import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import DashboardPage from "./pages/DashboardPage";
import PendaftaranPage from "./pages/PendaftaranPage";
import Doctors from "./pages/Doctors";
import Departments from "./pages/Departments";
import KedatanganPage from "./pages/KedatanganPage";
import AntrianPage from "./pages/AntrianPage";
import PembayaranPasien from "./pages/PembayaranPasien";
import PemeriksaanPage from "./pages/PemeriksaanPage";
import PembayaranPage from "./pages/PembayaranPage";
import PengambilanObatPage from "./pages/PengambilanObatPage";
import ManajemenUserPage from "./pages/ManajemenUserPage";
import ManajemenRoles from "./pages/ManajemenRoles";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute allowedRoles={[1, 3, 4, 5, 6]}>
            <Layout>
              <DashboardPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
  path="/profil"
  element={
    <PrivateRoute allowedRoles={[3]}>
      <Layout>
        <ProfilePage />
      </Layout>
    </PrivateRoute>
  }
/>

      <Route
        path="/pendaftaran"
        element={
          <PrivateRoute allowedRoles={[1, 3]}>
            <Layout>
              <PendaftaranPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/doctors"
        element={
          <PrivateRoute allowedRoles={[1, 2]}>
            <Layout>
              <Doctors />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/departments"
        element={
          <PrivateRoute allowedRoles={[1, 2]}>
            <Layout>
              <Departments />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/kedatangan"
        element={
          <PrivateRoute allowedRoles={[1, 6]}>
            <Layout>
              <KedatanganPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/antrian"
        element={
          <PrivateRoute allowedRoles={[1]}>
            <Layout>
              <AntrianPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/pembayaran-pasien"
        element={
          <PrivateRoute allowedRoles={[1, 5]}>
            <Layout>
              <PembayaranPasien />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/pemeriksaan"
        element={
          <PrivateRoute allowedRoles={[1, 2]}>
            <Layout>
              <PemeriksaanPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/pembayaran"
        element={
          <PrivateRoute allowedRoles={[1, 5]}>
            <Layout>
              <PembayaranPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/pengambilan-obat"
        element={
          <PrivateRoute allowedRoles={[1, 4]}>
            <Layout>
              <PengambilanObatPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/manajemen-user"
        element={
          <PrivateRoute allowedRoles={[1]}>
            <Layout>
              <ManajemenUserPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/manajemen-roles"
        element={
          <PrivateRoute allowedRoles={[1]}>
            <Layout>
              <ManajemenRoles />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
