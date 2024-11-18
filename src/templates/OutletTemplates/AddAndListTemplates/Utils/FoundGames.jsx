/* eslint-disable react/prop-types */
import { PlusIcon } from "../../../../assets/Icons"
import { useHandles } from "../../../../hooks/useHandles"
import { cleanTitle } from "../../../helpers/constants/constants"

// FoundGames.js
export function FoundGames({ filteredGames, handleGameSelect, setEditNotaPanelOpen, byPlatform, setEditEstadoPanelOpen, onAvanzar }) {
  const { handleInfoGameBD } = useHandles()

  const handleGameClick = (game) => {
    handleGameSelect(
      game.titulo, 
      game.url[0], 
      game.plataforma, 
      game.descripcion, 
      game.notaMetacriticPrensa, 
      game.notaMetacriticUsuarios, 
      game.tiempoMainStory, 
      game.tiempoMainAndSides, 
      game.tiempoCompletionist, 
      game.linkMetacritic, 
      game.linkHowLongToBeat,
      game.datosExtraJuego, 
      game.genero, 
      game.lanzamiento, 
    )

    // Llama a las funciones según la lógica deseada
    if (setEditEstadoPanelOpen) {
      setEditEstadoPanelOpen(true)
    }
    
    if (onAvanzar) {
      onAvanzar(game.plataforma)
    }
  }


  return (
    <>
      <h2 className="w-full mt-3 text-lg font-bold text-white lg:mt-4 lg:w-5/6">Juegos encontrados</h2>
      <ul className="grid w-full grid-cols-2 gap-4 pt-4 mb-6 text-xs text-white border-t border-gray-700 lg:mt-2 lg:w-5/6 sm:mb-10 2xl:grid-cols-9 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
        {filteredGames.map((game) => (
            <li key={game.titulo}>
              <div className="flex flex-col items-start justify-center gap-1 duration-500 xl:px-2 sm:flex opacity-95 hover:opacity-100">
                <div className="relative flex items-center justify-center gap-3 border-2 border-transparent shadow-md sm:flex hover:rounded-lg hover:border-2 hover:border-gradient">
                  <button type="button" onClick={() => handleInfoGameBD(game.id)}>
                    <img className="object-cover w-full h-32 rounded-lg sm:h-32" src={game?.url[0] ?? game?.imageUrl} alt="No hay imagen"/>
                  </button>
                  <button type="button" className="absolute flex items-center justify-center object-contain gap-1 p-0.5 pr-1 bg-gray-600 rounded-lg shadow lg:left-2 left-1 bottom-2 shadow-black hover:bg-green-500"
                    onClick={(e) => { e.stopPropagation(); handleGameClick(game); }}
                  >
                    <PlusIcon w={4} h={4} /> Añadir
                  </button>
                </div>
                <p className="pt-3 text-start">{cleanTitle(game?.titulo)}</p>
                <p className="pt-2 font-bold text-start">{game.descripcion}</p>
              </div>
            </li>
          ))
        }
      </ul>
    </>
  )
}
