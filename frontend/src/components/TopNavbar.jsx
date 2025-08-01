import React from "react";
import { Navbar, Container, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const TopNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tokendecoded = jwtDecode(token);

  const handleLogout = () => {
    // Hapus semua data autentikasi
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Redirect ke halaman login
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" className="px-4" style={{ height: "60px" }}>
      <Container fluid className="justify-content-end">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="dark"
            id="dropdown-user"
            className="d-flex align-items-center gap-2 text-white border-0"
          >
            <FaUserCircle size={20} />
            {tokendecoded.full_name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/profil">Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
