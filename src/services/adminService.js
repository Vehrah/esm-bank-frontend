import API from "./authService";

export const getDashboard = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};

export const getUsers = async () => {
  const response = await API.get("/admin/users");
  return response.data;
};