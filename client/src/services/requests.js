import axios from "axios";

// Register
export const register = async (name, username, password) => {
  return await axios.post("/users/register", { name, username, password });
};

// Login
export const login = async (username, password) => {
  return await axios.post("/users/login", { username, password });
};

// Get user
export const getUser = async (id) => {
  return await axios.get(`/users/${id}`);
};
