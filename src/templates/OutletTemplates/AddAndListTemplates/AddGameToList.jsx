import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { UserContext } from "../../../context/UserContext"
import { useFilteredGames, useMessageEffect, useRandomImageEffect } from "./UseEffects"
import { useHandleGameSelect, useHandles } from "../../../hooks/useHandles"
import { getPlatformImage, scrollToTop, totalTiempoMainStory } from "../../helpers/constants/constants"
import { useDebounce } from "../../helpers/constants/constantsComponents"
import { EditEstadoPanelAddGame, EditPlatformPanel } from "../../helpers/Menus&IndexHelpers/EditsNotaEstadoRejugando/NotByFicha"
import { AddGameListHeader, FoundRecentGameMessageAndDisplay, HiddenTipoContenidoSelect, SearchGamesBar  } from "./AddAndListHelpers"
import { useAddGameToList } from "./Utils/useAddGameToList"
import { ScrollToTopButton } from "../../helpers/Utils/ScrollToTopButton"
import { useGetData } from "../../../hooks/useGetData"

export function AddGameToList() {  
  const tituloRef = useRef(null)
  const tipoContenidoRef = useRef(null)
  const formRef = useRef()
  const [filteredGames, setFilteredGames] = useState([])
  const [gameAdded, setGameAdded] = useState(false)

  // const filters = [{ field: 'plataforma', value: 'PS3' }]
  // const { gamesBDComplete } = useGetData('', filters)
 // ⏳ Cargar datos desde localStorage al inicio
 const gamesBDStored = useMemo(() => {
  return JSON.parse(localStorage.getItem("gamesBD")) || [];
}, []);

// 🚀 Si no hay datos en localStorage, cargar desde Supabase
const { gamesBDComplete } = useGetData("", []);

// 🛠️ Usar los datos correctos
const gamesToShow = gamesBDStored.length > 0 ? gamesBDStored : gamesBDComplete;
  
  const { handleGameSelect, searchTerm, setSearchTerm, setIsDropdownOpen, setIsTitleValid, selectedTitle } = useHandleGameSelect()
  const { user } = useContext(UserContext)
  const { handleOpenEditEstadoPanel, handleCloseEditEstadoPanel, editEstadoPanelOpen, setEditEstadoPanelOpen, editPlatformPanelOpen, setEditPlatformPanelOpen, handleOpenEditPlatformPanel, handlePositionNewGame, handlePlatformChangeNewGame, platform, setPlatform, handleEstadoChangeNewGame, handleNewTitulo } = useHandles(setSearchTerm)
  const { handleSubmit, success, error, isLoading, handleInputChange, handleAddGame, handleBack } = useAddGameToList(tituloRef, tipoContenidoRef, setSearchTerm, setIsDropdownOpen, handleCloseEditEstadoPanel, setGameAdded, setEditPlatformPanelOpen, setEditEstadoPanelOpen)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)


  // Ejecutamos los useEffect obtenidos de ficheros externos
  const { recentGames, selectedImage } = useRandomImageEffect(gamesToShow)
  const showMessage = useMessageEffect(success, error, setSearchTerm)
  useFilteredGames({ gameAdded, setSearchTerm, setPlatform, setGameAdded, debouncedSearchTerm, games: gamesToShow, selectedTitle, setFilteredGames, setIsTitleValid, getPlatformImage })
  const selectedGame = filteredGames.find((game) => game.titulo === selectedTitle)

  return (
    <>
        { user.id &&
            <div className="flex flex-col items-start justify-start min-h-screen bg-slate-950">
                <div className="flex flex-col items-start justify-between w-full">
                <AddGameListHeader selectedImage={selectedImage} games={gamesToShow} totalTiempoMainStory={totalTiempoMainStory} tituloRef={tituloRef} scrollToTop={scrollToTop}/>

                  <div  className="flex flex-col items-center w-full">
                    <div className="flex flex-col items-center justify-center w-full px-4 sm:px-10 sm:mt-10">
                      <div className="flex flex-col items-center justify-between w-full gap-3 sm:gap-3">
                        {/* Div oculto con la info del nombre de la colección destino => Importante (de momento) */}
                        <HiddenTipoContenidoSelect tipoContenidoRef={tipoContenidoRef} />

                        {/* Barra de búsqueda de juego */}
                        <SearchGamesBar searchTerm={searchTerm} platform={platform} tituloRef={tituloRef} handleInputChange={handleInputChange} setSearchTerm={setSearchTerm}/>
                        
                        {/* Juegos encontrados, recientes y mensaje de éxito o error */}
                        <FoundRecentGameMessageAndDisplay showMessage={showMessage} error={error} success={success} isLoading={isLoading} debouncedSearchTerm={debouncedSearchTerm} filteredGames={filteredGames} recentGames={recentGames} handleGameSelect={handleGameSelect}  handleOpenEditPlatformPanel={handleOpenEditPlatformPanel} user={user} />
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
