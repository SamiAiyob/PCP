import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api",
});

console.log("loading axiosInstance");

console.log("----->>>>>>>>>>", process.env.REACT_APP_API_BASE_URL);

export default axiosInstance;
