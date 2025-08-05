import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true
});

export default api;

