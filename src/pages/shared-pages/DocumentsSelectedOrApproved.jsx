import React from 'react';

// --- Iconos SVG como componentes de React ---

// Icono de Lupa para el campo de búsqueda
const SearchIcon = () => (
  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

// Icono de Calendario para el campo de fecha
const CalendarIcon = () => (
    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

// Icono de Cheque para la tarjeta de resumen
const CheckIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

// --- Datos de la factura ---
const invoiceData = [
  { proveedor: 'Global Materials Inc.', fechaCorte: '10/05/2025', monto: '$ 6,250.00', comision: '$ 34.38', intereses: '$ 37.50' },
  { proveedor: 'Global Materials Inc.', fechaCorte: '11/05/2025', monto: '$ 7,200.00', comision: '$ 49.60', intereses: '$ 44.80' },
  { proveedor: 'Global Materials Inc.', fechaCorte: '12/05/2025', monto: '$ 8,150.00', comision: '$ 44.82', intereses: '$ 52.52' },
  { proveedor: 'Global Materials Inc.', fechaCorte: '13/05/2025', monto: '$ 9,100.00', comision: '$ 50.05', intereses: '$ 60.67' },
  { proveedor: 'Global Materials Inc.', fechaCorte: '14/05/2025', monto: '$ 10,050.00', comision: '$ 55.28', intereses: '$ 69.23' },
];

// --- Componente principal del Panel de Facturas ---
const InvoiceDashboard = () => {
  return (
    <div className="bg-gray-100 h-screen p-8 font-sans pt-32 flex flex-col lg:flex-row lg:space-x-8">
      
      {/* Barra lateral de Controles */}
      <aside className="w-full lg:w-1/4 mb-8 lg:mb-0">
        <div className="bg-red-700 text-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
          <div className="bg-red-500/80 p-3 rounded-full">
            <CheckIcon />
          </div>
          <div>
            <p className="text-4xl font-bold">{invoiceData.length}</p>
            <p className="text-sm">Facturas Pendientes</p>
          </div>
        </div>
        
        <div className="mt-6 bg-white p-6 rounded-xl shadow-lg">
          <div className="mb-5">
            <label htmlFor="search" className="text-sm font-medium text-gray-600 mb-1 block">Buscar por referencia</label>
            <div className="relative">
                <SearchIcon />
                <input type="text" id="search" placeholder="Buscar" className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
          </div>
          
          <div className="mb-5">
            <label htmlFor="date" className="text-sm font-medium text-gray-600 mb-1 block">Según fecha</label>
            <div className="relative">
                <input type="text" id="date" placeholder="mm/dd/yyyy" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                <CalendarIcon />
            </div>
          </div>
          
          <button className="w-full bg-red-700 text-white font-bold py-2.5 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
            Aprobar todo
          </button>
        </div>
      </aside>

      {/* Tabla Principal de Facturas */}
      <main className="w-full lg:w-3/4 bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Proveedor</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha de Corte</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Comisión</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Intereses</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoiceData.map((invoice, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-red-50/50 transition-colors duration-150">
                  <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.proveedor}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">{invoice.fechaCorte}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm font-semibold text-gray-800">{invoice.monto}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">{invoice.comision}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">{invoice.intereses}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="bg-red-600 text-white px-4 py-1.5 rounded-md text-xs font-bold hover:bg-red-700 transition-colors duration-200">Aprobar</button>
                    <button className="bg-gray-200 text-gray-800 px-4 py-1.5 rounded-md text-xs font-bold hover:bg-gray-300 transition-colors duration-200">Rechazar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default InvoiceDashboard;