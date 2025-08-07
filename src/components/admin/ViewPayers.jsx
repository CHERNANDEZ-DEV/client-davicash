import React, { useState, useEffect, use } from "react";
import { payerService } from '../../services/admin/payerService';

const ViewPayers = () => {

    const [payers, setPayers] = useState([]);

    useEffect(() => {
        const fetchPayers = async () => {
            try {
                const response = await payerService.getEntities();
                if (response.status === 200) {
                    setPayers(response.data);
                } else {
                    console.error('Error fetching payers:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching payers:', error);
            }
        };
        fetchPayers();
    }, []);

    return (
        <div className="w-3/4"> {/* Added container for better centering and padding */}
            {payers.length > 0 ? (
                <div className="bg-white shadow-sm rounded-2xl p-6 h-full border-2 border-gray-200"> {/* Enhanced card-like container */}
                    <div className="overflow-x-auto w-full">
                        <table className="table-fixed w-full leading-normal">
                            {/* Removed shadow-md and rounded-4xl from table directly to avoid double shadow/border */}
                            <thead>
                                <tr className="bg-white rounded-lg text-gray-700 uppercase text-sm">
                                    <th className="py-3 px-6 text-left">Código</th>
                                    <th className="py-3 px-6 text-left">Razón social</th>
                                    <th className="py-3 px-6 text-left">E-mail</th>
                                    <th className="py-3 px-6 text-left">NIT</th>
                                    <th className="py-3 px-6 text-left">Cuenta bancaria</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payers.map((payer, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 hover:bg-indigo-50 transition duration-300 ease-in-out"
                                    >
                                        {/* Smoother hover effect */}
                                        <td className="py-3 px-6 text-left whitespace-no-wrap">
                                            {payer.code}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {payer.name}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {payer.email}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {payer.nit}
                                        </td>
                                        {/* Styled IDs */}
                                        <td className="py-3 px-6 text-left">
                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                                {payer.accountBank}
                                            </span>
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
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 7h18M3 7a2 2 0 012-2h14a2 2 0 012 2m-18 0v10a2 2 0 002 2h14a2 2 0 002-2V7m-6 5h.01"
                        />
                    </svg>

                    {/* Mensaje principal */}
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                        No se han registrado pagadores.
                    </h3>

                    {/* Subtítulo */}
                    <p className="text-gray-500 mb-6 text-center max-w-sm">
                        Registra tu primer pagador para comenzar a gestionar órdenes de pago y
                        procesos de factoraje en la plataforma.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ViewPayers;