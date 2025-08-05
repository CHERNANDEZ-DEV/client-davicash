import api from '../api';
import axios from 'axios';

const linkUser = async (data) => {
    try {
        const response = await api.post('/users/linkUser', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Failed to link user:', error);
        throw error; // Re-throw the error for further handling
    }
}

const getRoles = async () => {
    try {
        const response = await api.get('/roles/get-roles');
        return response;
    } catch (error) {
        console.error('Failed to fetch roles:', error);
        throw error; // Re-throw the error for further handling
    }
}

const getUsers = async () => {
    try {
        const response = await api.get('/users/getAllUsers');
        return response;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error; // Re-throw the error for further handling
    }
}

export const authService = {
    getRoles,
    linkUser,
    getUsers,
};