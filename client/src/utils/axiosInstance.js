import axios from 'axios';
import axiosRetry from 'axios-retry';
import Cookie from "universal-cookie";

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8000/api', 
  baseURL: 'https://pcte-labs-server.onrender.com/api', 
  withCredentials: true, 
});

axiosRetry(axiosInstance, {
  retries: 3, 
  retryDelay: (retryCount) => {
    return Math.pow(2, retryCount) * 1000; 
  },

  shouldResetTimeout: true, 
});

axiosInstance.interceptors.request.use(config => {
  const cookie = new Cookie();
  const token = cookie.get('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;