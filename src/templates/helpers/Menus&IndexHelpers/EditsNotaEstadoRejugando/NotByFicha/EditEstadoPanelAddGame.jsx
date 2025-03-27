/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from 'react'
import { DeleteIcon } from '../../../../../assets/Icons'
import { UserContext } from '../../../../../context/UserContext'
import { useEditGameToList } from '../../../../../hooks/useEditGameToList'
import { useFetchDataAndSort } from '../../../../../hooks/useFetchDataAndSort'
import { cleanTitle } from '../../../constants/constants'
import { estadoIconos } from '../../../constants/constantsComponents'
import { handleCerrarPanel } from '../Helpers/handleCerrarPanel'
import { useFetchInitialData } from '../Helpers/UseEffects/useFetchInitialData'
import { calculateNewPosition, limpiarTituloJuego } from '../Helpers/utils'
import { addGameNotByFicha } from './NotByFichaUtils/addGameNotByFicha'

export function EditEstadoPanelAddGame({ onAvanzar, onClose, onEstadoChange, onAddGame, textoBoton, id, titulo, tabla, onAdded, estadoActual, onPosition, platform, formRef, handleSubmit, onNewTitulo, juego, platformDefault }) {
  const panelEstadoRef = useRef(null);
  const { user } = useContext(UserContext)
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(estadoActual || 'Jugando')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [registeredGames, setRegisteredGames] = useState([])
  const [noGamesLoaded, setNoGamesLoaded] = useState(false)
  const [success, setSuccess] = useState(null);

  const { handleDelete } = useEditGameToList(id, tabla)
  const { fetchData, dataBD } = useFetchDataAndSort(estadoSeleccionado) // Trae los juegos del estado seleccionado
  
  // Controla que no sobreescriba un juego que existe ya en una plataforma
  useFetchInitialData(user, setRegisteredGames, setNoGamesLoaded, setError) 

  useEffect(() => {
  }, [platform])

  useEffect(() => {
    fetchData() // Llama a la función para obtener los datos cada vez que cambie el estado
  }, [estadoSeleccionado])

  const handleDeleteAndRefresh = (id, tabla) => {
    handleDelete(id, tabla)
  }
  
  const newPosition = calculateNewPosition(dataBD)

  const addGameFicha = addGameNotByFicha
 
  const handleEstadoClick = (value) => {
    setEstadoSeleccionado(value)
  }

  const estados = Object.keys(estadoIconos)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div
        ref={panelEstadoRef}
        className="scroll-container flex flex-col items-center p-6 text-gray-100 border-2 border-gray-300 rounded-lg shadow-lg bg-slate-950 max-h-[90vh] overflow-y-scroll w-5/6 sm:w-1/2 mt-14 sm:mt-0 xl:h-96 xl:justify-evenly"
        onClick={(e) => e.stopPropagation()}
      >
      {onAdded && <div className="justify-center w-full gap-4 mb-4 text-lg font-semibold text-center">
          <p className='mt-4 text-sm lg:text-lg'>{cleanTitle(titulo)}</p>
        </div>}

      { !success && !error && <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
          {estados.map((option) => (
            <button key={option} onClick={() => handleEstadoClick(option)} className={`p-3 text-xs hover:bg-gray-500 transition duration-500 rounded-lg text-white ${estadoSeleccionado === option ? 'ring-2 ring-blue-500 bg-blue-600 hover:bg-blue-600' : ''} flex items-center`}>
              {/* Muestra el icono y el texto en el botón */}
              <span className="flex-shrink-0 mr-2">{estadoIconos[option]}</span>
              <span>{option}</span>
            </button>
          ))}
        </div>}

        <div className="flex justify-center w-full">                          
            {error && <p className="font-bold text-red-400 font-montserrat">{error}</p>}
            {success && !error && (
            <div className="relative flex flex-col items-center w-full max-w-sm gap-3 p-6 text-white shadow-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-2xl backdrop-blur-md lg:max-w-md">
            {/* Imagen con efecto hover */}
            <div className="w-full overflow-hidden transition-transform duration-300 shadow-lg rounded-xl hover:scale-105">
              <img 
                src={juego.url[0]} 
                alt={`Imagen de ${juego.titulo}`} 
                className="object-cover w-full h-40"
              />
            </div>
          
            {/* Contenido del juego */}
            <div className="flex flex-col items-center px-4 text-center">
              <h3 className="text-lg font-extrabold tracking-wide lg:text-xl">{limpiarTituloJuego(juego.titulo)}</h3>
              <p className="mt-1 text-xs text-gray-300 lg:text-sm">{juego.descripcion}</p>
              <span className="mt-2 text-sm font-semibold text-blue-400">
                ¡Registrado correctamente!
              </span>
            </div>
          
            {/* Brillo decorativo */}
            <div className="absolute w-24 h-1 bg-blue-500 rounded-full opacity-50 -top-1 left-1/2 blur-sm"></div>
          </div>
          )}               
        </div>

        {onAdded && <button onClick={() => handleDeleteAndRefresh(id, titulo)} type="button" className={`p-3 text-xs transition duration-500 rounded-lg text-white hover:ring-2 hover:ring-red-500 hover:bg-red-600 flex items-center mt-2`}><div className='mr-2'><DeleteIcon w={6} h={6} /></div> <span className="flex-shrink-0">Eliminar de mis listas</span></button>}
          { !success && !error &&  <div className='flex flex-col items-center justify-center w-full gap-3 mt-5 text-xs sm:gap-0 sm:flex-row sm:text-sm lg:mt-10'>
            <div className='flex items-center justify-center w-full'><button className='p-2 px-5 transition duration-500 bg-purple-700 border-2 border-purple-500 rounded-xl hover:bg-purple-600' onClick={() => handleCerrarPanel(estadoSeleccionado, estadoActual, onEstadoChange, addGameFicha, juego, user, platformDefault, platform, registeredGames, newPosition, setIsLoading, setError, setSuccess, onAvanzar)}>{textoBoton}</button></div>
          </div>}
      </div>
    </div>
  )
}
