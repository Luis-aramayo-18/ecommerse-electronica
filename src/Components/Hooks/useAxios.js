import axios from "axios";
import { useAuth } from "./useAuth";

export const useAxios = () => {
  const { userData } = useAuth();

  const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: userData.token ? { Authorization: `Token ${userData.token}` } : {},
  });

  return api
};
