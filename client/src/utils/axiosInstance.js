import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lmsproject-x7rz.onrender.com", // change to your backend
  withCredentials: true, // for cookies (optional)
});

export default axiosInstance;
