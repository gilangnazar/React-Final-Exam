import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const pendaftaranGetAppointments = async () => {
  try {
    const response = await axios.get(`${API_URL}/pendaftaran/appointments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pasien appointments:', error);
    throw error;
  }
};

export const pendaftaranConfirmed = async (appointment_id) => {
  try {
    const response = await axios.put(`${API_URL}/pendaftaran/appointments/${appointment_id}/confirmed`);
    return response.data;
  } catch (error) {
    console.error('Error confirming appointment:', error);
    throw error;
  }
};
