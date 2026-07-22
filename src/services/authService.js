import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Authentication
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const forgotPassword = (data) =>
  API.post("/auth/forgot-password", data);

export const resetPassword = (token, data) =>
  API.post(`/auth/reset-password/${token}`, data);

// Transactions
export const transferMoney = (data) =>
  API.post("/transaction/transfer", data);

export const getTransactionHistory = () =>
  API.get("/transaction/history");

export const getAccountName = (accountNumber) =>
  API.get(`/transaction/name-enquiry/${accountNumber}`);

export default API;