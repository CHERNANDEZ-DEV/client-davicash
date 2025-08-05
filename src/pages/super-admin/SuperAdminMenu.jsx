import React from 'react';

const SuperAdminMenu = () => {
  return (
    <div>
      <h1>Super Admin Menu</h1>
      <ul>
        <li><a href="/super-admin/manage-users">Manage Users</a></li>
        <li><a href="/super-admin/manage-roles">Manage Roles</a></li>
        <li><a href="/super-admin/manage-permissions">Manage Permissions</a></li>
      </ul>
    </div>
  );
}

export default SuperAdminMenu;