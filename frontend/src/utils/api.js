import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('changeabilityToken')
    || sessionStorage.getItem('changeabilityToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getApiError(error) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error || 'Unable to reach the server. Please try again.';
  }
  return error instanceof Error ? error.message : 'An unexpected error occurred.';
}

export default API;
