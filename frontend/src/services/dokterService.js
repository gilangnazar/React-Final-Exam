import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const dokterGetAppointment = async (user_id) => {
  try {
    const response = await axios.get(`${API_URL}/doctors/${user_id}/appointments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dokter appointments:', error);
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
