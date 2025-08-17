import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'https://uatbancaempresas.davivienda.com.sv/APIFinanciamientoEmpresas/api',
    withCredentials: true
});

export default api;

