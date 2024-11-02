import axios from 'axios';

const apiUrl = "http://localhost:3000/";
console.log("API URL:", apiUrl);

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;