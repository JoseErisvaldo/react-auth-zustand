import axios from "axios";
import { useAuthStore } from "../../features/auth/store/auth.store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    console.log("Attaching token to request:", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { api };
