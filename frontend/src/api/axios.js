import axios from "axios";

// Backend server.js mounts routes at /api/auth and /api/personalDetail.
// Update VITE_API_BASE_URL in .env if your backend runs on a different host/port.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true, // required so the "jwt" cookie set by the backend is sent/received
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
