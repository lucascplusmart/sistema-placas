import axios from 'axios';

// export const API_BASE_URL = 'http://localhost:8080/api/placas';
export const API_BASE_URL =
  'https://sistema-placas-gamma.vercel.app/api/placas/';

export const axiosBaseConfig = axios.create({
  baseURL: API_BASE_URL,
});
