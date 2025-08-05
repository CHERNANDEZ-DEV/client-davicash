import api from "../api";
import axios from "axios";

const createEntity = async (data) => {
  try {

    // vamos a agregar un valor a data

    data.entityType = true; // Asignar el tipo de entidad como PAYER

    console.log("Data to create payer:", data);

    const response = axios.post('http://localhost:8080/api/entities/create', data, {
      withCredentials: true
    });
    return response;
  } catch (error) {
    console.error("Error creating payer:", error);
    throw error;
  }
}

const getEntities = async () => {
  try {
    const response = await api.get(`/entities/type?isEntityType=true`);
    return response;
  } catch (error) {
    console.error("Error fetching payers:", error);
    throw error;
  }
}

const getAllEntities = async () => {
  try {
    const response = await api.get('/entities/all');
    return response;
  } catch (error) {
    console.error("Error fetching all entities:", error);
    throw error;
  }
}

export const payerService = {
  createEntity,
  getEntities,
  getAllEntities
}