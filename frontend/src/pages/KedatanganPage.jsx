import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Modal, Form } from 'react-bootstrap';

import { pendaftaranGetAppointments, pendaftaranConfirmed } from '../services/pendaftaranService';

const PendaftaranPage = () => {
  const [appointments, setAppointments] = useState([]);

  const [formData, setFormData] = useState({
    patient_id: '',
    schedule_date: '',
    department_id: '',
    doctor_id: '',
    status: 'waiting',
  });

  const getAppointments = async () => {
    try {
      const response = await pendaftaranGetAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    getAppointments();
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeStatus = async (appointment_id) => {
    try {
      console.log('selected appt:', appointment_id);
      await pendaftaranConfirmed(appointment_id);
      getAppointments();
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h3>Data Pendaftaran Online Pasien</h3>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Patient Name</th>
            <th>Schedule Date</th>
            <th>Department</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, i) => (
            <tr key={appt.appointment_id}>
              <td>{i + 1}</td>
              <td>{appt.full_name}</td>
              <td>{new Date(appt.schedule_date).toLocaleDateString('id-ID')}</td>
              <td>{appt.department_name}</td>
              <td>{renderStatus(appt.status)}</td>
              <td>
                <button
                  className='btn btn-primary small'
                  onClick={() => handleChangeStatus(appt.appointment_id)}>
                  Confirm
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PendaftaranPage;
