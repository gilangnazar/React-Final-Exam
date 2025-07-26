// src/components/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaHospital, FaListOl, FaStethoscope, FaMoneyBill, FaPills } from 'react-icons/fa';
import { FaChartLine, FaUserCheck, FaUsersGear, FaUserDoctor } from 'react-icons/fa6';
import { BsBuildingsFill } from 'react-icons/bs';
import { GiArchiveRegister } from 'react-icons/gi';
import { TbCashRegister } from 'react-icons/tb';
import { GiMedicines } from 'react-icons/gi';

const Sidebar = () => {
  const role = parseInt(localStorage.getItem('userRole'));

  const menu = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <FaChartLine />,
      roles: [1, 3, 4, 5, 6],
    },
    {
      label: 'Pendaftaran',
      path: '/pendaftaran',
      icon: <GiArchiveRegister />,
      roles: [3],
    },
    {
      label: 'Kedatangan',
      path: '/kedatangan',
      icon: <FaUserCheck />,
      roles: [6],
    },
    {
      label: 'Doctors',
      path: '/doctors',
      icon: <FaUserDoctor />,
      roles: [1, 2],
    },
    {
      label: 'Departments',
      path: '/departments',
      icon: <BsBuildingsFill />,
      roles: [1, 2],
    },

    {
      label: 'Pemeriksaan',
      path: '/pemeriksaan',
      icon: <FaStethoscope />,
      roles: [2],
    },
    {
      label: 'resepobat',
      path: '/resepobat',
      icon: <FaListOl />,
      roles: [1, 2],
    },
    {
      label: 'Pembayaran',
      path: '/pembayaran',
      icon: <FaMoneyBill />,
      roles: [5],
    },
    {
      label: 'Pengambilan Obat',
      path: '/pengambilan-obat',
      icon: <FaPills />,
      roles: [4],
    },
    {
      label: 'Manajemen User',
      path: '/manajemen-user',
      icon: <FaUsersGear />,
      roles: [1],
    },
    {
      label: 'Manajemen Roles',
      path: '/manajemen-roles',
      icon: <FaUsersGear />,
      roles: [1],
    },
    {
      label: 'Pembayaran Pasien',
      path: '/Pembayaran-Pasien',
      icon: <TbCashRegister />,
      roles: [5],
    },
    {
      label: 'Manajemen Obat',
      path: '/Manajemen-Obat',
      icon: <GiMedicines />,
      roles: [1],
    },
  ];

  const filteredMenu = menu.filter((item) => Array.isArray(item.roles) && item.roles.includes(role));

  return (
    <div className='text-white p-3 h-100'>
      <div className='d-flex align-items-center mb-4'>
        <FaHospital size={28} className='me-2' />
        <h5 className='mb-0'>RS Rawat Jalan</h5>
      </div>
      <Nav className='flex-column'>
        {filteredMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-white text-decoration-none d-flex align-items-center px-3 py-2 mb-1 rounded ${
                isActive ? 'bg-secondary fw-bold' : 'bg-dark'
              }`
            }>
            <span className='me-2'>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
