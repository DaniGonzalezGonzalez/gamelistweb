import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { UpdateIcon } from "../../../assets/Icons"
import { fetchPlatformImages } from "../../../hooks/useFetchsPlatforms"
import { useHandles } from "../../../hooks/useHandles/useHandles"
import { formatTextAsParagraphs, highlightKeywords } from "../../helpers/Utils/textUtils"
import { cleanTitle, GET_COLOR_CLASS, GET_STATE_BACKGROUND } from "../../helpers/constants/constants"
import { estadoIconos } from "../../helpers/constants/constantsComponents"
import { crearChartOptionsCircular } from "./GameDetailsHelpers/Utils/graficaCircularPorcentajeJuego"
import { EditNotaPanel, EditPlatformPanelFicha, EditEstadoPanel, PanelAddEstadoFicha, EditRejugandoPanel } from "../../helpers/Menus&IndexHelpers/EditsNotaEstadoRejugando/ByFicha"
import { AddButtonFichaOffline, EditButtons, GameInfo, HLTBPrompt, InfoNotaCompleta, MiExperienciaPersonal, MyStats, PlatformsGamesBD, PlatformsJuegos, ResumenJuego, TopImageGameDetail, useHandlesGameDetail  } from "./GameDetailsHelpers"
import { useFetchDataGameDetail, useFetchPlatformImagesGameDetail } from "./UseEffects"
import { prepareData } from "./GameDetailsHelpers/Utils/prepareData"
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { crearChartOptions, graficaHLTBData } from "./GameDetailsHelpers/Utils/graficaHLTBData"
import { ScrollToTopButton } from "../../helpers/Utils/ScrollToTopButton"
import { GameDetailSkeleton } from "../../helpers/Utils/Skeletons/GameDetailSkeleton"
import { ImagesRAWG } from "./GameDetailsHelpers/ImagesRAWG"
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, ChartDataLabels)

export function GameDetail() {
    const [platformImages, setPlatformImages] = useState({})
    const [isExpanded, setIsExpanded] = useState(false)
    const [editModeFechaFinalizacion, setEditModeFechaFinalizacion] = useState(false)
    const [editModeOpinionPersonal, setEditModeOpinionPersonal] = useState(false)
    const [editModeHorasDuracion, setEditModeHorasDuracion] = useState(false)
    const [editModePorcentajeCompletado, setEditModePorcentajeCompletado] = useState(false)
    const [editModePlatino, setEditModePlatino] = useState(false)
    const [nuevoAnio, setNuevoAnio] = useState(2025)
    const [nuevoMes, setNuevoMes] = useState('01')
    const [nuevaOpinionPersonal, setNuevaOpinionPersonal] = useState('')
    const [nuevaHorasDuracion, setNuevaHorasDuracion] = useState(0)
    const [nuevoPorcentajeCompletado, setNuevoPorcentajeCompletado] = useState(0)
    const [nuevoPlatino, setNuevoPlatino] = useState(0)
    const [mostrarHLTB, setMostrarHLTB] = useState(true)

    const { gameId, collection } = useParams()
    const { handleEstadoChange, handleNotaJuegoChange, notaJuego, setNotaJuego, estado, setEstado, opinionPersonal, setOpinionPersonal, rejugando, setRejugando, fechaFinalizacion, setFechaFinalizacion, horasDuracion, setHorasDuracion, porcentajeCompletado, setPorcentajeCompletado, platino, setPlatino, plataforma, setPlataforma, handlePosition, handleRejugandoChange,  setError, selectedPlatforms, handleFechaFinalizacionChange, handleOpinionPersonalChange, handleHorasDuracionChange, handlePorcentajeCompletadoChange, handlePlatinoChange } = useHandles(gameId)    
    const { handleAvanzar, handleEditEstado, handleEstadoSeleccionado, handleFechaGuardada, handleHorasDuracion, handleOpenPanel, handleOpinionPersonal, handlePlatformChange, handlePlatino, handlePorcentajeCompletado, platformSelected, editPlatformPanelOpen, panelAddEstadoFichaOpen, handleOpenEditPlatformPanel, handleCloseRejugandoPanel, handleOpenRejugandoPanel, handleCloseEditEstadoPanel, handleOpenEditEstadoPanel, handleCloseEditPlatformPanel, handleOpenEditNotaPanel, editEstadoPanelOpen, editRejugandoPanelOpen, editNotaPanelOpen, handleCloseEditNotaPanel } = useHandlesGameDetail(gameId)
    // Traemos los useEffect
    const { juego, error, isLoading, gameFromRAWG } = useFetchDataGameDetail(collection, gameId, platformSelected, notaJuego, setNotaJuego, estado, setEstado, opinionPersonal, setOpinionPersonal, rejugando, setRejugando, fechaFinalizacion, setFechaFinalizacion, horasDuracion, setHorasDuracion, porcentajeCompletado, setPorcentajeCompletado, platino, setPlatino, plataforma, setPlataforma)

    useFetchPlatformImagesGameDetail(juego, fetchPlatformImages, setPlatformImages) // Este no sé si es necesario
    
    useEffect(() => {        
    }, [platformSelected])
    
    
    const savedPreviousUrl = sessionStorage.getItem('previousUrl')
    const cleanedPlatform = decodeURIComponent(savedPreviousUrl)
    
    if (isLoading) return <GameDetailSkeleton/>
    
    // Preparamos color de fondo, gráficas, texto, palabras clave e iconos de estado
    const { backgroundClass, chartData, graficaComparativaData, dataGraficaCircular, truncatedText, keywordStyles, estados } = prepareData(juego, horasDuracion, platino, porcentajeCompletado, estadoIconos)
    
    return (
        <div className={`w-full min-h-screen pt-14 sm:pt-10 lg:pt-0 ${backgroundClass} flex flex-col items-center`}>
            {/* Imagen superior con iconos en las esquinas inferiores */}
            <TopImageGameDetail juego={juego} estado={estado} rejugando={rejugando} handleOpenEditEstadoPanel={handleOpenEditEstadoPanel}
            handleOpenPanel={handleOpenPanel} isLoading={isLoading} estados={estados} estadoIconos={estadoIconos} GET_STATE_BACKGROUND={GET_STATE_BACKGROUND} AddButtonFichaOffline={AddButtonFichaOffline} UpdateIcon={UpdateIcon}/>
           
            <div className="w-full px-5 text-white bg-black shadow-lg py-14 lg:py-20">
                <div className="max-w-screen-lg mx-auto text-center">
                    <h1 className="lg:absolute lg:top-[600px] lg:left-[40px] text-2xl font-bold lg:text-4xl">{cleanTitle(juego?.titulo)}</h1>
                    <p className="lg:absolute lg:top-[650px] lg:left-[40px] mt-2 text-xs lg:text-sm">{juego.descripcion}</p>

                    {/* Plataformas: UNA si está añadido y TODAS si no lo está */}
                    { collection==='Juegos' && 
                        <PlatformsJuegos plataforma={juego.plataforma} handleOpenEditPlatformPanel={handleOpenEditPlatformPanel} />
                    }
                    { collection === 'GamesBD' && 
                        <PlatformsGamesBD juego={juego} cleanedPlatform={cleanedPlatform} /> 
                    }

                    
                    {/* Nota personal y de metacritic de usuarios y prensa */}
                    <InfoNotaCompleta estado={estado} notaJuego={notaJuego} juego={juego} GET_COLOR_CLASS={GET_COLOR_CLASS}/>

                    {/* Botones de edición de estado, nota o rejugando */}
                    { estado && 
                        <EditButtons estado={estado} handleOpenEditEstadoPanel={handleOpenEditEstadoPanel} handleOpenEditNotaPanel={handleOpenEditNotaPanel} handleOpenRejugandoPanel={handleOpenRejugandoPanel}/>
                    }

                    <div className="flex flex-col">
                        {/* Mis stats = Gráfica de porcentaje de juego, número de horas y platino (hºppal solo, hª+extra, etc) */}
                        <MyStats estado={estado} platino={platino} porcentajeCompletado={porcentajeCompletado} dataGraficaCircular={dataGraficaCircular} crearChartOptionsCircular={crearChartOptionsCircular} setEditModePorcentajeCompletado={setEditModePorcentajeCompletado} editModePorcentajeCompletado={editModePorcentajeCompletado} nuevoPorcentajeCompletado={nuevoPorcentajeCompletado} setNuevoPorcentajeCompletado={setNuevoPorcentajeCompletado} handlePorcentajeCompletadoChange={handlePorcentajeCompletadoChange} horasDuracion={horasDuracion} setEditModeHorasDuracion={setEditModeHorasDuracion} editModeHorasDuracion={editModeHorasDuracion} nuevaHorasDuracion={nuevaHorasDuracion} setNuevaHorasDuracion={setNuevaHorasDuracion} handleHorasDuracionChange={handleHorasDuracionChange} setEditModePlatino={setEditModePlatino} editModePlatino={editModePlatino} nuevoPlatino={nuevoPlatino} setNuevoPlatino={setNuevoPlatino} handlePlatinoChange={handlePlatinoChange} plataforma={plataforma} error={error} setError={setError} handlePorcentajeCompletado={handlePorcentajeCompletado} handleHorasDuracion={handleHorasDuracion} handlePlatino={handlePlatino}/>
                        {/* HLTB Gráficas */}
                        <HLTBPrompt juego={juego} estado={estado} horasDuracion={horasDuracion} platino={platino} graficaComparativaData={graficaComparativaData} graficaHLTBData={graficaHLTBData} crearChartOptions={crearChartOptions} mostrarHLTB={mostrarHLTB} setMostrarHLTB={setMostrarHLTB} notaJuego={notaJuego}/>
                    </div>
                    
                    {/* Mi experiencia personal */}
                    <MiExperienciaPersonal estado={estado} editModeOpinionPersonal={editModeOpinionPersonal} setEditModeOpinionPersonal={setEditModeOpinionPersonal} editModeFechaFinalizacion={editModeFechaFinalizacion} setEditModeFechaFinalizacion={setEditModeFechaFinalizacion} opinionPersonal={opinionPersonal} notaJuego={notaJuego} fechaFinalizacion={fechaFinalizacion} nuevoMes={nuevoMes} nuevoAnio={nuevoAnio} setNuevoMes={setNuevoMes} setNuevoAnio={setNuevoAnio} handleOpinionPersonal={handleOpinionPersonal} handleOpinionPersonalChange={handleOpinionPersonalChange} error={error} setError={setError} nuevaOpinionPersonal={nuevaOpinionPersonal} setNuevaOpinionPersonal={setNuevaOpinionPersonal} handleFechaFinalizacionChange={handleFechaFinalizacionChange} handleFechaGuardada={handleFechaGuardada}/>
                    
                    <div className="p-0">
                        <ResumenJuego juego={juego} keywordStyles={keywordStyles} formatTextAsParagraphs={formatTextAsParagraphs} highlightKeywords={highlightKeywords} truncatedText={truncatedText} isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>

                        {/* Mostramos la información final */}
                        <GameInfo juego={juego} />
                    </div>  
                    {gameFromRAWG && gameFromRAWG.length > 0 && (
                        <ImagesRAWG gameFromRAWG={gameFromRAWG} />
                    )}
                </div>    
            </div>

            {/* Paneles ocultos de edición de nota, plataforma, estado, rejugando y estadoInicial (al Añadir juego) */}
            {editNotaPanelOpen && <EditNotaPanel onAvanzar={handleCloseEditNotaPanel} onNotaChange={handleNotaJuegoChange} textoBoton='Cerrar' notaActual={juego.notaJuego} onAdded={true}/> }   

            {editPlatformPanelOpen && <EditPlatformPanelFicha onClose={handleCloseEditPlatformPanel} textoBoton='Avanzar' onPlatformChange={handlePlatformChange} onAvanzar={handleEditEstado} onOmitir={true} platformActual={selectedPlatforms} tituloJuego={juego?.titulo} juegoId={gameId} isFromAddFicha={juego.position} collection={collection}/>  } 

            {editEstadoPanelOpen && <EditEstadoPanel onAvanzar={handleCloseEditEstadoPanel} onEstadoChange={handleEstadoChange} textoBoton='Cerrar' id={juego.id} titulo={juego.titulo} tabla={'Juegos'} onAdded={true} estadoActual={juego.estado} onPosition={handlePosition}  /> } 

            {editRejugandoPanelOpen && <EditRejugandoPanel onClose={handleCloseRejugandoPanel} onRejugandoChange={handleRejugandoChange} textoBoton='Cerrar'/> }              

            {panelAddEstadoFichaOpen && (<PanelAddEstadoFicha onEstadoChange={handleEstadoSeleccionado} onPosition={handlePosition} textoBoton="Añadir" titulo={juego.titulo} onAvanzar={handleAvanzar} juego={juego} platform={platformSelected} platformDefault={cleanedPlatform} /> )}
           
            <ScrollToTopButton/>
        </div>        
    )
}