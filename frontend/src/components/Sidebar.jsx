import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  FaHospital,
  FaListOl,
  FaStethoscope,
  FaMoneyBill,
  FaPills,
} from "react-icons/fa";
import { FaChartLine, FaUserCheck, FaUsersGear, FaUserDoctor } from "react-icons/fa6";
import { BsBuildingsFill } from "react-icons/bs";
import { GiArchiveRegister } from "react-icons/gi";

const Sidebar = () => {
  const menu = [
    { label: "Dashboard", path: "/", icon: <FaChartLine /> },
    { label: "Pendaftaran", path: "/pendaftaran", icon: <GiArchiveRegister /> },
    { label: "Kedatangan", path: "/kedatangan", icon: <FaUserCheck /> },
    { label: "Doctors", path: "/Doctors", icon: <FaUserDoctor /> },
    { label: "Departments", path: "/Departments", icon: <BsBuildingsFill /> },
    { label: "Antrian", path: "/antrian", icon: <FaListOl /> },
    { label: "Pemeriksaan", path: "/pemeriksaan", icon: <FaStethoscope /> },
    { label: "Pembayaran", path: "/pembayaran", icon: <FaMoneyBill /> },
    { label: "Pengambilan Obat", path: "/pengambilan-obat", icon: <FaPills /> },
    { label: "Manajemen User", path: "/manajemen-user", icon: <FaUsersGear /> },
    { label: "Manajemen Roles", path: "/manajemen-roles", icon: <FaUsersGear /> }
  ];

  return (
    <div className="text-white p-3 h-100">
      <div className="d-flex align-items-center mb-4">
        <FaHospital size={32} className="me-2" />
        <h4 className="mb-0">RS Rawat Jalan</h4>
      </div>
      <Nav className="flex-column">
        {menu.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              `text-white text-decoration-none d-flex align-items-center px-3 py-2 mb-1 rounded ${
                isActive ? "bg-secondary fw-bold" : "bg-dark"
              }`
            }
          >
            <span className="me-2">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
