import React, { useState, useEffect, use } from "react";
import { authService } from '../../services/auth/authService';

const ViewUsers = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await authService.getUsers();
                if (response.status === 200) {
                    setUsers(response.data);
                } else {
                    console.error('Error fetching payers:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching payers:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-3/4"> {/* Added container for better centering and padding */}
            {users.length > 0 ? (
                <div className="bg-white shadow-sm rounded-2xl p-6 h-full border-2 border-gray-200"> {/* Enhanced card-like container */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            {/* Removed shadow-md and rounded-4xl from table directly to avoid double shadow/border */}
                            <thead>
                                <tr className="bg-white rounded-lg text-gray-700 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">NOMBRE</th>
                                    <th className="py-3 px-6 text-left">DUI</th>
                                    <th className="py-3 px-6 text-left">Entidad</th>
                                    <th className="py-3 px-6 text-left">Rol</th>
                                    <th className="py-3 px-6 text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 hover:bg-indigo-50 transition duration-300 ease-in-out"
                                    >
                                        {/* Smoother hover effect */}
                                        <td className="py-3 px-6 text-left whitespace-no-wrap">
                                            {user.name}
                                        </td>
                                        {/* <td className="py-3 px-6 text-left">
                                            {user.email}
                                        </td> */}
                                        <td className="py-3 px-6 text-left">
                                            {user.dui}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                                {user.entityName ? user.entityName : 'No asignada'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                                                {user.roleName}
                                            </span>
                                        </td>

                                        <td className="py-3 px-6 text-left">
                                            <div className="flex item-center justify-start">

                                                {/* Flexbox for buttons */}
                                                <button className="mr-2 transform hover:scale-105 transition duration-300 ease-in-out">

                                                    {/* Button animation */}
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6 text-blue-500 hover:text-blue-700"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button className="mr-2 transform hover:scale-105 transition duration-300 ease-in-out">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6 text-green-500 hover:text-green-700"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                        />
                                                    </svg>
                                                </button>
                                                <button className="transform hover:scale-105 transition duration-300 ease-in-out">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6 text-red-500 hover:text-red-700"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.927a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m-1.022.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.927a2.25 2.25 0 01-2.244-2.077L4.772 5.79M21 6.75V10.5a3.75 3.75 0 01-7.5 0V6.75m3.75 0H7.5"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="font-montserrat h-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-sm border-2 border-gray-200">
                    {/* Ícono */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-16 h-16 text-red-400 mb-6"
                    >
                        {/* Cabeza */}
                        <circle cx="12" cy="7.5" r="3.5" />

                        {/* Hombros / torso */}
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 19.5c0-3 5-4.5 7.5-4.5s7.5 1.5 7.5 4.5"
                        />

                        {/* Signo “+” para indicar registro pendiente */}
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 5v4M20 7h-4" />
                    </svg>


                    {/* Mensaje principal */}
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                        No se han vinculado usuarios.
                    </h3>

                    {/* Subtítulo */}
                    <p className="text-gray-500 mb-6 text-center max-w-sm">
                        Vincula tu primer usuario para comenzar a gestionar entidades y roles en la plataforma.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ViewUsers;