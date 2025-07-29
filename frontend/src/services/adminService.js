import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const getDashboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/dashboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin data :', error);
    throw error;
  }
};
