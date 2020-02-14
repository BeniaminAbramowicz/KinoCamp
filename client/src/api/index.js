import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
});

api.defaults.withCredentials = true;

const getAllScreenings = () => api.get('/screenings');
const registerNewUser = (data) => api.post('/register', data);
const loginUser = (data) => api.post('/login', data);
const logoutUser = () => api.get('/logout');
const createReservation = (data) => api.post('/createreservation', data);
const getUserProfile = () => api.get('/profile');
const editUserData = (data) => api.put('/edituser', data);

const apis = {editUserData, getUserProfile, getAllScreenings, registerNewUser, loginUser, logoutUser, createReservation};

export default apis