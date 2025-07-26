import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const getPatientId = async () => {
  try {
    const response = await axios.get(`${API_URL}/pasien/${nik}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching patient ID:', error);
    throw error;
  }
};

export const getDoctors = async () => {
  try {
    const response = await axios.get(`${API_URL}/options/doctors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Doctors data:', error);
    throw error;
  }
};

export const createAppointment = async (appointmentData, user_id) => {
  try {
    const response = await axios.post(`${API_URL}/pasien/${user_id}/appointments`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const getPatientAppointments = async (user_id) => {
  try {
    const response = await axios.get(`${API_URL}/pasien/${user_id}/appointments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pasien appointments:', error);
    throw error;
  }
};
