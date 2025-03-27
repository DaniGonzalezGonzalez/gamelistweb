import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { UserContext } from "../../../context/UserContext"
import { useGetData } from "../../../hooks/useGetData"
import { useFilteredGames } from "./UseEffects"
import { useHandleGameSelect, useHandles } from "../../../hooks/useHandles"
import { getPlatformImage } from "../../helpers/constants/constants"
import { useDebounce } from "../../helpers/constants/constantsComponents"
import { EditEstadoPanelAddGame, EditPlatformPanel } from "../../helpers/Menus&IndexHelpers/EditsNotaEstadoRejugando/NotByFicha"
import { HiddenTipoContenidoSelect  } from "./AddAndListHelpers"
import { useAddGameToList } from "./Utils/useAddGameToList"
import { ScrollToTopButton } from "../../helpers/Utils/ScrollToTopButton"
import { FoundRandomGames } from "./Utils/FoundRandomGames"

export function AddRandomGameToList() {  
  const tituloRef = useRef(null)
  const tipoContenidoRef = useRef(null)
  const formRef = useRef()
  const [filteredGames, setFilteredGames] = useState([])
  const [gameAdded, setGameAdded] = useState(false)

  // const filters = [{ field: 'plataforma', value: 'PS3' }]
  // const { gamesBDComplete } = useGetData('', filters)
  const gamesBDStored = useMemo(() => {
    return JSON.parse(localStorage.getItem("gamesBD")) || [];
  }, [])
  const { handleGameSelect, searchTerm, setSearchTerm, setIsDropdownOpen, setIsTitleValid, selectedTitle } = useHandleGameSelect()
  const { user } = useContext(UserContext)
  const { handleOpenEditEstadoPanel, handleCloseEditEstadoPanel, editEstadoPanelOpen, setEditEstadoPanelOpen, editPlatformPanelOpen, setEditPlatformPanelOpen, handleOpenEditPlatformPanel, handlePositionNewGame, handlePlatformChangeNewGame, platform, setPlatform, handleEstadoChangeNewGame, handleNewTitulo } = useHandles(setSearchTerm)
  const { handleSubmit, handleAddGame, handleBack } = useAddGameToList(tituloRef, tipoContenidoRef, setSearchTerm, setIsDropdownOpen, handleCloseEditEstadoPanel, setGameAdded, setEditPlatformPanelOpen, setEditEstadoPanelOpen)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Ejecutamos los useEffect obtenidos de ficheros externos
  useFilteredGames({ gameAdded, setSearchTerm, setPlatform, setGameAdded, debouncedSearchTerm, games: gamesBDStored, selectedTitle, setFilteredGames, setIsTitleValid, getPlatformImage })
  const selectedGame = filteredGames.find((game) => game.titulo === selectedTitle)

  const [randomGameId, setRandomGameId] = useState(null);
  const [randomGame, setRandomGame] = useState(null);
  const savedPreviousUrl = sessionStorage.getItem('previousUrl')
  const cleanedPlatform = decodeURIComponent(savedPreviousUrl)

  const handleGenerateRandomGame = () => {
    if (gamesBDStored.length === 0) return;

    let filteredGames = gamesBDStored;

    if (cleanedPlatform !== 'null') {
      filteredGames = gamesBDStored.filter(game => 
        game.plataforma.split(' - ').map(p => p.trim()).includes(cleanedPlatform)
        );
    }

    if (filteredGames.length === 0) return; // Si no hay juegos que coincidan, salir.

    const randomIndex = Math.floor(Math.random() * filteredGames.length);
    const randomGame = filteredGames[randomIndex];

    setRandomGameId(randomGame.id);
};
  
  useEffect(() => {
      if (randomGameId) {
          const foundGame = gamesBDStored.find(game => game.id === randomGameId);
          setRandomGame(foundGame || null);
      }
  }, [randomGameId, gamesBDStored]);
  

  return (
    <>
        { user.id &&
            <div className="flex flex-col items-start justify-start min-h-screen bg-slate-950">
              {/* Imagen de fondo con gradiente */}
              <div className="absolute inset-0 bg-center bg-cover opacity-50" style={{ backgroundImage: `url(/wallpaperImages/Super-Mario-wallpaper.webp)`, }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"/>
              </div>
                <div className="flex flex-col items-start justify-between w-full"> 
                  <div  className="flex flex-col items-center w-full">
                    <div className="flex flex-col items-center justify-center w-full px-4 sm:px-10 sm:mt-10">
                      <div className="relative z-10 flex flex-col items-center justify-between w-full gap-3 sm:gap-3">
                        {/* Div oculto con la info del nombre de la colección destino => Importante (de momento) */}
                        <HiddenTipoContenidoSelect tipoContenidoRef={tipoContenidoRef} />
 
                        {randomGame ? (
                          <div className="flex flex-col items-center justify-center h-screen">
                            <FoundRandomGames
                              filteredGames={[randomGame]} // Pasamos el juego encontrado en un array
                              handleGameSelect={handleGameSelect}
                              onAvanzar={handleOpenEditPlatformPanel}
                              setEditEstadoPanelOpen={setEditEstadoPanelOpen}
                              user={user}
                            />
                            <button 
                              onClick={handleGenerateRandomGame} 
                              className="px-4 py-2 mt-10 text-sm font-semibold text-white transition-all duration-300 bg-red-600 rounded-lg shadow-md hover:bg-red-700 hover:scale-105"
                            >
                              🔄 Probar otro juego
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center min-h-screen">
                            <button
                              onClick={handleGenerateRandomGame}
                              className="flex flex-col items-center justify-center w-full max-w-md p-6 text-center text-white transition duration-500 bg-gray-900 shadow-lg rounded-xl hover:scale-102 hover:shadow-lg"
                            >
                              <img
                                src="/Random-game-image.webp"
                                alt="Juego misterioso"
                                className="object-cover w-full h-full mb-4 rounded-lg"
                              />
                              <p className="text-sm text-gray-300">¡Haz clic en la imagen para descubrir un juego aleatorio!</p>
                            </button>
                          </div>
                        )}

                      </div>             
                    </div>
                  </div>
                </div>

                {/* Paneles ocultos de elección de plataforma o estado para juegos a Añadir */}
                {editPlatformPanelOpen && <EditPlatformPanel onClose={handleBack} textoBoton='Avanzar' onPlatformChange={handlePlatformChangeNewGame} onAvanzar={handleOpenEditEstadoPanel} onOmitir={true} platformActual={selectedGame?.plataforma} tituloJuego={selectedGame?.titulo} onAdded={false} collection={'GamesBD'} juegoId={selectedGame?.id} />  }   
         
                {editEstadoPanelOpen && <EditEstadoPanelAddGame onClose={handleCloseEditEstadoPanel}  onEstadoChange={handleEstadoChangeNewGame} onAvanzar={handleAddGame} onPosition={handlePositionNewGame} onNewTitulo={handleNewTitulo} titulo={selectedGame?.titulo}  formRef={formRef} handleSubmit={handleSubmit} textoBoton='Avanzar' platform={platform} juego={selectedGame??'No hay juegos añadidos'}/> } 
                
                <ScrollToTopButton/>
            </div>
        }
    </>
  )
}
