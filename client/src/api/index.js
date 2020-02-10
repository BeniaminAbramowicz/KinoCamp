import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
});

const getAllScreenings = () => api.get('/screenings');
const registerNewUser = (data) => api.post('/register', data);
const loginUser = (data) => api.post('/login', data);
const logoutUser = () => api.get('/logout');

const apis = {getAllScreenings, registerNewUser, loginUser, logoutUser};

export default apis