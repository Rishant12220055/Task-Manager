import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/user';

// Subscribe to emails
const subscribeToEmails = () => {
    return axios.post(`${API_URL}/subscribe`);
};

// Update user profile
const updateProfile = (userData) => {
    return axios.put(API_URL, userData);
};

const userService = {
    subscribeToEmails,
    updateProfile,
};

export default userService; 