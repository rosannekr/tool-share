import axios from "axios";
import { Redirect } from "react-router-dom";

/* Configuration */

// Do something before request is sent
axios.interceptors.request.use(
  (config) => {
    // Grab token
    const token = localStorage.getItem("token");

    // Add header with token to every request
    if (token != null) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Intercept 401 unauthorized responses
axios.interceptors.response.use(
  (response) => {
    // if reponse is ok, just return the response
    return response;
  },
  (error) => {
    // if user is not authorized, remove token and redirect to login page
    if (error.response.status === 401) {
      localStorage.removeItem("token");
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
