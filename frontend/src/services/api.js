import axios from 'axios';

// Create an Axios instance
const API = axios.create({
  baseURL: 'http://localhost:8000/api/', // Update to your Django backend URL if different
});

// Function to fetch tasks
export const fetchTasks = async () => {
  try {
    const response = await API.get('/tasks/');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Function to create a task
export const createTask = async (taskData) => {
  try {
    const response = await API.post('/tasks/', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export default API;
