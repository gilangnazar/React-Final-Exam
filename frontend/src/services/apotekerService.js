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
