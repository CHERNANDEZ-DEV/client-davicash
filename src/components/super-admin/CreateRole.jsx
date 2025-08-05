import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { permissionService } from '../../services/super-admin/PermissionService';
import { roleService } from '../../services/super-admin/RoleService';
import ROLES from '../../constants/roles.js';

const CreateRole = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const [permissions, setPermissions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await permissionService.getPermissions();
                setPermissions(response);
                console.log("Permisos cargados:", response);
            } catch (error) {
                console.error("Error fetching permissions:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar los permisos. Inténtalo de nuevo más tarde.',
                });
            }
        };
        fetchPermissions();
    }, []);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // Transformar los permisos seleccionados (array de IDs) a la estructura esperada por el backend
            const roleData = {
                roleName: data.roleName,
                permissions: data.permissions.map(permId => ({ permission_id: Number(permId) }))
            };

            const response = await roleService.createRole(roleData);

            if (response.status >= 200 && response.status < 300) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'El rol fue creado correctamente',
                    confirmButtonText: 'Aceptar'
                });
                reset();
            } else if (response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Datos inválidos. Por favor verifica la información',
                    confirmButtonText: 'Aceptar'
                });
            } else if (response.status === 401 || response.status === 403) {
                Swal.fire({
                    icon: 'warning',
                    title: 'No autorizado',
                    text: 'No tienes permisos para realizar esta acción',
                    confirmButtonText: 'Aceptar'
                });
            } else if (response.status === 409) {
                Swal.fire({
                    icon: 'error',
                    title: 'Conflicto',
                    text: 'El rol ya existe en el sistema',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error inesperado',
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            console.error("Error creating role:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor',
                confirmButtonText: 'Aceptar'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl flex flex-col justify-between shadow-sm w-1/4 font-montserrat">
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <h2 className="text-xl font-bold mb-8 text-gray-800">Registro de roles</h2>

                    <div>
                        <label htmlFor="roleName" className="block text-gray-700 text-sm font-bold mb-2">
                            Nombre del Rol
                        </label>
                        <select
                            id="roleName"
                            {...register("roleName", {
                                required: "Este campo es obligatorio"
                            })}
                            className={`w-full p-2 border ${errors.roleName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        >
                            <option value="">Seleccione un rol</option>
                            {ROLES.map((role) => (
                                <option key={role.id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                        {errors.roleName && (
                            <p className="mt-1 text-red-500 text-sm">{errors.roleName.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Permisos</label>
                        <div className="space-y-2">
                            {permissions.map((permission) => (
                                <div key={permission.permission_id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`perm-${permission.permission_id}`}
                                        value={permission.permission_id}
                                        {...register("permissions", {
                                            required: "Debe seleccionar al menos un permiso",
                                            validate: value => value && value.length > 0 || "Se requiere al menos un permiso"
                                        })}
                                        className={`mr-2 ${errors.permissions ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    <label htmlFor={`perm-${permission.permission_id}`} className="text-gray-700">
                                        {permission.permissionName}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.permissions && (
                            <p className="mt-1 text-red-500 text-sm">{errors.permissions.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-red-600 rounded-md text-white p-2 text-center cursor-pointer font-bold hover:bg-red-700 w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Registrando...' : 'Registrar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRole;