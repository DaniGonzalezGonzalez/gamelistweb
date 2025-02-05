import React, { useRef, useState } from 'react';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useHandleGameSelect, useHandles } from '../../../../../hooks/useHandles'
import { EditEstadoPanelAddGame, EditPlatformPanel } from '../../../../helpers/Menus&IndexHelpers/EditsNotaEstadoRejugando/NotByFicha'
import { getPlataformas, obtenerJuegosCoincidentes } from '../../../../helpers/Utils/useObtenerJuegosCoincidentes'
import { ChooseGameFicha, useAddGameToList } from '../../../AddAndListTemplates/Utils'
import { GameCard } from './CarruselesHelpers/GameCard';
import { handleGameClick } from './CarruselesHelpers/gameHandlers';
import { useFetchJuegos, useFetchJuegosOnGameAdded, useFiltrarJuegos } from './CarruselesUseEffects/useJuegos'
import { useSwiperCarousel } from './CarruselesUseEffects/useSwiper'

export const PersonalizadoJuegosDBCarrusel = ({ nombreCarrusel, añoFiltro, filtrarMayor = false, notaMetacriticPrensaMin, notaMetacriticPrensaMax, notaMetacriticUsuariosMin, notaMetacriticUsuariosMax, genero, añoInicio, añoFin, user, descripcion, titulo, tiempoMainStoryMin, tiempoMainStoryMax, fetchJuegos, juegos, isJuegosLoaded, dataBD }) => {
  const tituloRef = useRef(null)
  const tipoContenidoRef = useRef(null)
  const formRef = useRef()
  const [gameAdded, setGameAdded] = useState(false)
  const [selectedGame, setSelectedGame] = useState(false)

  const [juegosFiltrados, setJuegosFiltrados] = useState([])
  const [showChooseGameFicha, setShowChooseGameFicha] = useState(false);
  const [chooseGameFicha, setChooseGameFicha] = useState([]);
  const { handleGameSelect, setSearchTerm, setIsDropdownOpen } = useHandleGameSelect()
  const { handleOpenEditEstadoPanel, handleCloseEditEstadoPanel, editEstadoPanelOpen, setEditEstadoPanelOpen, editPlatformPanelOpen, setEditPlatformPanelOpen, handlePositionNewGame, handlePlatformChangeNewGame, platform, handleEstadoChangeNewGame, handleNewTitulo } = useHandles(setSearchTerm)
  const { handleSubmit, handleAddGame, handleBack } = useAddGameToList(tituloRef, tipoContenidoRef, setSearchTerm, setIsDropdownOpen, handleCloseEditEstadoPanel, setGameAdded, setEditPlatformPanelOpen, setEditEstadoPanelOpen)
  const { handleInfoGameBD, handleTitleClick } = useHandles()

  useFetchJuegos(isJuegosLoaded, fetchJuegos)
  useFiltrarJuegos({isJuegosLoaded, juegos, añoFiltro, filtrarMayor, añoInicio, añoFin, notaMetacriticPrensaMax, notaMetacriticPrensaMin, notaMetacriticUsuariosMax, notaMetacriticUsuariosMin, genero, descripcion, titulo, tiempoMainStoryMin, tiempoMainStoryMax, gameAdded, setJuegosFiltrados});
  useFetchJuegosOnGameAdded(gameAdded, fetchJuegos)
  useSwiperCarousel(juegosFiltrados)
  
  const onGameClick = (game) => {
    handleGameClick( setSelectedGame, handleGameSelect, setEditPlatformPanelOpen, game )
  }
  
  return (
    <>
      <div className="max-w-full h-full pt-2 pb-0 px-4 sm:px-0 overflow-hidden swiper-container lg:pb-8 lg:pt-0 sm:ml-20 lg:pl-1 lg:ml-[82px] lg:pr-20 sm:pr-14">
        <h2 className="pl-2 mt-4 mb-2 text-base text-white lg:pl-1 sm:pl-0 text-start lg:text-xl">{nombreCarrusel}</h2>
        <div className="pl-2 sm:pl-4 xl:pl-0 swiper-wrapper">
          {juegosFiltrados.map((juego, index) => {
            const juegosCoincidentes = obtenerJuegosCoincidentes(juego, dataBD)
            const plataformas = getPlataformas(juegosCoincidentes)
            const estaAñadido = juegosCoincidentes.length > 0
 
            return (
              <div key={`${juego.titulo}-${index}`} className="swiper-slide">
                <GameCard juego={juego} juegosCoincidentes={juegosCoincidentes} setChooseGameFicha={setChooseGameFicha} setShowChooseGameFicha={setShowChooseGameFicha} handleTitleClick={handleTitleClick} handleInfoGameBD={handleInfoGameBD}onGameClick={onGameClick} dataBD={dataBD} plataformas={plataformas} estaAñadido={estaAñadido} />
                <div className="text-start">
                  <h3 className="pt-2 pl-1 text-xs text-gray-200">{juego.titulo}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {showChooseGameFicha && (
        <ChooseGameFicha game={chooseGameFicha} onSelect={(id) => { handleTitleClick(id); setShowChooseGameFicha(false); }} onClose={() => setShowChooseGameFicha(false)} />
      )}

      {editEstadoPanelOpen && <EditEstadoPanelAddGame onClose={handleCloseEditEstadoPanel}  onEstadoChange={handleEstadoChangeNewGame} onAvanzar={handleAddGame} onPosition={handlePositionNewGame} onNewTitulo={handleNewTitulo} titulo={selectedGame?.titulo}  formRef={formRef} handleSubmit={handleSubmit} textoBoton='Avanzar' platform={platform} juego={selectedGame??'No hay juegos añadidos'}/> } 

      {editPlatformPanelOpen && <EditPlatformPanel onClose={handleBack} textoBoton='Avanzar' onPlatformChange={handlePlatformChangeNewGame} onAvanzar={handleOpenEditEstadoPanel} onOmitir={true} platformActual={selectedGame?.plataforma} tituloJuego={selectedGame?.titulo} onAdded={false} collection={'GamesBD'} juegoId={selectedGame?.id} /> }   
    </>
  )
}
