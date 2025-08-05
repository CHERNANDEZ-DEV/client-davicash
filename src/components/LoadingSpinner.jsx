import React from 'react';

const LoadingSpinner = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
        <div className="animate-spin rounded-full border-8 border-gray-200 border-t-8 border-primary h-16 w-16"></div>
        {/* Puedes cambiar 'border-primary' por 'border-red-600' o el color de tu marca */}
    </div>
);

export default LoadingSpinner;
