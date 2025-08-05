import React, { useState }  from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AgreementProvider } from './context/AgreementContext';
import { AuthProvider, useAuth, ROLES, PERMISSIONS } from './context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import { useSessionTimer } from './hooks/useSessionTimer';
import { useIdleLogout } from './hooks/useIdleLogout';
import Icon from '@mdi/react';
import { mdiBellAlert } from '@mdi/js';
import IdleAlert from './components/alerts/IdleAlert';

// SUPERADMIN
import SuperAdminMenu from './pages/super-admin/SuperAdminMenu';
import ManageUsers from '../src/pages/super-admin/ManageUsers';
import ManageRoles from '../src/pages/super-admin/ManageRoles';
import ManagePermissions from '../src/pages/super-admin/ManagePermissions';

// ADMIN
import Menu from '../src/pages/admin/Menu';
import UploadFile from './pages/admin/UploadFilePage';
import AgreementManagement from '../src/pages/admin/AgreementManagement';
import PayerManagement from '../src/pages/admin/PayerManagement';
import SupplierManagement from '../src/pages/admin/SupplierManagement';
import UserManagement from '../src/pages/admin/UserManagement';

// PAYER
import ApproveDocuments from '../src/pages/payer/ApproveDocuments';
import ApproveDocumentsTwoModeAuth from './pages/payer/ApproveDocumentsTwoModeAuth';
import SelectDocumentsTwoModeAuth from './pages/supplier/SelectDocumentsTwoModeAuth';

// SUPPLIER
import SelectDocuments from '../src/pages/supplier/SelectDocuments';

// SHARED
import DocumentSelectedOrApproved from '../src/pages/shared-pages/DocumentsSelectedOrApproved';
import ResourceNotFound from '../src/pages/shared-pages/ResourceNotFound';
import Unauthorized from '../src/pages/shared-pages/Unauthorized';
import SelectAgreementToStart from '../src/pages/shared-pages/SelectAgreementToStart';

// PUBLIC
import Login from '../src/pages/auth/Login';
import Layout from '../src/components/layouts/MainLayout';
import UploadFilePage from './pages/admin/UploadFilePage';
import UploadFilePageAuthTwo from './pages/admin/UploadFilePageAuthTwo';

const ProtectedRoute = ({ allowedRoles, requiredPermissions = [] }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  const hasRole = allowedRoles.includes(user.role);
  const hasPermissions = requiredPermissions.every(p => user.permissions.includes(p));

  if (!hasRole || !hasPermissions) return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
};

const DynamicRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  switch (user.role) {
    case ROLES.MANAGER:
      return <Navigate to="/admin" replace />;
    case ROLES.SUPPLIER:
      return <Navigate to="/select-agreement" replace />;
    case ROLES.AUTHORIZING:
      return <Navigate to="/payer" replace />;
    case ROLES.SUPPLIER_TWO_MODE_AUTH:
      return <Navigate to="/select-agreement-two" replace />;
    case ROLES.AUTHORIZING_TWO_MODE_AUTH:
      return <Navigate to="/payer-two" replace />;
    case ROLES.OPERATOR:
      return <Navigate to="/upload-file" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

const ExpiryAlert = () => (
  <div className="fixed bottom-6 right-6 bg-white border-l-4 border-red-400 shadow-xl p-4 rounded-lg flex items-start space-x-3 z-50 animate-fade-in">
    <div className="flex-shrink-0">
      <Icon path={mdiBellAlert} size={1.5} className="text-red-500" />
    </div>
    <div>
      <p className="text-sm font-semibold text-red-800 mb-1">¡Atención!</p>
      <p className="text-sm text-gray-700">
        Tu sesión expirará en breve. Serás redirigido automáticamente al inicio de sesión.
      </p>
    </div>
  </div>
);

const AppContent = () => {
  
  const { isLoading, loginTime } = useAuth();

  const showWarning = useSessionTimer(loginTime);

  if (isLoading) return <LoadingSpinner />;

  return (<>
    {showWarning && <ExpiryAlert />}
    <Routes>
      <Route path="/" element={<DynamicRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<ResourceNotFound />} />

      <Route element={<ProtectedRoute allowedRoles={[ROLES.MANAGER]} />}>
        <Route path="admin" element={<Layout />}>
          <Route index element={<Menu />} />
          <Route path="agreement-management" element={<AgreementManagement />} />
          <Route path="payer-management" element={<PayerManagement />} />
          <Route path="supplier-management" element={<SupplierManagement />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="upload-file" element={<UploadFilePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.SUPPLIER]} />}>
        <Route path='select-agreement' element={<SelectAgreementToStart />}></Route>
        <Route path="supplier" element={<Layout />}>
          <Route index element={<SelectDocuments />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.AUTHORIZING]} requiredPermissions={[]} />}>
        {/* <Route path='select-agreement-payer' element={<SelectAgreementToStart />}></Route> */}
        <Route path="payer" element={<Layout />}>
          <Route index element={<ApproveDocuments />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.OPERATOR]} requiredPermissions={[]} />}>
        <Route path="upload-file" element={<Layout />}>
          <Route index element={<UploadFilePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.AUTHORIZING_TWO_MODE_AUTH]} requiredPermissions={[]} />}>
        <Route path="payer-two" element={<Layout />}>
          <Route index element={<UploadFilePageAuthTwo />} />
          <Route path="approve-documents-two" element={<ApproveDocumentsTwoModeAuth />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.SUPPLIER_TWO_MODE_AUTH]} requiredPermissions={[]} />}>
        <Route path='select-agreement-two' element={<SelectAgreementToStart />}></Route>
        <Route path="supplier-two" element={<Layout />}>
          <Route index element={<SelectDocumentsTwoModeAuth />} />
        </Route>
      </Route>

    </Routes >
  </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AgreementProvider>
          <AppContent />
        </AgreementProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;