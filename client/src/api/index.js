import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})

const getAllScreenings = () => api.get('/screenings')
const registerNewUser = (data) => api.post('/register', data)

const apis = {getAllScreenings, registerNewUser}

export default apis