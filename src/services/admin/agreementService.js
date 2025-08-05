import api from "../api";

const createAgreement = async (data) => {

    try {
        const response = await api.post("/archivos/upload-excel ", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error("Error creating agreement:", error);
        throw error;
    }
}

export const exportExcel = (agreementIdentifier) => {
    return api.get(
        `/agreement/getDocumentsApproved/${agreementIdentifier}`,
        {
            responseType: 'blob',
            headers: {
                Accept:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        }
    );
};

const getAgreements = async () => {
    try {
        const response = await api.get("/agreement/getAll");
        return response;
    } catch (error) {
        console.error("Error fetching agreements:", error);
        throw error;
    }
}

export const agreementService = {
    createAgreement,
    getAgreements,
    exportExcel
}