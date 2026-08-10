import axios from "axios";

const API = axios.create({
  baseURL: "https://esme-bank.onrender.com/api",
});

// Automatically attach the JWT to every request
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

export const getProfile = () =>
  API.get("/account/profile");

export const updateProfile = (data) =>
  API.put("/account/profile", data);

export const updateProfilePhoto = (data) =>
  API.put("/account/profile/photo", data);

// Notifications
export const getNotifications = () =>
  API.get("/notifications");

export const markNotificationAsRead = (id) =>
  API.put(`/notifications/${id}/read`);

export const markAllNotificationsAsRead = () =>
  API.put("/notifications/read-all");

export const deleteNotification = (id) =>
  API.delete(`/notifications/${id}`);

export const requestVirtualCard = () =>
  API.post("/cards/request");

export const getVirtualCard = () =>
  API.get("/cards");
export default API;
export const toggleFreezeCard = (cardId) =>
  API.put(`/cards/${cardId}/freeze`);
export const upgradeAccountTier = (data) =>
  API.put("/account/upgrade-tier", data);