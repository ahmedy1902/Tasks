import axios from "axios";
import bcrypt from "bcryptjs";

const API_URL = "http://localhost:3000";

export const login = async (credentials) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { email: credentials.email },
    });
    const user = response.data[0];
    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new Error("Invalid credentials");
    }
    return user;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch tasks");
  }
};

export const addTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add task");
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete task");
  }
};

export const updateTaskStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${API_URL}/tasks/${id}`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    // Hash the password before sending it to the server
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const response = await axios.post(`${API_URL}/users`, {
      ...userData,
      password: hashedPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const checkEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error checking email");
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.patch(`${API_URL}/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update task");
  }
};
