import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';

// Get user tasks
const getTasks = () => {
    return axios.get(API_URL);
};

// Create a task
const createTask = (taskData) => {
    return axios.post(API_URL, taskData);
};

// Update a task
const updateTask = (id, taskData) => {
    return axios.put(`${API_URL}/${id}`, taskData);
};

// Delete a task
const deleteTask = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const taskService = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};

export default taskService; 