import api from "../api";

const createPermission = async (permissionData) => {
    try {
        const response = await api.post("/permissions/create", permissionData);
        return response.data;
    } catch (error) {
        console.error("Error creating permission:", error);
        throw error;
    }
};

const getPermissions = async () => {
    try {
        const response = await api.get("/permissions/getAll");
        return response.data;
    } catch (error) {
        console.error("Error fetching permissions:", error);
        throw error;
    }
};

export const permissionService = {
    createPermission,
    getPermissions
};