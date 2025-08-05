import React, { use } from 'react';
import formatNumber from '../../utils/formatNumber';
import { useEffect, useCallback } from 'react';

const ItemsSelectedCard = ({ accountsPayable }) => {

    const FinancingDays = 60

    const calculateCutOffDate = (issueDate) => {
        // 1) Creamos un objeto Date a partir de la fecha original
        const date = new Date(issueDate);

        // 2) Sumamos los días
        date.setDate(date.getDate() + FinancingDays);

        // 3) Devolvemos el objeto Date (o ya formateado)
        return date;
    };

    function formatISODate(isoString) {
        const date = new Date(isoString);
        if (isNaN(date)) {
            throw new Error('Fecha ISO no válida: ' + isoString);
        }

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const mins = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        console.log('Detalles de cuentas por pagar:', accountsPayable);
    }, []);

    return (
        <div className="flex-1 overflow-y-auto mb-4">
            {accountsPayable.length > 0 ? (
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de corte</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto a financiar</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comisión</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intereses</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {accountsPayable.map(item => (
                            <tr key={item.documentNumber} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatISODate(item.cutOffDate)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    $ {formatNumber(item.amountToFinance)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    $ {formatNumber(item.commissions)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    $ {formatNumber(item.interests || 0)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-red-600">No ha seleccionado ninguna factura para financiar.</p>
            )}
        </div>
    );
}

export default ItemsSelectedCard;