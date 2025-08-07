import React from "react";
import { FaDollarSign, FaChartLine, FaClipboardList, FaUsers } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import WelcomeBannerCard from "../../components/Home/WelcomeBannerCard.jsx";

const Menu = () => {
    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(`/admin/${path}`);
    };

    return (

        <div className="bg-gray-100 h-screen">
            <div className="pt-26 pl-6 pr-6">
                <WelcomeBannerCard />
            </div>

            {/* ---------- CONTENEDOR GRID ---------- */}
            <div className="grid gap-6 p-6
                grid-cols-1 md:grid-cols-2 md:grid-rows-2 ">

                {/* ---------- CARD 1 ---------- */}
                <div
                    onClick={() => handleCardClick('upload-file')}
                    className="relative bg-white font-montserrat rounded-3xl shadow-lg
               ring-1 ring-gray-200 overflow-visible
               transition-transform duration-300 cursor-pointer
               hover:scale-[1.015] hover:shadow-md border-l-red-500 border-l-2"
                >
                    <div className="relative flex flex-col items-center text-center p-10">
                        <div className="bg-red-100 p-5 rounded-full mb-6 shadow-inner">
                            <FaClipboardList className="text-red-500 text-4xl" />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Centro de carga de documentos
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-xs">
                            Sube y gestiona los documentos clave de tu operación.
                        </p>

                        <button className="group flex items-center text-red-600 font-medium cursor-pointer">
                            Administrar
                            <svg className="h-5 w-5 ml-1 transition-transform duration-200 group-hover:translate-x-1"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ---------- CARD 2 ---------- */}
                <div
                    onClick={() => handleCardClick('agreement-management')}
                    className="relative bg-white font-montserrat rounded-3xl shadow-lg
               ring-1 ring-gray-200 transition-transform duration-300 cursor-pointer
               hover:scale-[1.015] hover:shadow-md"
                >
                    <div className="flex flex-col items-center text-center p-10">
                        <div className="bg-red-100 p-5 rounded-full mb-6">
                            <FaDollarSign className="text-red-600 text-4xl" />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Gestión de órdenes de pago
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-xs">
                            Supervisa y administra las órdenes de pago en cada etapa.
                        </p>

                        <button className="group flex items-center text-red-600 font-medium cursor-pointer">
                            Administrar
                            <svg className="h-5 w-5 ml-1 transition-transform duration-200 group-hover:translate-x-1"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ---------- CARD 3 ---------- */}
                <div
                    onClick={() => handleCardClick('payer-management')}
                    className="relative bg-white font-montserrat rounded-3xl shadow-lg
               ring-1 ring-gray-200 transition-transform duration-300 cursor-pointer
               hover:scale-[1.015] hover:shadow-md   border-l-red-500 border-l-2"
                >
                    <div className="flex flex-col items-center text-center p-10">
                        <div className="bg-red-100 p-5 rounded-full mb-6">
                            <FaChartLine className="text-red-600 text-4xl" />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Gestión de pagadores
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-xs">
                            Mantén actualizada la base de pagadores y su información.
                        </p>

                        <button className="group flex items-center text-red-600 font-medium cursor-pointer">
                            Administrar
                            <svg className="h-5 w-5 ml-1 transition-transform duration-200 group-hover:translate-x-1"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ---------- CARD 4 ---------- */}
                <div
                    onClick={() => handleCardClick('user-management')}
                    className="relative bg-white font-montserrat rounded-3xl shadow-lg
               ring-1 ring-gray-200 transition-transform duration-300 cursor-pointer
               hover:scale-[1.015] hover:shadow-md"
                >
                    <div className="flex flex-col items-center text-center p-10">
                        <div className="bg-red-100 p-5 rounded-full mb-6">
                            <FaUsers className="text-red-600 text-4xl" />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Gestión de usuarios
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-xs">
                            Controla los usuarios vinculados y sus permisos en la plataforma.
                        </p>

                        <button className="group flex items-center text-red-600 font-medium cursor-pointer">
                            Administrar
                            <svg className="h-5 w-5 ml-1 transition-transform duration-200 group-hover:translate-x-1"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;