import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: '',
    withCredentials: true
});

export default api;

