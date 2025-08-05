import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { payerService } from '../../services/admin/payerService.js';

const CreatePayer = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const [ authenticationMode, setAuthenticationMode ] = useState([
        { name: "Directo", value: false },
        { name: "Alternativo", value: true }
    ]);

    const onSubmit = async (data) => {
        try {

            const response = await payerService.createEntity(data);

            // Check response status and show appropriate SweetAlert
            if (response.status >= 200 && response.status < 300) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'El pagador fue creado correctamente'
                }).then(() => {
                    reset(); // Limpiar el formulario después de un registro exitoso
                    window.location.reload(); // Recargar la página para ver los cambios
                });
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
                    text: 'El pagador ya existe en el sistema',
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

            return response;
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor',
                confirmButtonText: 'Aceptar'
            });
            throw error;
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl flex flex-col justify-between shadow-sm w-1/4 font-montserrat border-2 border-gray-200">
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <h2 className="text-xl font-bold mb-8 text-gray-800">Registro de pagadores</h2>

                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Razón social</label>
                        <input
                            id="name"
                            {...register("name", {
                                required: "Este campo es obligatorio.",
                                minLength: {
                                    value: 3,
                                    message: "El nombre debe tener al menos 3 caracteres."
                                }
                            })}
                            className={`font-montserrat w-full p-2 border ${errors.name ? 'border-red-500' : 'border-red-300'} rounded-md`}
                            placeholder="Razón social del pagador"
                        />
                        {errors.name && (
                            <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Este campo es obligatorio",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Ingrese un correo electrónico válido"
                                }
                            })}
                            className={`font-montserrat w-full p-2 border ${errors.email ? 'border-red-500' : 'border-red-300'} rounded-md`}
                            placeholder="E-mail del pagador"
                        />
                        {errors.email && (
                            <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="code" className="block text-gray-700 text-sm font-bold mb-2">NIU</label>
                        <input
                            id="code"
                            type="number"
                            {...register("code", {
                                required: "Este campo es obligatorio.",
                                min: {
                                    value: 1,
                                    message: "El código debe ser un número positivo"
                                }
                            })}
                            className={`font-montserrat w-full p-2 border ${errors.code ? 'border-red-500' : 'border-red-300'} rounded-md`}
                            placeholder="234567"
                        />
                        {errors.code && (
                            <p className="mt-1 text-red-500 text-sm">{errors.code.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="nit" className="block text-gray-700 text-sm font-bold mb-2">NIT</label>
                        <input
                            id="nit"
                            type="number"
                            {...register("nit", {
                                required: "Este campo es obligatorio",
                                min: {
                                    value: 1,
                                    message: "El NIT debe ser un número positivo"
                                }
                            })}
                            className={`font-montserrat w-full p-2 border ${errors.nit ? 'border-red-500' : 'border-red-300'} rounded-md`}
                            placeholder="0614-271109-124-0"
                        />
                        {errors.nit && (
                            <p className="mt-1 text-red-500 text-sm">{errors.nit.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="accountBank" className="block text-gray-700 text-sm font-bold mb-2">Cuenta bancaria</label>
                        <input
                            id="accountBank"
                            type="number"
                            {...register("accountBank", {
                                required: "Este campo es obligatorio.",
                                min: {
                                    value: 9,
                                    message: "La cuenta bancaria debe ser un número positivo."
                                }
                            })}
                            className={`font-montserrat w-full p-2 border ${errors.accountBank ? 'border-red-500' : 'border-red-300'} rounded-md`}
                            placeholder="777896543"
                        />
                        {errors.accountBank && (
                            <p className="mt-1 text-red-500 text-sm">{errors.accountBank.message}</p>
                        )}
                    </div>

                    {/* <div>
                        <label htmlFor="authenticationMode" className="block text-gray-700 text-sm font-bold mb-2">Método de acceso</label>
                        <select
                            id="authenticationMode"
                            {...register("authenticationMode", {
                                required: "Este campo es obligatorio"
                            })}
                            className={`font-montserrat w-full p-2 border ${errors.roleId ? 'border-red-500' : 'border-red-300'} rounded-md`}
                        >
                            <option value="">Seleccione una opción</option>
                            {authenticationMode.map((item) => (
                                <option key={item.name} value={item.value}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {errors.roleId && (
                            <p className="mt-1 text-red-500 text-sm">{errors.authenticationMode.message}</p>
                        )}
                    </div> */}


                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-red-600 rounded-md text-white p-2 text-center cursor-pointer font-bold hover:bg-red-700 w-full"
                        >
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePayer;