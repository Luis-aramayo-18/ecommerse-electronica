import axios from "axios";
import { useAuth } from "./useAuth";

export const useAxios = () => {
  const { userData } = useAuth();
  const API_ENABLED = false;

  if (!API_ENABLED) {
    return {
      get: async () => Promise.resolve({ data: [] }),
      post: async () => Promise.resolve({ data: {} }),
      put: async () => Promise.resolve({ data: {} }),
      delete: async () => Promise.resolve({ data: {} }),
    };
  }

  const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: userData.token ? { Authorization: `Token ${userData.token}` } : {},
  });

  return api
};
