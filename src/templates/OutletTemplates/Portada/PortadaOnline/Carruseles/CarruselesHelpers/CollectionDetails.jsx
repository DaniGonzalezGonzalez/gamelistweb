import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../../../../../context/UserContext'
import { useHandleGameSelect, useHandles } from '../../../../../../hooks/useHandles'
import { cleanTitle } from '../../../../../helpers/constants/constants'
import { EditEstadoPanelAddGame, EditPlatformPanel } from '../../../../../helpers/Menus&IndexHelpers/EditsNotaEstadoRejugando/NotByFicha'
import { getPlataformas, obtenerJuegosCoincidentes } from '../../../../../helpers/Utils/useObtenerJuegosCoincidentes'
import { ChooseGameFicha, useAddGameToList, useDataGameListComplete } from '../../../../AddAndListTemplates/Utils'
import { fetchGames } from '../../../../AddAndListTemplates/Utils/FetchGames'
import { handleGameClick } from './gameHandlers'
import { useIsMobile } from '../CarruselesUseEffects'
import { DesktopCollectionInfo, filterGames, GameSwiper, MobileCollectionInfo, NonMobileCollectionImage } from './CollectionDetailsHelpers'

export function CollectionDetails() {  
  const tituloRef = useRef(null)
  const tipoContenidoRef = useRef(null)
  const formRef = useRef()
  const { filterType, filterValue } = useParams()
  const [juegos, setJuegos] = useState([])
  const [isJuegosLoaded, setIsJuegosLoaded] = useState(false)
  const [dataBD, setDataBD] = useState([])
  const [noGamesLoaded, setNoGamesLoaded] = useState(false)
  const [chooseGameFicha, setChooseGameFicha] = useState([])
  const [showChooseGameFicha, setShowChooseGameFicha] = useState(false)
  const [selectedGame, setSelectedGame] = useState(false)
  const [gameAdded, setGameAdded] = useState(false)
  const [src, setSrc] = useState(`/collectionIcons/${filterValue.replace(/\s+/g, '-').trim()}-icon.webp`)
  const { handleGameSelect, setSearchTerm, setIsDropdownOpen } = useHandleGameSelect()
  
  const { handleInfoGameBD, handleTitleClick, handleOpenEditEstadoPanel, handleCloseEditEstadoPanel, editEstadoPanelOpen, setEditEstadoPanelOpen, editPlatformPanelOpen, setEditPlatformPanelOpen, handlePositionNewGame, handlePlatformChangeNewGame, platform,  handleEstadoChangeNewGame, handleNewTitulo, setError } = useHandles(setSearchTerm)
  const { handleSubmit, handleAddGame, handleBack } = useAddGameToList(tituloRef, tipoContenidoRef, setSearchTerm, setIsDropdownOpen, handleCloseEditEstadoPanel, setGameAdded, setEditPlatformPanelOpen, setEditEstadoPanelOpen)
  
  useAddGameToList(setEditPlatformPanelOpen)
  const { user } = useContext(UserContext)
  
  const fetchJuegos = fetchGames(setJuegos, setIsJuegosLoaded, 'GamesBD')
  const { fetchData } = useDataGameListComplete({ dataBD, setDataBD, setError, setNoGamesLoaded, sortBy:'titulo', sortDirection:'', user, itemsToShow:'', setItemsToShow:'', searchTerm:'', navigate:'' })
  const filteredGames = filterGames(juegos, filterType, filterValue)

  // UseEffect aquí e importados
  useEffect(() => { fetchData() }, [])
  useEffect(() => { fetchJuegos() }, [])
  // useSwiperCollectionCarousel(filteredGames)
  const isMobile = useIsMobile()
    
  const onGameClick = (game) => {
    handleGameClick( setSelectedGame, handleGameSelect, setEditPlatformPanelOpen, game )
  }
  
  const handleError = () => {
    // Cambia a SVG si falla la carga de WebP
    setSrc(`/collectionIcons/${filterValue.replace(/\s+/g, '-').trim()}-icon.svg`)
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-black">
      {/* Imagen de fondo con gradiente */}
      <div className="absolute inset-0 bg-center bg-cover opacity-50" style={{ backgroundImage: `url(/wallpaperImages/${filterValue.replace(/\s+/g, '-').trim()}-wallpaper.webp)`, }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"/>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 pt-5 sm:pt-6 lg:ml-14 lg:pt-12">
        <MobileCollectionInfo isMobile={isMobile} src={src} handleError={handleError} filterValue={filterValue} filteredGames={filteredGames} />
        <div className='flex items-center justify-between gap-5 px-5'>
          <NonMobileCollectionImage isMobile={isMobile} src={src} handleError={handleError} filterValue={filterValue} />
          <DesktopCollectionInfo isMobile={isMobile} filterValue={filterValue} filteredGames={filteredGames} />
        </div>

        {/* Swiper carrusel */}
        <GameSwiper filteredGames={filteredGames} obtenerJuegosCoincidentes={obtenerJuegosCoincidentes} dataBD={dataBD} getPlataformas={getPlataformas} setChooseGameFicha={setChooseGameFicha} setShowChooseGameFicha={setShowChooseGameFicha} handleTitleClick={handleTitleClick} handleInfoGameBD={handleInfoGameBD} onGameClick={onGameClick} cleanTitle={cleanTitle} />


        { showChooseGameFicha && (
        <ChooseGameFicha game={chooseGameFicha} onSelect={(id) => { handleTitleClick(id);  setShowChooseGameFicha(false); }} onClose={() => setShowChooseGameFicha(false)} />
        )}
        {/* Paneles ocultos de elección de plataforma o estado para juegos a Añadir */}
        {editPlatformPanelOpen && <EditPlatformPanel onClose={handleBack} textoBoton='Avanzar' onPlatformChange={handlePlatformChangeNewGame} onAvanzar={handleOpenEditEstadoPanel} onOmitir={true} platformActual={selectedGame?.plataforma} tituloJuego={selectedGame?.titulo} onAdded={false} collection={'GamesBD'} juegoId={selectedGame?.id} />  }   
        
        {editEstadoPanelOpen && <EditEstadoPanelAddGame onClose={handleCloseEditEstadoPanel} onEstadoChange={handleEstadoChangeNewGame} onAvanzar={handleAddGame} onPosition={handlePositionNewGame} onNewTitulo={handleNewTitulo} titulo={selectedGame?.titulo} formRef={formRef} handleSubmit={handleSubmit} textoBoton='Avanzar' platform={platform} juego={selectedGame??'No hay juegos añadidos'}/> } 
      </div>
    </div>    
    )
  }