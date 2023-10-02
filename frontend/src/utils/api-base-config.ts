import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/placas';

export const axiosBaseConfig = axios.create({
  baseURL: API_BASE_URL,
});
