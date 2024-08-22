import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { cleanTitle, GET_COLOR_CLASS, getPlatformBackground } from "../../helpers/no-components/constants";
import { chartOptions, graficaHLTBData } from "../../helpers/no-components/graficaHLTBData";
import { ArrowRight } from "../../../assets/Icons/ArrowRight";
import { ScrollToTopButton } from "../../helpers/components/Menus&IndexHelpers/ScrollToTopButton";
import { getDocument, updateDocument } from "../../../api/supabase/cloud-supabase";
import { fetchPlatformImages } from "../../../hooks/useFetchsPlatforms";
import { HomePageSkeleton } from "../../helpers/components/Menus&IndexHelpers/Skeletons/HomePageSkeleton";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function GameDetail() {
    const { gameId, collection } = useParams();
    const [juego, setJuego] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [platformImages, setPlatformImages] = useState({}); // Estado para las imágenes de las plataformas
    const [estado, setEstado] = useState(""); // Nuevo estado para manejar el valor del estado del juego
    const [notaJuego, setNotaJuego] = useState(""); // Nuevo estado para manejar la nota del juego
    // const [fechaActualizacion, setFechaActualizacion] = useState("") 
    const [showEstadoSelect, setShowEstadoSelect] = useState(false);
    const [showNotaJuegoSelect, setShowNotaJuegoSelect] = useState(false);
    
    useEffect(() => {
        if (gameId) {
            const fetchData = async () => {
                try {
                    const datosJuego = await getDocument(collection, gameId);
                    setJuego(datosJuego);
                    setEstado(datosJuego.estado);
                    setNotaJuego(datosJuego.notaJuego);
                } catch (error) {
                    setError(error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }
    }, [gameId]);

    const handleEstadoChange = async (event) => {
        const nuevoEstado = event.target.value;
        setEstado(nuevoEstado);
        // Obtener la fecha y hora actuales
        const currentDate = new Date()
        const formattedDate = currentDate.toISOString() // Formatear la fecha a una cadena ISO
        // Establecer la fecha de actualización en el estado
//    setFechaActualizacion(formattedDate)

        try {
            await updateDocument('Juegos', gameId, { estado: nuevoEstado, fechaActualizacion: formattedDate });
        } catch (error) {
            setError(error);
        }
    };

    const handleNotaJuegoChange = async (event) => {
        const nuevaNota = event.target.value;
        setNotaJuego(nuevaNota);
         // Obtener la fecha y hora actuales
         const currentDate = new Date()
         const formattedDate = currentDate.toISOString() // Formatear la fecha a una cadena ISO
            // Establecer la fecha de actualización en el estado
    //    setFechaActualizacion(formattedDate)

        try {
            await updateDocument('Juegos', gameId, { notaJuego: nuevaNota, fechaActualizacion: formattedDate });
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        if (juego) {
            // Actualizar las imágenes de las plataformas una vez que se tenga el juego
            fetchPlatformImages([{ plataforma: juego.plataforma }], setPlatformImages);
        }
    }, [juego]);


    if (isLoading) {
        return <HomePageSkeleton/>;
    }

    if (error) {
        return <p className="mt-40 text-xl text-center text-red-500">Error: {error.message}</p>;
    }

    const backgroundClass = getPlatformBackground(juego.plataforma);
    
    // Preparar los datos para la gráfica
    const mainStoryHours = juego.tiempoMainStory ? juego.tiempoMainStory : 0;
    const mainAndExtraHours = juego.tiempoMainAndSides ? juego.tiempoMainAndSides : 0;
    const completionistHours = juego.tiempoCompletionist ? juego.tiempoCompletionist : 0;

    graficaHLTBData.datasets[0].data = [mainStoryHours, mainAndExtraHours, completionistHours]

    const toggleEstadoSelect = () => {
        setShowEstadoSelect(!showEstadoSelect);
    };

    const toggleNotaJuegoSelect = () => {
        setShowNotaJuegoSelect(!showNotaJuegoSelect);
    };

    return (
        <div className={`w-full min-h-screen pt-40 ${backgroundClass} flex flex-col items-center`}>
            {/* Contenedor de la imagen */}
            <div className="flex justify-center w-full">
                <img src={juego.imageUrl ?? juego.url[0]} alt={juego.titulo} className="object-cover max-w-screen-md transition duration-300 ease-in-out transform rounded-lg shadow-lg h-60 w-60 hover:scale-105" />
            </div>

            {/* Contenedor del contenido */}
            <div className="w-full px-5 py-10 mt-10 text-white bg-black shadow-lg">
                <div className="max-w-screen-lg mx-auto text-center">
                    <h1 className="text-4xl font-bold">{cleanTitle(juego?.titulo)}</h1>
                    <p className="mt-6 text-sm">{juego.descripcion}</p>
                    <div className="flex items-center justify-center mt-5">
                        <img 
                            src={platformImages[juego.plataforma]} 
                            alt={juego?.plataforma} 
                            className="object-contain w-8 h-8 p-1 bg-gray-300 rounded" 
                        />
                        {/* <span className="ml-4 text-2xl font-medium">{juego.plataforma}</span> */}
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-6 text-xs">
                        <p>Estado actual:</p>
                        <p>{estado}</p>
                    </div>
                    {/* Select para cambiar el estado del juego */}
                    <div className='flex flex-col items-center justify-center w-full gap-2 mt-4'>
                        <button className="px-3 py-1 mt-2 text-xs font-thin text-white transition duration-500 bg-gray-600 rounded opacity-30 sm:mt-8 hover:bg-green-700 hover:opacity-100" onClick={toggleEstadoSelect}>{showEstadoSelect?'Cerrar edición':'Cambiar Estado'}</button>
                        {showEstadoSelect && (
                        <div>
                            <label htmlFor="estado" className="block mb-2 text-xs text-white">Estado del juego</label>
                            <select
                                className="w-40 px-2 py-1 text-xs text-black border rounded"
                                name="estado"
                                id="estado"
                                value={estado}
                                onChange={handleEstadoChange}
                            >
                                <option value='Jugando'>Jugando</option>
                                <option value='En lista'>En lista</option>
                                <option value='Terminado'>Terminado</option>
                                <option value='Completando'>Completando</option>
                                <option value='Lista de deseos'>Lista de deseos</option>
                                <option value='Rejugar'>Rejugar</option>
                                <option value='Pausado'>Pausado</option>
                                <option value='Abandonado'>Abandonado</option>
                            </select>
                        </div>)}
                    </div> 

                    <div className="flex justify-center gap-10 mt-10">
                        <div className="flex items-center justify-center gap-10 sm:gap-20">
                            <div className="flex flex-col items-center justify-center gap-3">
                                <p className={`text-xs text-gray-100 flex justify-center items-center rounded px-2 w-6 h-6 py-1 text-end ${GET_COLOR_CLASS(notaJuego)}`}>{notaJuego}</p>
                                <p className="text-xs">Nota personal</p>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-8 h-8"><img src="/Metacritic-logo.png" alt="Logo metacritic" /></div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col items-center gap-2 md:flex-row">
                                        <p className={`text-xs text-gray-100 flex justify-center items-center rounded px-2 w-6 h-6 py-1 text-end ${GET_COLOR_CLASS(juego?.notaMetacriticPrensa)}`}>{juego?.notaMetacriticPrensa !== 0 ? juego?.notaMetacriticPrensa : ''}</p>
                                        <p className="text-xs">Nota Prensa</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 md:flex-row">
                                        <p className={`text-xs text-gray-100 flex justify-center items-center rounded px-2 w-6 h-6 py-1 text-end ${GET_COLOR_CLASS(juego?.notaMetacriticUsuarios)}`}>{juego?.notaMetacriticUsuarios !== 0 ? juego?.notaMetacriticUsuarios : ''}</p>
                                        <p className="text-xs">Nota Usuarios</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Select para cambiar la nota del juego */}
                    <div className="flex flex-col items-center justify-center w-full gap-2 mt-4">
                    <button 
                            className="px-3 py-1 mt-2 text-xs font-thin text-white transition duration-500 bg-gray-600 rounded opacity-30 sm:mt-8 hover:bg-green-700 hover:opacity-100" 
                            onClick={toggleNotaJuegoSelect}
                        >
                            {showNotaJuegoSelect?'Cerrar edición':'Cambiar Nota Personal'}
                        </button>
                    {showNotaJuegoSelect &&
                        <div>
                            <label htmlFor="notaJuego" className="block mb-2 text-xs text-white">Nota del juego</label>
                            <select
                                className="w-40 px-2 py-1 text-xs text-black border rounded"
                                name="notaJuego"
                                id="notaJuego"
                                value={notaJuego}
                                onChange={handleNotaJuegoChange}
                            >
                                {/* <option value=''>-</option> */}
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='5.5'>5.5</option>
                                <option value='6'>6</option>
                                <option value='6.5'>6.5</option>
                                <option value='7'>7</option>
                                <option value='7.5'>7.5</option>
                                <option value='8'>8</option>
                                <option value='8.5'>8.5</option>
                                <option value='9'>9</option>
                                <option value='9.5'>9.5</option>
                                <option value='10'>10</option>
                            </select>
                        </div>}
                    </div>

                    <div className="px-10 py-5 mt-10 h-96 sm:h-80">
                        <h3 className="text-2xl font-bold">HowLongToBeat</h3>
                        <Bar data={graficaHLTBData} options={chartOptions} />
                    </div>

                    <div className="p-2">
                        <p className="mt-10 text-xs text-justify sm:text-sm">{juego.datosExtraJuego}</p>
                        <p className="mt-10 text-xs text-justify">Género: {juego.genero}</p>
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
            <ScrollToTopButton/>
        </div>
        
    );
}