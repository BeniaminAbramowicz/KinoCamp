import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})

const getAllScreenings = () => api.get('/screenings')

const apis = {getAllScreenings}

export default apis