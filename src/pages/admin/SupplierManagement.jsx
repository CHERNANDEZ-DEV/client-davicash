import React from "react";
import CreateSupplier from "../../components/admin/CreateSupplier";
import ViewSuppliers from "../../components/admin/ViewSuppliers";

const SupplierManagement = () => {
    return(
        <div className="bg-red-800 h-screen w-full flex p-8 gap-6">
            {/* <CreateSupplier/> */}
            <ViewSuppliers/>
        </div>
    );
}

export default SupplierManagement;