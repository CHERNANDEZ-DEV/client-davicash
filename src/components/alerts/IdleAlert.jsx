import React from 'react';
import Icon from '@mdi/react';
import { mdiBellAlert } from '@mdi/js';

export default function IdleAlert() {
  return (
    <div className="fixed bottom-6 right-6 bg-white border-l-4 border-red-400
                    shadow-xl p-4 rounded-lg flex items-start space-x-3 z-50 animate-fade-in">
      <Icon path={mdiBellAlert} size={1.5} className="text-red-500 flex-shrink-0" />
      <div>
        <p className="text-sm font-semibold text-red-800 mb-1">Inactividad</p>
        <p className="text-sm text-gray-700">
            La sesión cerrará en&nbsp;<b>15 s por inactividad</b>.
        </p>
      </div>
    </div>
  );
}
