import React from 'react'

export const TopImageGameDetail = ({ 
  juego, 
  estado, 
  rejugando, 
  handleOpenEditEstadoPanel, 
  handleOpenPanel, 
  isLoading, 
  estados, 
  estadoIconos, 
  GET_STATE_BACKGROUND, 
  AddButtonFichaOffline, 
  UpdateIcon 
}) => {
  return (
    <div className="relative z-10 flex justify-center w-full top-10">
      <div className="relative">
        <img 
          src={juego.imageUrl ?? juego.url[0]} 
          alt={juego.titulo} 
          className="object-cover w-48 h-48 transition duration-300 ease-in-out transform rounded-lg shadow-lg lg:h-60 lg:w-80"
        />

        {/* Indicador de Rejugando */}
        {(estado === 'Jugando' || estado === 'Completando') && (
          <div title={rejugando === 'SI' ? 'Rejugando' : 'No rejugándolo'} className="absolute rounded-lg shadow-lg bottom-2 left-2">
            {rejugando === 'SI' 
              ? <div className="p-1 text-white bg-green-600 rounded-full"><UpdateIcon w={4} h={4} /></div>
              : <div className="p-1 bg-gray-600 rounded-full opacity-55"><UpdateIcon w={4} h={4} /></div>
            }
          </div>
        )}

        {/* Panel de edición de estado */}
        {estado && (
          <button 
            onClick={handleOpenEditEstadoPanel} 
            className="flex flex-col items-center justify-center gap-3 mt-6 text-[9px] lg:text-[11px] absolute bottom-2 right-2 text-white"
          >
            <div className={`${GET_STATE_BACKGROUND(estado)} px-1.5 py-1 lg:px-2 lg:py-1 lg:rounded-lg rounded-lg flex items-center`}>
              <p className="lg:mr-1.5 mr-1">{estado}</p>
              {estados.map(option => (
                <div key={option}>{option === estado && estadoIconos[option]}</div>
              ))}
            </div>
          </button>
        )}

        {/* Botón de añadir juegos */}
        {!estado && (
          <AddButtonFichaOffline 
            handleOpenPanel={handleOpenPanel} 
            isLoading={isLoading} 
            juego={juego} 
            estado={estado} 
            estados={estados} 
            estadoIconos={estadoIconos} 
          />
        )}
      </div>
    </div>
  )
}

