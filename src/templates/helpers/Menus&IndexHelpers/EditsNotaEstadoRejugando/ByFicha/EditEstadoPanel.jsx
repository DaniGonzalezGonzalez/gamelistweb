/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { AbandonadoIcon, CheckIcon, CompleteIcon, DeleteIcon, PauseIcon, PlayIcon, ProximosIcon, StartIcon, UpdateIcon } from '../../../../../assets/Icons'
import { useEditGameToList } from '../../../../../hooks/useEditGameToList'
import { useFetchDataAndSort } from '../../../../../hooks/useFetchDataAndSort'
import { cleanTitle } from '../../../constants/constants'
import { estadoIconos } from '../../../constants/constantsComponents'
import { calculateNewPosition } from '../Helpers/utils'

export function EditEstadoPanel({ onAvanzar, onClose, onEstadoChange, onAddGame, textoBoton, id, titulo, tabla, onAdded, estadoActual, onPosition }) {
  const panelEstadoRef = useRef(null);
  const [estado, setEstado] = useState(estadoActual || 'Jugando')
  const { handleDelete } = useEditGameToList(id, tabla)
  const { fetchData, dataBD } = useFetchDataAndSort(estado) // Trae los juegos del estado seleccionado

  useEffect(() => {
    fetchData() // Llama a la función para obtener los datos cada vez que cambie el estado
  }, [estado])

  const handleDeleteAndRefresh = (id, tabla) => {
    handleDelete(id, tabla)
  }

// Calcula la posición más alta y le añade 1. Si no hay juegos, la posición inicial será 1
const newPosition = calculateNewPosition(dataBD);

  
  const handleCerrarPanel = () => {
     // Solo llamamos a la función de cambio si el estado es diferente
    if (estado !== estadoActual) {
      onEstadoChange(estado) // Estado ha cambiado, hacemos el cambio
    }
    if (estado !== estadoActual) {
      onPosition(newPosition)
    }
    onAvanzar() // Cerramos el panel
  }

  const handleEstadoClick = (value) => {
    setEstado(value)
  }

  const estados = Object.keys(estadoIconos)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div ref={panelEstadoRef} className="scroll-container flex flex-col items-center p-6 text-gray-100 border-2 border-gray-100 rounded-lg shadow-lg bg-slate-950 max-h-[90vh] overflow-y-scroll w-5/6 sm:w-1/2 mt-14 sm:mt-0"
        onClick={(e) => e.stopPropagation()}>
        { onAdded && 
          <div className="justify-center w-full gap-4 mb-4 text-lg font-semibold text-center">
            <p className='mt-4 text-sm lg:text-lg'>{cleanTitle(titulo)}</p>
          </div>
        }
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
          {estados.map((option) => (
              <button
                key={option}
                onClick={() => handleEstadoClick(option)}
                className={`p-3 text-xs hover:bg-gray-500 transition duration-500 rounded-lg text-white ${estado === option ? 'ring-2 ring-blue-500 bg-blue-600 hover:bg-blue-600' : ''} flex items-center`}
              >
                {/* Muestra el icono y el texto en el botón */}
                <span className="flex-shrink-0 mr-2">{estadoIconos[option]}</span>
                <span>{option}</span>
              </button>
            ))
          }
        </div>
        { onAdded && 
            <button onClick={() => handleDeleteAndRefresh(id, titulo)} type="button" className={`p-3 text-xs transition duration-500 rounded-lg text-white hover:ring-2 hover:ring-red-500 hover:bg-red-600 flex items-center mt-2`}>
              <div className='mr-2'><DeleteIcon w={6} h={6} /></div> 
              <span className="flex-shrink-0">Eliminar de mis listas</span>
            </button>
        }
        <div className='flex flex-col items-center justify-center w-full gap-3 mt-5 text-xs sm:gap-0 sm:flex-row sm:text-sm lg:mt-10'>
          <div className='flex items-center justify-center w-full'><button className='p-2 px-5 transition duration-500 bg-purple-700 border-2 border-purple-500 rounded-xl hover:bg-purple-600' onClick={handleCerrarPanel}>{textoBoton}</button></div>
        </div>
      </div>
    </div>
  );
}

