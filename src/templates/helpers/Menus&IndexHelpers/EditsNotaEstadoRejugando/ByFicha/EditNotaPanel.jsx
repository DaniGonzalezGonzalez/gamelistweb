/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';

export function EditNotaPanel({ onClose, onNotaChange, onAvanzar, textoBoton, onOmitir, notaActual, onAdded }) {
  const panelRef = useRef(null)
  const [nota, setNota] = useState(notaActual || '')

  const handleCerrarPanel = () => {
    // Solo llamamos a la función de cambio si el estado es diferente
   if (nota !== notaActual) {
    onNotaChange(nota) // Estado ha cambiado, hacemos el cambio
   }
   onAvanzar() // Cerramos el panel
 }

 const handleOmitirPanel = () => {
  // Solo llamamos a la función de cambio si el estado es diferente
 if (nota !== notaActual) {
  onNotaChange(nota) // Estado ha cambiado, hacemos el cambio
 }
 onClose() // Cerramos el panel
}

  const handleNotaClick = (value) => {
    setNota(value);
  }
  
  const options = [
    { value: '-', color: 'bg-gray-300' },
    { value: '0', color: 'bg-red-900' },
    { value: '1', color: 'bg-red-900' },
    { value: '2', color: 'bg-red-900' },
    { value: '3', color: 'bg-red-900' },
    { value: '4', color: 'bg-red-900' },
    { value: '5', color: 'bg-orange-700' },
    { value: '5.5', color: 'bg-orange-500' },
    { value: '6', color: 'bg-yellow-400' },
    { value: '6.5', color: 'bg-yellow-200' },
    { value: '7', color: 'bg-green-200' },
    { value: '7.5', color: 'bg-green-300' },
    { value: '8', color: 'bg-green-400' },
    { value: '8.5', color: 'bg-green-500' },
    { value: '9', color: 'bg-green-700' },
    { value: '9.5', color: 'bg-green-800' },
    { value: '10', color: 'bg-green-900' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div ref={panelRef} className="flex flex-col items-center p-6 text-gray-100 border-2 border-gray-100 rounded-lg shadow-lg bg-slate-950"
        onClick={(e) => e.stopPropagation()}>
        <div className="justify-center w-full gap-4 mb-4 text-lg font-semibold text-center">
        <p className='text-sm lg:text-lg'>Selecciona una nota</p></div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
          {options.map((option) => (
              <button key={option.value} onClick={() => handleNotaClick(option.value)} className={`p-3 hover:bg-gray-500 rounded-lg text-white border-2 border-black ${option.color} ${onAdded && (Number(nota) === Number(option.value)) && 'border-blue-500 border-2'}`}
              >            
                {option.value}
              </button>
            ))
          }
        </div>
          <div className='flex flex-col justify-center w-full gap-8 p-2 mt-5 text-xs sm:flex-row sm:gap-0 sm:text-sm lg:mt-10'>            
            <div className='flex flex-col items-center justify-center w-full gap-3'>
              <button className='p-2 px-5 transition duration-500 bg-purple-700 border-2 border-purple-500 rounded-xl hover:bg-purple-600' onClick={handleCerrarPanel}>{textoBoton}</button>
              { onOmitir && <button onClick={handleOmitirPanel}><span className='p-1 px-2 text-xs transition duration-500 rounded-xl hover:bg-gray-500'>Omitir</span></button>}
            </div>
          </div>
      </div>
    </div>
  )
}