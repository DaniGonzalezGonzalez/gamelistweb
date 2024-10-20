/* eslint-disable react/prop-types */
import { useRef } from 'react';

export function MenuEdits({ onGoToNota, }) {
  const panelRef = useRef(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={panelRef}
        className="flex flex-col items-center w-3/4 p-6 space-y-4 text-white border border-gray-700 rounded-lg shadow-xl sm:w-1/2 lg:w-1/4 bg-gradient-to-b from-gray-900 to-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <p className='text-xs text-center'>¡A continuación procederás a la edición del juego!</p>
        <button
          onClick={onGoToNota}
          className="w-full px-4 py-2 text-sm font-semibold transition-colors duration-300 bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Comenzar
        </button>        
      </div>
    </div>
  );
}
