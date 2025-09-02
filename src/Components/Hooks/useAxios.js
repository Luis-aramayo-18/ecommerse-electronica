import axios from "axios";

export const useAxios = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("authToken");
            if (token) {
                config.headers["Authorization"] = `Token ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return api;
};
