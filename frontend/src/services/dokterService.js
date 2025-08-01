import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const getMedicines = async () => {
  try {
    const response = await axios.get(`${API_URL}/options/medicines`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dokter appointments:', error);
    throw error;
  }
};

export const dokterGetAppointment = async (user_id) => {
  try {
    const response = await axios.get(`${API_URL}/doctors/${user_id}/appointments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dokter appointments:', error);
    throw error;
  }
};

export const dokterGetExaminations = async (user_id) => {
  try {
    const response = await axios.get(`${API_URL}/doctors/${user_id}/examinations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dokter examinations:', error);
    throw error;
  }
};

export const dokterCreateExamination = async (user_id, examinationData) => {
  try {
    const response = await axios.post(`${API_URL}/doctors/${user_id}/examinations`, examinationData);
    return response.data;
  } catch (error) {
    console.error('Error fetching dokter appointments:', error);
    throw error;
  }
};

export const dokterCreatePrescription = async (prescriptionData) => {
  try {
    const response = await axios.post(`${API_URL}/doctors/prescriptions`, prescriptionData);
    return response.data;
  } catch (error) {
    console.error('Error fetching dokter appointments:', error);
    throw error;
  }
};

export const dokterCompleteAppointment = async (appointment_id) => {
  try {
    const response = await axios.put(`${API_URL}/doctors/appointments/${appointment_id}/completed`);
    return response.data;
  } catch (error) {
    console.error('Error completing appointment:', error);
    throw error;
  }
};
