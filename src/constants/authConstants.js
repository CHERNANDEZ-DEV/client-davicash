export const UserRoles = Object.freeze({
    MANAGER: Symbol('manager'),
    OPERATOR: Symbol('operator'),
    AUTHORIZING: Symbol('authorizing'),
});

export const RoutePermissions = Object.freeze({

    // PERMISOS DE VISUALIZACIÓN DE RUTAS //

    DASHBOARD_VIEW: Symbol('dashboard_view'), // Permiso para ver el dashboard de administración
    LINK_USER_VIEW: Symbol('link_user_view'), // Permiso para ver la gestión de usuarios
    AGREEMENT_MANAGEMENT_VIEW: Symbol('agreement_management_view'), // Permiso para ver la gestión de acuerdos
    PAYER_MANAGEMENT_VIEW: Symbol('payer_management_view'), // Permiso para ver la gestión de pagadores
    SUPPLIER_MANAGEMENT_VIEW: Symbol('supplier_management_view'), // Permiso para ver la gestión de proveedores
    UPLOAD_FILE_VIEW: Symbol('view_upload_file_view'), // Permiso para ver la carga de archivos

    SELECT_DOCUMENTS_VIEW: Symbol('select_documents_view'), // Permiso para ver la pagina de selección de documentos
    DOCUMENTS_SELECTED_VIEW: Symbol('documents_selected_view'), // Permiso para ver la pagina de documentos seleccionados

    APPROVE_DOCUMENTS_VIEW: Symbol('approve_documents_view'), // Permiso para ver la pagina de aprobación de documentos
    DOCUMENTS_APPROVED_VIEW: Symbol('documents_approved_view'), // Permiso para ver la pagina de documentos aprobados  

    // PERMISOS DE EJECUCIÓN DE ACCIONES //

    CREATE_PAYER_EXECUTE: Symbol('create_payer_execute'), // Permiso para crear un pagador
    LINK_USER_EXECUTE: Symbol('link_user_execute'), // Permiso para vincular un usuario a un rol
    UPLOAD_DOCUMENTS_EXECUTE: Symbol('upload_documents_execute'), // Permiso para subir documentos

    APPROVE_DOCUMENTS_EXECUTE: Symbol('approve_documents_execute'), // Permiso para aprobar documentos

    SELECT_DOCUMENTS_EXECUTE: Symbol('select_documents_execute'), // Permiso para seleccionar documentos

    SELECT_AGREEMENT_EXECUTE: Symbol('select_agreement_execute'), // Permiso para seleccionar un acuerdo

});

// Vamos a mapear los roles a sus permisos correspondientes

export const RolePermissions = Object.freeze({
    MANAGER: [
        RoutePermissions.DASHBOARD_VIEW,
        RoutePermissions.LINK_USER_VIEW,
        RoutePermissions.AGREEMENT_MANAGEMENT_VIEW,
        RoutePermissions.PAYER_MANAGEMENT_VIEW,
        RoutePermissions.SUPPLIER_MANAGEMENT_VIEW,
        RoutePermissions.UPLOAD_FILE_VIEW,
        RoutePermissions.CREATE_PAYER_EXECUTE,
        RoutePermissions.LINK_USER_EXECUTE,
        RoutePermissions.UPLOAD_DOCUMENTS_EXECUTE,
    ],

    OPERATOR: [
        RoutePermissions.SELECT_AGREEMENT_EXECUTE,
        RoutePermissions.SELECT_DOCUMENTS_VIEW,
        RoutePermissions.DOCUMENTS_SELECTED_VIEW,
        RoutePermissions.SELECT_DOCUMENTS_EXECUTE
    ],

    AUTHORIZING: [
        RoutePermissions.SELECT_AGREEMENT_EXECUTE,
        RoutePermissions.APPROVE_DOCUMENTS_VIEW,
        RoutePermissions.DOCUMENTS_APPROVED_VIEW,
        RoutePermissions.APPROVE_DOCUMENTS_EXECUTE,
    ],
});