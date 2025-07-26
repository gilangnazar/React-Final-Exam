import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const getPaymentsData = async () => {
  try {
    const response = await axios.get(`${API_URL}/kasir/payments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pembayaran data:', error);
    throw error;
  }
};

export const markPaymentAsPaid = async (payment_id) => {
  try {
    const response = await axios.get(`${API_URL}/kasir/payments/${payment_id}/paid`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pembayaran data:', error);
    throw error;
  }
};
