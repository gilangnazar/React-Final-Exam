import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col, Card } from 'react-bootstrap';
import { FaUserInjured, FaStethoscope } from 'react-icons/fa';
import { FaUserClock } from 'react-icons/fa6';
import { BiSolidUserDetail } from 'react-icons/bi';
import { jwtDecode } from 'jwt-decode';

import { getDoctors, createAppointment, getPatientAppointments } from '../services/pasienService';

const PendaftaranPage = () => {
  const token = jwtDecode(localStorage.getItem('token'));
  const user_id = token.user_id;

  const summaryData = [
    { title: ' Nomor Antrian Anda', count: 10, icon: <FaUserClock size={30} /> },
    { title: 'Nomor Antrian Sekarang', count: 5, icon: <BiSolidUserDetail size={30} /> },
  ];

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    schedule_date: '',
    department_id: '',
    department_name: '',
    doctor_id: '',
  });

  const fetchDoctors = async () => {
    try {
      const result = await getDoctors();
      setDoctors(result.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAppointments = async (user_id) => {
    try {
      const result = await getPatientAppointments(user_id);
      setAppointments(result.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  useEffect(() => {
    fetchDoctors();
    fetchAppointments(user_id);
  }, []);

  console.log('Appointments:', appointments);

  const renderStatus = (status) => {
    switch (status) {
      case 'waiting':
        return <span className='px-2 py-1 bg-warning text-dark rounded small'>Waiting</span>;
      case 'confirmed':
        return <span className='px-2 py-1 bg-success text-white rounded small'>Confirmed</span>;
      default:
        return <span className='px-2 py-1 bg-danger text-white rounded small'>{status}</span>;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'doctor_id') {
      const selectedDoctor = doctors.find((doc) => String(doc.doctor_id) === value);
      setFormData({
        ...formData,
        doctor_id: value,
        department_id: selectedDoctor ? selectedDoctor.department_id : '',
        department_name: selectedDoctor ? selectedDoctor.department_name : '',
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAppointment(formData, user_id);
    setShowModal(false);
    setFormData({
      schedule_date: '',
      department_id: '',
      department_name: '',
      doctor_id: '',
      status: 'waiting',
    });
  };

  return (
    <div>
      {/* Summary Cards - 2 dan diposisikan ke tengah */}
      <Row className='mb-4 justify-content-center'>
        {summaryData.map((item, idx) => (
          <Col key={idx} md={4} className='mb-3'>
            <Card className='text-center shadow-sm'>
              <Card.Body>
                <div className='mb-2'>{item.icon}</div>
                <Card.Title style={{ fontSize: '1rem' }}>{item.title}</Card.Title>
                <h4>{item.count}</h4>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Header dan Button */}
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h3>Daftar Online</h3>
        <Button variant='primary' onClick={() => setShowModal(true)}>
          Registrasi
        </Button>
      </div>

      {/* Tabel */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Schedule Date</th>
            <th>Department</th>
            <th>Doctor</th>
            <th>Specialization</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.appointment_id}>
              <td>{appt.appointment_id}</td>
              <td>{appt.schedule_date}</td>
              <td>{appt.department_name}</td>
              <td>{appt.doctor_name}</td>
              <td>{appt.specialization}</td>
              <td>{renderStatus(appt.status)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Tambah Data */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pendaftaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-2'>
              <Form.Label>Schedule Date</Form.Label>
              <Form.Control
                type='date'
                name='schedule_date'
                value={formData.schedule_date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label>Department</Form.Label>
              <Form.Control
                type='text'
                name='department_id'
                value={formData.department_name}
                onChange={handleChange}
                required
                readOnly
              />
            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label>Doctor</Form.Label>
              <Form.Select name='doctor_id' value={formData.doctor_id} onChange={handleChange} required>
                <option value=''>Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.doctor_id} value={doctor.doctor_id}>
                    {doctor.doctor_name} - {doctor.specialization}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button type='submit' variant='success' className='w-100'>
              Simpan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PendaftaranPage;
