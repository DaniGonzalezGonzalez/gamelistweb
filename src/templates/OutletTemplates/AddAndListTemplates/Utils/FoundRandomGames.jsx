/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useHandles } from "../../../../hooks/useHandles"
import { cleanTitle } from "../../../helpers/constants/constants"
import { getPlataformas, obtenerJuegosCoincidentes } from "../../../helpers/Utils/useObtenerJuegosCoincidentes"
import { ButtonAddOrAdded, ChooseGameFicha } from "."
import { useDataGameListComplete } from "./useDataGameListComplete"

export function FoundRandomGames({ filteredGames, handleGameSelect, setEditNotaPanelOpen, byPlatform, setEditEstadoPanelOpen, onAvanzar, user }) {
  const [dataBD, setDataBD] = useState([])
  const [noGamesLoaded, setNoGamesLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [showChooseGameFicha, setShowChooseGameFicha] = useState(false)
  const [chooseGameFicha, setChooseGameFicha] = useState([])

  const { handleInfoGameBD, handleTitleClick } = useHandles()
  const { fetchData } = useDataGameListComplete({ dataBD, setDataBD, setError, setNoGamesLoaded, sortBy:'titulo', sortDirection:'', user, itemsToShow:'', setItemsToShow:'', searchTerm:'', navigate:'' })

  useEffect(() => { fetchData() }, [])

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

    if (setEditEstadoPanelOpen) {
      setEditEstadoPanelOpen(true)
    }
    
    if (onAvanzar) {
      onAvanzar(game.plataforma)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-full text-white">
      {/* <h2 className="mb-6 text-2xl font-bold">🎁 ¡Juego Sorpresa! 🎁</h2> */}
      <ul className="flex flex-col items-center">
        {filteredGames.map((game) => {
          const juegosCoincidentes = obtenerJuegosCoincidentes(game, dataBD);
          const plataformas = getPlataformas(juegosCoincidentes);
          const estaAñadido = juegosCoincidentes.length > 0;

          return (
            <li key={game.titulo} className="flex flex-col items-center gap-4">
              <div className="relative flex flex-col items-center transition-all border-2 border-transparent rounded-2xl hover:border-white">
                <button
                  type="button"
                  onClick={() => {
                    if (juegosCoincidentes.length > 1) {
                      setChooseGameFicha(juegosCoincidentes);
                      setShowChooseGameFicha(true);
                    } else if (juegosCoincidentes.length === 1) {
                      handleTitleClick(juegosCoincidentes[0].id);
                    } else {
                      handleInfoGameBD(game.id);
                    }
                  }}
                >
                  <img
                    className="object-cover w-64 h-64 xl:w-[600px] xl:h-[400px] rounded-xl"
                    src={game?.url[0] ?? game?.imageUrl}
                    alt="No hay imagen"
                  />
                </button>
                <div>
                  <ButtonAddOrAdded
                    handleGameClick={handleGameClick}
                    game={game}
                    dataBD={dataBD}
                    juegosCoincidentes={juegosCoincidentes}
                    plataformas={plataformas}
                    estaAñadido={estaAñadido}
                  />
                </div>
              </div>
              <p className="text-lg font-semibold text-center">{cleanTitle(game?.titulo)}</p>
              <p className="text-center text-gray-300">{game.descripcion}</p>
            </li>
          );
        })}
      </ul>
      {showChooseGameFicha && (
        <ChooseGameFicha
          game={chooseGameFicha}
          onSelect={(id) => {
            handleTitleClick(id);
            setShowChooseGameFicha(false);
          }}
          onClose={() => setShowChooseGameFicha(false)}
        />
      )}
    </div>
  );
}

