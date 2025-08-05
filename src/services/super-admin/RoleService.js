import api from "../api";

const createRole = async (roleData) => {
    try {
        const response = await api.post("/roles/create", roleData);
        return response;
    } catch (error) {
        console.error("Error creating role:", error);
        throw error;
    }
}

const assignsPermissionsToRole = async (roleId, permissions) => {
    try {

        const payload = {
            "roleId": roleId,
            "permissions": permissions
        };

        const response = await api.post('/roles/assignPermissions', payload);
        return response.data;

    } catch (error) {
        console.error("Error assigning permissions to role:", error);
        throw error;
    }
}

const getRoles = async () => {
    try {
        const response = await api.get("/roles/getAll");
        return response.data;
    } catch (error) {
        console.error("Error fetching roles:", error);
        throw error;
    }
}

export const roleService = {
    createRole,
    getRoles,
    assignsPermissionsToRole
}