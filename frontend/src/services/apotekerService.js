import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const getAllPatients = async () => {
  try {
    const response = await axios.get(`${API_URL}/options/patients`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pasien :', error);
    throw error;
  }
};

export const getAllPrescriptions = async () => {
  try {
    const response = await axios.get(`${API_URL}/apoteker/prescriptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resep obat:', error);
    throw error;
  }
};

export const updatePrescriptionStatus = async (pickup_id, picked_by) => {
  try {
    const response = await axios.put(`${API_URL}/apoteker/pickup/${pickup_id}`, { picked_by });
    return response.data;
  } catch (error) {
    console.error('Error fetching resep obat:', error);
    throw error;
  }
};
