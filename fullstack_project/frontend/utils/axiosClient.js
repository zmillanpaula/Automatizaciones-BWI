// /frontend/utils/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://backend:5050",
});

// Se eliminan los interceptores de autenticación si no se usan tokens

export default axiosClient;
