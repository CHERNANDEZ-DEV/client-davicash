import React from "react";
import AssignPermissionToRole from "../../components/admin/AssignPermissionToRole.jsx";
import ViewPermissions from "../../components/admin/ViewPermissions.jsx";

const PermissionsManagement = () => {
    return (
        <div className="bg-gray-100 min-h-screen w-full flex pt-28 p-6 gap-6">
            <AssignPermissionToRole />
            <ViewPermissions />
        </div>
    );
}

export default PermissionsManagement;