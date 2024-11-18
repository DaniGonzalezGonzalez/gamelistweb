import { useContext, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"
import { useGetData } from "../../../hooks/useGetData"
import { useHandleGameSelect, useHandles } from "../../../hooks/useHandles"
import { getPlatformBackground, getPlatformImage,  scrollToTop,  totalTiempoMainStory } from "../../helpers/constants/constants"
import { useDebounce } from "../../helpers/constants/constantsComponents"
import { EditEstadoPanelAddGame } from "../../helpers/Menus&IndexHelpers/EditsNotaEstadoRejugando/NotByFicha/EditEstadoPanelAddGame"
import { useAddGameToList } from "./Utils/useAddGameToList"
import { useFilteredGames, useMessageEffect, useRandomImageEffect } from "./UseEffects"
import { AddGameListHeader, FoundRecentGameMessageAndDisplay, HiddenTipoContenidoSelect, SearchGamesBar } from "./AddAndListHelpers"
import { ScrollToTopButton } from "../../helpers/Utils/ScrollToTopButton"

export function AddGameToListByPlatform() {
  const tituloRef = useRef(null)
  const tipoContenidoRef = useRef(null)
  const formRef = useRef()
  const { platform } = useParams()
  const [filteredGames, setFilteredGames] = useState([])
  const [gameAdded, setGameAdded] = useState(false)
  const [plataformaParaTitulo, setPlatform] = useState(platform)
 
  const filters = [{ field: 'plataforma', value: platform }]
  
  const { gamesBDByPlatform } = useGetData(platform, filters)
  const { handleGameSelect, searchTerm, setSearchTerm, setIsDropdownOpen, setIsTitleValid, selectedTitle} = useHandleGameSelect()
  const { user } = useContext(UserContext)
  const { handleCloseEditEstadoPanel, editEstadoPanelOpen, setEditEstadoPanelOpen, handleEstadoChangeNewGame, handlePositionNewGame, handleNewTitulo } = useHandles(setSearchTerm)
  const { handleSubmit, success, error, isLoading, handleInputChange, handleAddGame } = useAddGameToList(tituloRef, tipoContenidoRef, setSearchTerm, setIsDropdownOpen, handleCloseEditEstadoPanel, setGameAdded)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { recentGames, selectedImage } = useRandomImageEffect(gamesBDByPlatform)
  const showMessage = useMessageEffect(success, error, setSearchTerm)
  useFilteredGames({ gameAdded, setSearchTerm, setPlatform, setGameAdded, debouncedSearchTerm, games: gamesBDByPlatform, selectedTitle, setFilteredGames, setIsTitleValid, getPlatformImage })
   
  return (
    <>
        { user.id &&
            <div className="flex flex-col items-start justify-start min-h-screen bg-slate-950">
                <div className="flex flex-col items-center justify-between w-full">
                <AddGameListHeader selectedImage={selectedImage} games={gamesBDByPlatform} totalTiempoMainStory={totalTiempoMainStory} tituloRef={tituloRef} scrollToTop={scrollToTop} platform={platform} getPlatformBackground={getPlatformBackground}/>
          
                  <div className="flex flex-col items-center w-full" >
                    <div className="flex flex-col items-center justify-center w-full px-10 sm:mt-10">
                      <div className="flex flex-col items-center justify-between w-full gap-3 sm:gap-3">
                        {/* Div oculto con la info del nombre de la colección destino => Importante (de momento) */}
                        <HiddenTipoContenidoSelect tipoContenidoRef={tipoContenidoRef} />
          
                        {/* Barra de búsqueda de juego */}
                        <SearchGamesBar searchTerm={searchTerm} platform={platform} tituloRef={tituloRef} handleInputChange={handleInputChange} setSearchTerm={setSearchTerm} isPlatformSearch={true}/>
        
                        {/* Juegos encontrados, recientes y mensaje de éxito o error */}
                        <FoundRecentGameMessageAndDisplay showMessage={showMessage} error={error} success={success} isLoading={isLoading} debouncedSearchTerm={debouncedSearchTerm} filteredGames={filteredGames} recentGames={recentGames} handleGameSelect={handleGameSelect}  setEditEstadoPanelOpen={setEditEstadoPanelOpen} byPlatform="SI"/>
                        </div>             
                      </div>
                  </div>
                </div>    

                {/* Paneles ocultos de elección de plataforma o estado para juegos a Añadir */}
                {editEstadoPanelOpen && <EditEstadoPanelAddGame onAvanzar={handleAddGame} onEstadoChange={handleEstadoChangeNewGame} onPosition={handlePositionNewGame} textoBoton='Avanzar' onNewTitulo={handleNewTitulo} formRef={formRef} handleSubmit={handleSubmit} titulo={filteredGames[0]?.titulo} platform={platform}  juego={filteredGames[0]}/> } 

                <ScrollToTopButton/>
            </div>
        }
    </>
  )
}
