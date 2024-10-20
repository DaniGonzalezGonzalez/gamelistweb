import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { getDocument } from "../../../api/supabase/cloud-supabase"
import { ArrowRight, EditIcon, PlusIcon, UpdateIcon } from "../../../assets/Icons"
import { fetchPlatformImages } from "../../../hooks/useFetchsPlatforms"
import { useHandles } from "../../../hooks/useHandles/useHandles"
import { formatTextAsParagraphs, highlightKeywords } from "../../helpers/components/Utils/textUtils"
import { HomePageSkeleton } from "../../helpers/components/Menus&IndexHelpers/Skeletons/HomePageSkeleton"
import { cleanTitle, GET_COLOR_CLASS, getPlatformBackground, GET_STATE_BACKGROUND } from "../../helpers/no-components/constants"
import { ScrollToTopButton } from "../../helpers/components/Menus&IndexHelpers/ScrollToTopButton"
import { chartOptions, graficaHLTBData } from "../../helpers/no-components/graficaHLTBData"
import { EditEstadoPanel, EditNotaPanel, EditRejugandoPanel } from "../../helpers/components/Menus&IndexHelpers/EditsNotaEstadoRejugando"
import { estadoIconos } from "../../helpers/no-components/constantsComponents"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function GameBDDetail() {
    const [juego, setJuego] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [platformImages, setPlatformImages] = useState({})
    const [isExpanded, setIsExpanded] = useState(false)
    const { gameId, collection } = useParams()
    const { handleOpenEditNotaPanel, handleCloseEditNotaPanel, editNotaPanelOpen, handleCloseEditEstadoPanel, editEstadoPanelOpen, handleOpenEditEstadoPanel, handleCloseRejugandoPanel, handleOpenRejugandoPanel, editRejugandoPanelOpen, handleEstadoChange, handleNotaJuegoChange, handlePosition, handleRejugandoChange, estado, notaJuego, rejugando, position, setEstado, setNotaJuego, setPosition, setRejugando, error, setError } = useHandles(gameId)

    useEffect(() => {
        if (gameId) {
            const fetchData = async () => {
                try {
                    const datosJuego = await getDocument(collection, gameId)
                    setJuego(datosJuego)
                    // setEstado(datosJuego.estado)
                    // setNotaJuego(datosJuego.notaJuego)
                    // setRejugando(datosJuego.rejugando)
                } catch (error) {
                    setError(error)
                } finally {
                    setIsLoading(false)
                }
            }
            fetchData()
        }
    }, [gameId])

    useEffect(() => {
        if (juego) {
            fetchPlatformImages([{ plataforma: juego.plataforma }], setPlatformImages)
        }
    }, [juego])


    if (isLoading) return <HomePageSkeleton/>
    
    if (error) return <p className="mt-40 text-xl text-center text-red-500">Error: {error.message}</p>
    
    const backgroundClass = getPlatformBackground(juego.plataforma)
    
    // Preparar los datos para la gráfica
    const mainStoryHours = juego.tiempoMainStory ? juego.tiempoMainStory : 0
    const mainAndExtraHours = juego.tiempoMainAndSides ? juego.tiempoMainAndSides : 0
    const completionistHours = juego.tiempoCompletionist ? juego.tiempoCompletionist : 0

    graficaHLTBData.datasets[0].data = [mainStoryHours, mainAndExtraHours, completionistHours]

    const maxCharacters = window.innerWidth < 640 ? 200 : 500; // Número máximo de caracteres a mostrar antes de truncar
    const truncatedText = juego.datosExtraJuego?.length > maxCharacters 
        ? `${juego.datosExtraJuego.substring(0, maxCharacters)}...` 
        : juego.datosExtraJuego

    // Define keywordStyles with the current values of juego
    const keywordStyles = [
        [cleanTitle(juego?.titulo), 'text-blue-500 font-bold'],
        [juego?.plataforma, `font-semibold italic`],
        [juego?.descripcion, `font-semibold italic`],
    ]
      
    const estados = Object.keys(estadoIconos)

    return (
        <div className={`w-full min-h-screen pt-14 sm:pt-14 lg:pt-32 ${backgroundClass} flex flex-col items-center`}>
            {/* Contenedor de la imagen */}
            <div className="relative z-10 flex justify-center w-full top-10">
                <div className="relative">
                    <img src={juego.imageUrl ?? juego.url[0]} alt={juego.titulo} className="object-cover w-48 h-48 transition duration-300 ease-in-out transform rounded-lg shadow-lg lg:h-60 lg:w-80"/>

                    {/* Indicador de Rejugando en la esquina inferior izquierda */}
                    {/* {(estado === 'Jugando' || estado === 'Completando') && (
                        <div title={rejugando === 'SI' ? 'Rejugando' : 'No rejugándolo'} className="absolute rounded-lg shadow-lg bottom-2 left-2">
                            {rejugando === 'SI' 
                                ? <div className="p-1 text-white bg-green-600 rounded-full"><UpdateIcon w={4} h={4} /></div>
                                : <div className="p-1 bg-gray-600 rounded-full opacity-55"><UpdateIcon w={4} h={4} /></div>
                            }
                        </div>
                    )} */}

                    {/* <button onClick={handleOpenEditEstadoPanel} className="flex flex-col items-center justify-center gap-3 mt-6 text-[9px] lg:text-[11px] absolute  bottom-2 right-2 text-white">
                        <div className={`${GET_STATE_BACKGROUND(estado)} px-1.5 py-1 lg:px-2 lg:py-1 lg:rounded-lg rounded-lg flex items-center`}>
                            <p className="lg:mr-1.5 mr-1">{estado}</p>
                            {estados.map(option => (
                                <div key={option}>{option === estado && estadoIconos[option]}</div>                                
                            )
                            )}
                        </div>
                    </button> */}
                </div>
            </div>

            {/* Contenedor del contenido */}
            <div className="w-full px-5 text-white bg-black shadow-lg py-14 lg:py-20">
                <div className="max-w-screen-lg mx-auto text-center">
                    <h1 className="text-2xl font-bold lg:text-4xl">{cleanTitle(juego?.titulo)}</h1>
                    <p className="mt-2 text-xs lg:text-sm">{juego.descripcion}</p>
                    <div className="flex items-center justify-center mt-2">
                        <img src={`/platformImages/${juego.plataforma.replace(/\s+/g, '-').trim()}-Logo.webp`} alt={juego?.plataforma} className="object-contain p-1 bg-gray-300 rounded-lg w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <div className="flex justify-center gap-10 mt-8 lg:mt-10">
                        <div className="flex items-center justify-center gap-4 sm:gap-4">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className={`text-sm text-gray-100 flex justify-center items-center font-bold rounded-full p-5 w-6 h-6 text-end ${GET_COLOR_CLASS(notaJuego)}`}>{notaJuego}</p>
                                <p className="text-[10px] lg:text-xs">Nota personal</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <p className={`text-sm text-gray-100 flex justify-center items-center rounded-full font-bold p-5 w-6 h-6 text-end ${GET_COLOR_CLASS(juego?.notaMetacriticUsuarios)}`}>{juego?.notaMetacriticUsuarios !== 0 ? juego?.notaMetacriticUsuarios : ''}</p>
                                <p className="text-[10px] lg:text-xs">Nota usuarios</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <p className={`text-sm text-gray-100 flex justify-center items-center rounded-lg font-bold p-5 w-6 h-6 text-end  ${GET_COLOR_CLASS(juego?.notaMetacriticPrensa)}`}>{juego?.notaMetacriticPrensa !== 0 ? juego?.notaMetacriticPrensa : ''}</p>
                                <p className="text-[10px] lg:text-xs">Nota prensa</p>
                            </div>
                        </div>
                    </div>

                    {/* <div className="flex items-center justify-center gap-5 py-4 sm:py-6 lg:gap-10">
                        <div>
                            <button className={`px-2 sm:px-3 py-1 mt-2 text-[11px] sm:text-xs font-thin text-white transition duration-500 bg-gray-800 rounded-2xl sm:mt-8 hover:bg-blue-700 h-20 ${(estado === 'Jugando' || estado ==='Completando' ? 'w-20' : 'w-32')} sm:w-32 lg:w-36`} onClick={handleOpenEditEstadoPanel}><div className="flex flex-col items-center justify-center p-1"><EditIcon/><p>Editar estado</p></div></button>                            
                        </div>
                        <div>
                            <button className={`px-2 sm:px-3 py-1 mt-2 text-[11px] sm:text-xs font-thin text-white transition duration-500 bg-gray-800 rounded-2xl sm:mt-8 hover:bg-green-700 hover:opacity-100 h-20 ${(estado === 'Jugando' || estado ==='Completando' ? 'w-20' : 'w-32')} sm:w-32 lg:w-36`} onClick={handleOpenEditNotaPanel}><div className="flex flex-col items-center justify-center p-1"><PlusIcon/><p>Editar nota</p></div></button>
                        </div>
                        {(estado === 'Jugando' || estado ==='Completando') && <div>
                            <button className="px-2 sm:px-3 py-1 mt-2 text-[11px] sm:text-xs font-thin text-white transition duration-500 bg-gray-800 rounded-2xl sm:mt-8 hover:bg-purple-700 w-20 sm:w-32 lg:w-36 h-20" onClick={handleOpenRejugandoPanel}
                            ><div className="flex flex-col items-center justify-center p-1"><UpdateIcon/><p>Rejugando?</p></div></button>
                        </div>}
                    </div> */}

                    <div className="p-6 pb-12 mt-10 border border-gray-500 h-96 sm:h-80 rounded-xl">
                        <h3 className="text-base font-bold lg:text-2xl text-start">How Long To Beat</h3>
                        <Bar data={graficaHLTBData} options={chartOptions} />
                    </div>

                    <div className="p-2">
                        <div className="p-2 mt-5 md:mt-10 lg:mt-14">
                            <div className={`text-container relative ${isExpanded ? 'expanded' : ''}`}>
                                {isExpanded
                                    ? formatTextAsParagraphs(
                                        highlightKeywords(juego.datosExtraJuego, keywordStyles)
                                    ).map((paragraph, index) => (
                                        <p key={index} className={`mt-4 text-[13px] text-justify sm:text-sm ${index === 0 ? 'first-paragraph' : ''}`} dangerouslySetInnerHTML={{ __html: paragraph }}
                                        ></p>
                                    ))
                                    : formatTextAsParagraphs(
                                        highlightKeywords(truncatedText, keywordStyles)
                                    ).map((paragraph, index) => (
                                        <p key={index} className={`mt-4 text-[13px] text-justify sm:text-sm ${index === 0 ? 'first-paragraph' : ''}`} dangerouslySetInnerHTML={{ __html: paragraph }}
                                        ></p>
                                    ))
                                }
                                {!isExpanded && (
                                    <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black to-transparent"></div>
                                )}
                            </div>
                            <button className="mt-2 text-xs text-blue-500 text-link-underline" onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? <span className="text-blue-500 ">Leer menos</span> : <span className="text-blue-500 ">Leer más</span> }
                            </button>
                        </div>

                        <div className="p-4 mt-10 border border-gray-500 rounded-xl">
                            <p className="text-xs text-justify">Género: {juego.genero}</p>
                            <div className="flex items-center justify-start gap-5 mt-5 text-xs">
                                <p className="flex items-center gap-2 text-start">{cleanTitle(juego?.titulo)} - Metacritic <ArrowRight/></p>
                                <div className="w-6 h-6">
                                    <a href={juego.linkMetacritic}><img src="/Metacritic-logo.png" alt="Logo metacritic" /></a>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-start gap-3 mt-5 text-xs">
                                <p className="flex items-center gap-2 text-start">{cleanTitle(juego?.titulo)} - HowLongToBeat <ArrowRight/></p>
                                <div>
                                    <a href={juego.linkHowLongToBeat}><p className="p-1 font-bold">HLTB</p></a>
                                </div>
                            </div>
                        </div>
                    </div>     
                </div>    
            </div>

            {/* {editNotaPanelOpen && <EditNotaPanel onAvanzar={handleCloseEditNotaPanel} onNotaChange={handleNotaJuegoChange} textoBoton='Cerrar' notaActual={juego.notaJuego} onAdded={true}/> }   
            {editEstadoPanelOpen && <EditEstadoPanel onAvanzar={handleCloseEditEstadoPanel} onEstadoChange={handleEstadoChange} textoBoton='Cerrar' id={juego.id} titulo={juego.titulo} tabla={'Juegos'} onAdded={true} estadoActual={juego.estado} onPosition={handlePosition} /> } 
            {editRejugandoPanelOpen && <EditRejugandoPanel onClose={handleCloseRejugandoPanel} onRejugandoChange={handleRejugandoChange} textoBoton='Cerrar'/> }   */}

            <ScrollToTopButton/>
        </div>        
    )
}