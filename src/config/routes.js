import { PERMISSIONS } from '../constants/permissions';

// ADMIN
import Menu from '../pages/admin/Menu';
import UploadFile from '../pages/admin/UploadFile';
import AgreementManagement from '../pages/admin/AgreementManagement';
import PayerManagement from '../pages/admin/PayerManagement';
import SupplierManagement from '../pages/admin/SupplierManagement';

// PAYER
import ApproveDocuments from '../pages/payer/ApproveDocuments';

// SUPPLIER
import SelectDocuments from '../pages/supplier/SelectDocuments';

// SHARED
import DocumentSelectedOrApproved from '../pages/shared-pages/DocumentsSelectedOrApproved';
import ResourceNotFound from '../pages/shared-pages/ResourceNotFound';
import Unauthorized from '../pages/shared-pages/Unauthorized';
import SelectAgreementToStart from '../pages/shared-pages/SelectAgreementToStart';

// PUBLIC
import Login from '../pages/auth/Login';

export const routes = [
    {
        path: '/',
        element: <Login />,
        permissions: null // Accesible a todos
    },
    {
        path: '/login',
        element: <Login />,
        permissions: null
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        permissions: [PERMISSIONS.VIEW_DASHBOARD]
    },
    {
        path: '/users',
        element: <UserManagement />,
        permissions: [PERMISSIONS.MANAGE_USERS]
    },
    {
        path: '/content',
        element: <ContentEditor />,
        permissions: [PERMISSIONS.EDIT_CONTENT]
    }
];