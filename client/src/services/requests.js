import axios from "axios";
import { Redirect } from "react-router-dom";

// Intercept 401 unauthorized responses
axios.interceptors.response.use(
  (response) => {
    // if reponse is ok, just return the response
    return response;
  },
  (error) => {
    // if user is not authorized, remove token and redirect to login page
    if (error.response.status === 401) {
      console.log("redirect");

      <Redirect to="/login" />;
    }
    return error;
  }
);

// Register
export const register = async (name, username, password) => {
  return await axios.post("/users/register", { name, username, password });
};

// Login
export const login = async (username, password) => {
  return await axios.post("/users/login", { username, password });
};

// Get user profile
export const getProfile = async () => {
  return await axios.get("/users/profile");
};
