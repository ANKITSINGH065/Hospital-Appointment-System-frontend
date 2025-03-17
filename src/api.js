import axios from 'axios';

const api = axios.create({ baseURL: 'https://hospital-appointment-system-backend-1.onrender.com/api' });

export default api;
