/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';

export function EditRejugandoPanel({ onClose, onGoToNota, onGoToEstado, onRejugandoChange, onAvanzar, textoBoton }) {
  const panelRef = useRef(null);
  const [rejugando, setRejugando] = useState('NO');

  // useEffect(() => {
  //   // Cierra el panel al hacer clic fuera de él
  //   function handleClickOutside(event) {
  //     if (panelRef.current && !panelRef.current.contains(event.target)) {
  //       onClose();
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, [onClose]);

  useEffect(() => {
    onRejugandoChange(rejugando); // Llama a la función de callback para enviar la nota al padre
  }, [rejugando, onRejugandoChange]);

  // En cada panel

  const handleRejugandoClick = (value) => {
    setRejugando(value);
  };
  const options = [
    { value: 'SI', color: 'bg-green-700' },
    { value: 'NO', color: 'bg-red-800' },    
  ];


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div
        ref={panelRef}
        className="flex flex-col items-center p-6 text-gray-100 border-2 border-gray-100 rounded-lg shadow-lg bg-slate-950"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="justify-center w-full gap-4 mb-4 text-lg font-semibold text-center">
        <p className='text-sm lg:text-lg'>¿Rejugándolo?</p></div>

        <div className="grid grid-cols-2 gap-2">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleRejugandoClick(option.value)}
              className={`p-3 px-6 hover:bg-gray-500 rounded-lg text-white ${option.color} ${rejugando === option.value ? 'ring-2 ring-blue-400 bg-blue-500' : ''}`}
            >
              {option.value}
            </button>
          ))}
        </div>
          
          <div className='flex flex-col justify-center w-full gap-8 p-2 mt-5 text-xs sm:flex-row sm:gap-0 sm:text-sm lg:mt-10'>
            <div className='flex items-center justify-center w-full'><button className='p-2 px-5 transition duration-500 bg-purple-700 border-2 border-purple-500 rounded-xl hover:bg-purple-600' onClick={onClose}>{textoBoton}</button></div>
            {/* <button onClick={onGoToEstado}><span className='p-2 transition duration-500 bg-green-700 border-2 border-green-500 rounded-xl hover:bg-green-600'>Ir a Estado</span></button> */}
            {/* <button className='text-xs font-thin transition duration-500 opacity-50 sm:text-sm hover:opacity-100' onClick={onClose}><span className='p-1 transition duration-500 rounded-lg hover:bg-slate-700'>Cerrar</span></button> */}
          </div>
      </div>
    </div>
  );
}