import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

const register = (name, email, password) => {
    return axios.post(`${API_URL}/register`, {
        name,
        email,
        password
    });
};

const login = (email, password) => {
    return axios.post(`${API_URL}/login`, {
        email,
        password
    });
};

const loadUser = () => {
    return axios.get(API_URL);
};

const authService = {
    register,
    login,
    loadUser,
};

export default authService; 