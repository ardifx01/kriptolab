import axios from "axios";

import { API_URL } from "@/constants";
import { store } from "@/redux/store";

// DEFAULT NORMAL API
export const UnauthenticatedAPI = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// AUTHENTICATED API
export const AuthenticatedAPI = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

AuthenticatedAPI.interceptors.request.use((config) => {
  const token = store.getState().globalSettings.jwttoken;
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});
