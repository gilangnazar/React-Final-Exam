import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", backgroundColor: "#212529", color: "white" }}>
        <Sidebar />
      </div>

      {/* Main Area */}
      <div style={{ flex: 1 }}>
        <TopNavbar /> {/* Ini sekarang sejajar, gak niban sidebar */}
        <Container fluid className="p-4 mt-4">
          {children}
        </Container>
      </div>
    </div>
  );
};

export default Layout;
