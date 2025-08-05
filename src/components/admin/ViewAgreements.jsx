import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiCheckCircle, mdiClockOutline, mdiDownloadCircle, mdiCloudDownload } from '@mdi/js';
import { uploadFile } from '../../services/admin/uploadFileService';
import { payerService } from '../../services/admin/payerService';
import { agreementService } from '../../services/admin/agreementService';


const ViewAgreements = () => {

    const [payer, setPayer] = useState({});
    const [supplier, setSupplier] = useState({});
    const [agreemments, setAgreements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingId, setLoadingId] = useState(null);

    useEffect(() => {
        const fetchAgreements = async () => {
            try {
                const response = await agreementService.getAgreements();
                if (response.status === 200) {
                    setAgreements(response.data);
                    console.log('Agreements fetched successfully:', response.data);
                } else {
                    console.error('Error fetching agreements:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching payers:', error);
            }
        };
        fetchAgreements();
    }, []);

    const handleDownload = async (id) => {
        setLoadingId(id);
        try {
            const { data: blob } = await agreementService.exportExcel(id);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `reporte_${id}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al descargar el Excel:', error);
            alert('No se pudo descargar el reporte. Intenta de nuevo.');
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 pt-20">
            <div className="w-full m-6"> {/* Added container for better centering and padding */}
                {agreemments.length > 0 ? (
                    <div className="bg-white shadow-sm rounded-2xl p-6 h-full border-2 border-gray-200"> {/* Enhanced card-like container */}
                        <div className="overflow-x-auto">
                            <table className="w-full leading-normal">
                                {/* Removed shadow-md and rounded-4xl from table directly to avoid double shadow/border */}
                                <thead>
                                    <tr className="bg-white rounded-lg text-gray-700 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Identificador</th>
                                        <th className="py-3 px-6 text-center">Documentos totales</th>
                                        <th className="py-3 px-6 text-right pr-20">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agreemments.map((agreement, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-200 hover:bg-indigo-50 transition duration-300 ease-in-out"
                                        >
                                            {/* Smoother hover effect */}
                                            <td className="py-3 px-6 text-left whitespace-no-wrap">
                                                {agreement.name}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span className="p-2 px-22 bg-green-100 text-green-800 text-xs font-semibold rounded-lg">
                                                    {agreement.documents ? agreement.documents.length : 0}
                                                </span>
                                            </td>

                                            <td className="py-3 px-6 flex justify-end">
                                                {/* <button className="bg-green-400 flex gap-4 cursor-pointer text-white px-4 py-2 rounded-lg shadow-lg hover:bg-orange-500 transition duration-300">
                                                    <Icon path={mdiDownloadCircle} size={1} />
                                                    Descargar repositorio
                                                </button> */}
                                                {/* <div className="bg-green-600 flex gap-4 cursor-pointer text-white px-2 py-2 rounded-lg shadow-lg hover:bg-orange-500 transition duration-300">
                                                    <Icon path={mdiCloudDownload} size={1} />
                                                    Exportar
                                                </div> */}
                                                <button
                                                    onClick={() => handleDownload(agreement.identifier)}
                                                    disabled={loadingId === agreement.id}
                                                    className={`cursor-pointer
                            flex items-center space-x-2 px-4 py-2 rounded-lg
                            bg-green-600 hover:bg-green-500 text-white transition
                            ${loadingId === agreement.id ? 'opacity-50 cursor-not-allowed' : ''}
                          `}
                                                >
                                                    <Icon path={mdiCloudDownload} size={1} />
                                                    <span>
                                                        {loadingId === agreement.id
                                                            ? 'Generando...'
                                                            : 'Generar reporte'}
                                                    </span>
                                                </button>
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
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />

                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" />
                        </svg>

                        {/* Mensaje principal */}
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                            No se han registrado órdenes de pago.
                        </h3>

                        {/* Subtítulo */}
                        <p className="text-gray-500 mb-6 text-center max-w-sm">
                            Registra tu primer órden de pago para procesar sus desembolsos.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewAgreements;