import axios from "axios";

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
    // if user is not authorized, remove token
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      // redirect to login page
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

// Get other user
export const getUser = async (id) => {
  return await axios.get(`/users/${id}`);
};

// Get profile of current user
export const getProfile = async () => {
  return await axios.get("/users/profile");
};

// Update current user's info
export const updateProfile = async (reqbody) => {
  return await axios.put(`/users/profile`, reqbody);
};

// Update current user's points
export const updatePoints = async (amount) => {
  return await axios.put(`/users/points`, { amount });
};

// Get categories
export const getCategories = async () => {
  return await axios.get("/categories");
};

// Add a product
// export const addProduct = async (
//   name,
//   description,
//   pricePerDay,
//   categoryId
// ) => {
//   return await axios.post("/products", {
//     name,
//     description,
//     pricePerDay,
//     categoryId,
//   });
// };

// Get a product
export const getProduct = async (id) => {
  return await axios.get(`/products/${id}`);
};

// Update product
export const updateProduct = async (id, reqbody) => {
  return await axios.put(`/products/${id}`, reqbody);
};

// Get all requests for current user
export const getRequests = async () => {
  return await axios.get(`/requests`);
};

// Get all requests for a product
export const getProductRequests = async (productId) => {
  return await axios.get(`/products/${productId}/requests`);
};

// Add new request
export const addRequest = async (productId, startDate, endDate) => {
  return await axios.get(`/requests`, { productId, startDate, endDate });
};

// Delete request
export const deleteRequest = async (id) => {
  return await axios.delete(`/requests/${id}`);
};

// Update request
export const updateRequest = async (id, status) => {
  return await axios.put(`/requests/${id}`, { status });
};
