import { useContext, useEffect, useRef, useState } from "react"
import { useGetData } from "../../../hooks/useGetData";
import { useAddGameToList } from "../../../hooks/useAddGameToList";
import { UserContext } from "../../../context/UserContext";
import { ScrollToTopButton } from "../../helpers/components/Menus&IndexHelpers/ScrollToTopButton";
import { PlusIcon } from "../../../assets/Icons/PlusIcon";
import { cleanTitle, scrollToTop, totalTiempoMainStory } from "../../helpers/no-components/constants";
import { useHandleGameSelect } from "../../../hooks/useHandles";
import { getPlatformImageUrl } from "../../../api/supabase/cloud-supabase";
import { HomePageSkeleton } from "../../helpers/components/Menus&IndexHelpers/Skeletons/HomePageSkeleton";
import { ArrowRight } from "../../../assets/Icons";
import ImagesHeadAddToGameList from "../../helpers/components/Menus&IndexHelpers/ImagesAddToGameList/ImagesHeadAddToGameList";


export function AddGameToList() {  
  const tituloRef = useRef(null)
  const tipoContenidoRef = useRef(null)
  const [showMessage, setShowMessage] = useState(false);
  const [filteredGames, setFilteredGames] = useState([])
  const [gameAdded, setGameAdded] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);

  const filters = [{ field: 'plataforma', value: 'PS3' }];

  const { gamesBDComplete } = useGetData('', filters)
  const { handleSubmit, success, error, isLoading } = useAddGameToList(tituloRef, tipoContenidoRef)
  const { handleGameSelect, searchTerm, setSearchTerm, imageUrl, platformImageUrl, plataforma, descripcion, notaMetacriticPrensa, notaMetacriticUsuarios, tiempoMainStory, tiempoMainAndSides, tiempoCompletionist, linkMetacritic, linkHowLongToBeat, datosExtraJuego, genero, isDropdownOpen, setIsDropdownOpen, isTitleValid, setIsTitleValid, fechaActualizacion, selectedTitle } = useHandleGameSelect()
  const { user } = useContext(UserContext)

  // useEffect para cargar la imagen solo una vez al montar el componente
  useEffect(() => {
    if (gamesBDComplete.length > 0) {
      const randomIndex = Math.floor(Math.random() * gamesBDComplete.length);
      const randomImage = gamesBDComplete[randomIndex]?.url[0] ?? gamesBDComplete[randomIndex]?.imageUrl;
      setSelectedImage(randomImage);
    }
  }, [gamesBDComplete]);

  useEffect(() => {
    if (gameAdded) {
      setSearchTerm('')
      setGameAdded(false)
    }
    if (searchTerm.trim() === "") {
      setFilteredGames([])
      setIsTitleValid(false)
      return
    }    
    const filtered = gamesBDComplete.filter((game) =>
      game.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  )
    // Cargar imágenes de la plataforma para los juegos filtrados
    const loadPlatformImages = async () => {
      const updatedGames = await Promise.all(filtered.map(async (game) => {
        const platformImageUrl = await getPlatformImageUrl(game.plataforma);
        return { ...game, platformImageUrl };
      }));
      setFilteredGames(updatedGames);
    };
    
    loadPlatformImages();
      // Verifica si el título coincide exactamente con selectedTitle
  const exactMatch = filtered.some((game) => game.titulo === searchTerm);
  setIsTitleValid(exactMatch);
}, [searchTerm, gamesBDComplete, selectedTitle])

useEffect(() => {
  if (success || error) {
    setShowMessage(true);
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000); // 3 segundos
    
    return () => clearTimeout(timer)
  }
}, [success, error])

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
    setIsDropdownOpen(true)
  }

  const handleAddGame = () => {
    setGameAdded(true)
  }

    // Función vacía para manejar cambios en el textarea
    const handleTextareaChange = () => {};
  return (
    <>
    {
    user.id &&
    <div className="flex flex-col items-start justify-start min-h-screen bg-slate-950">
     {/* <div className="flex flex-col items-start justify-start w-full min-h-screen p-10 pt-40 bg-slate-950" style={{ backgroundImage: `url("/Imagen-fondo-colecciones.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center'}} > */}
        <div className="flex flex-col items-start justify-between w-full">
        <div className="flex flex-col justify-center w-full text-center bg-blue-950 pt-28">         
          <div className="relative flex justify-center mb-5">
            <div className="w-80 sm:w-96">
              <button onClick={() => {tituloRef.current.focus(); scrollToTop()}} className="relative w-80 sm:w-96">
              {/* <ImagesHeadAddToGameList gamesBDByPlatform={gamesBDComplete}/> */}
                {/* Usar la imagen seleccionada una sola vez */}
                <img className="object-cover w-full h-32 rounded-lg sm:h-60" src={selectedImage} alt="No hay imagen" />
                {/* <img className="object-cover w-full h-32 rounded-lg sm:h-60" src={gamesBDComplete[Math.floor(Math.random()*(gamesBDComplete.length))]?.url[0]??gamesBDComplete[Math.floor(Math.random()*(gamesBDComplete.length))]?.imageUrl} alt="No hay imagen" /> */}
                <div className="absolute inset-0 bg-black rounded-lg opacity-60"></div>
                  {/* <p className="absolute inset-0 flex items-center justify-center p-3 text-xs font-semibold text-center text-white sm:text-base">
                    Busca entre nuestro catálogo, selecciona el juego, elige un estado y añádelo
                  </p> */}
                  <div className="absolute inset-0 flex items-end p-3 font-semibold text-center text-white justify-stat">
                    <div className="flex justify-start w-full gap-2 font-thin text-white sm:w-80">
                        <div className="flex items-center justify-center gap-1 pr-2 text-xs border-r"><span className="font-bold">{gamesBDComplete.length}</span> <div className="uppercase">JUEGOS</div></div>
                        <div className="flex items-center justify-center gap-1 text-xs"><span className="font-bold">{totalTiempoMainStory(gamesBDComplete)}</span> <div className="uppercase">Horas</div></div>                        
                      </div>
                  </div>
                </button>
              </div>
            </div>          
        </div>


          <form  className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
          {/* <h1 className="flex justify-center pb-5 text-2xl font-bold text-white uppercase lg:pb-10">Añadir juegos</h1> */}
            <div className="flex flex-col sm:mt-10">
              <div className="flex flex-col items-start justify-between w-full gap-6 sm:gap-3">
                {/* Div pculto con la info del nombre de la colección destino*/}
                <div hidden className='flex flex-col gap-2'>
                  <label htmlFor="tipo-contenido" className="text-white" hidden>Tipo de contenido</label>
                  <select hidden ref={tipoContenidoRef} name="tipoContenido" id="tipo-contenido" className="p-2 border rounded">
                    <option value="Juegos">Mis Juegos</option>
                  </select>
                </div>

                {/* Barra de búsqueda de juego */}
                <div  className='flex flex-col items-center w-full gap-2 mt-4 sm:gap-4 md:my-0'>                  
                  {/* <label htmlFor="titulo" className="text-xs text-center text-white">1º - Buscar por nombre</label> */}
                  <input ref={tituloRef} className="w-full p-1 text-xs text-white placeholder-white bg-gray-700 border-2 rounded appearance-none sm:p-2 sm:w-52 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" type="text" name="titulo" id="titulo" placeholder="Buscar juego por título" value={searchTerm} onChange={handleInputChange}/>
                </div>

              {/* 
                <div className="flex flex-col items-center justify-between w-full gap-2 my-5 text-xs text-center text-white sm:gap-4">2º - Selecciona el juego<div className="w-8 h-8 p-1 bg-gray-600 rounded-lg shadow left-2 bottom-2 shadow-black hover:bg-green-500"><PlusIcon w={6} h={6}/></div></div> */}



                {isDropdownOpen && filteredGames.length > 0 && (
                  <ul className="grid grid-cols-2 pt-4 mt-4 mb-6 text-xs text-white border-t border-gray-700 sm:mb-10 2xl:grid-cols-10 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3">
                    {filteredGames.map((game) => (
                    <li key={game.titulo}  className="px-4 py-2 cursor-pointer">
                      <div  className="h-full transition duration-300 w-28 sm:w-32 hover:scale-105">
                        <div className="relative flex items-center justify-center gap-3 shadow-md sm:flex hover:rounded hover:shadow-gray-700">
                            <img className="object-cover w-full rounded-lg h-28 sm:h-32" src={game?.url[0]??game?.imageUrl} alt="No hay imagen"></img>
                            <img className="absolute object-contain p-0.5 bg-gray-200 rounded-lg shadow w-7 h-7 right-2 bottom-2 shadow-black" src={game?.url[1]??game?.platformImageUrl} alt="No hay imagen" title={`Plataforma: ${game?.plataforma || 'Sin plataforma especificada'}`}></img>
                            <div  className="absolute flex items-center justify-center object-contain gap-1 p-0.5 pr-1 bg-gray-600 rounded-lg shadow left-2 bottom-2 shadow-black hover:bg-green-500" onClick={(e) => { e.stopPropagation(); handleGameSelect(game.titulo, game.imageUrl, game.platformImageUrl, game.plataforma, game.descripcion, game.notaMetacriticPrensa, game.notaMetacriticUsuarios, game.tiempoMainStory, game.tiempoMainAndSides, game.tiempoCompletionist, game.linkMetacritic, game.linkHowLongToBeat, game.datosExtraJuego, game.genero, game.url[0], game.url[1]);}}
                            ><PlusIcon w={4} h={4}/> Select</div>
                        </div>
                        <p className="pt-3 text-start">{cleanTitle(game?.titulo)}</p> 
                        <p className="pt-2 font-bold text-start">{game.descripcion}</p>  
                      </div>
                    </li>
                    ))}
                  </ul>
                ) 
                // : (
                  // Mientras no buscamos por nombre mostramos una imagen de un juego random y un texto
                  // <div className="relative">
                  //   <div className="w-80 sm:w-96">
                  //     <button onClick={() => {tituloRef.current.focus(); scrollToTop()}} className="relative w-80 sm:w-96">
                  //       <img className="object-cover w-full rounded-lg h-28 sm:h-96" src={gamesBDComplete[Math.floor(Math.random()*(gamesBDComplete.length))]?.url[0]??gamesBDComplete[Math.floor(Math.random()*(gamesBDComplete.length))]?.imageUrl} alt="No hay imagen" />
                  //       <div className="absolute inset-0 bg-black rounded-lg opacity-60"></div>
                  //       <p className="absolute inset-0 flex items-center justify-center p-3 font-semibold text-center text-white">
                  //         Busca entre nuestro catálogo de juegos
                  //       </p>
                  //     </button>
                  //   </div>
                  // </div>
                // )
              }



                {/* Selector de estado del juego */}
                <div className='flex items-center justify-center w-full gap-2 mt-8 sm:mt-10 sm:gap-4'>
                  <div className="flex items-center gap-2">
                    <label htmlFor="estado" className="text-xs text-center text-white uppercase md:text-start">Elegir estado</label>
                    <div className="text-white"><ArrowRight/></div>
                  </div>
                  <select className="w-full p-1 text-xs text-center text-white bg-gray-700 border-2 rounded appearance-none sm:p-2 sm:w-52 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"  name="estado" id="estado">
                        <option className="p-2 text-center bg-blue-300" value='Jugando'>Jugando</option>
                        <option className="p-2 text-center text-white bg-blue-800" value='En lista'>En lista</option>
                        <option className="p-2 text-center text-white bg-green-900" value='Terminado'>Terminados</option>
                        <option className="p-2 text-center text-white bg-gray-600" value='Completando'>Completando</option>
                        <option className="p-2 text-center text-white bg-orange-600" value='Lista de deseos'>Lista de deseos</option>
                        <option className="p-2 text-center text-white bg-purple-800" value='Rejugar'>Rejugar</option>
                        <option className="p-2 text-center text-white bg-yellow-700" value='Pausado'>Pausado</option>
                        <option className="p-2 text-center text-white bg-red-800" value='Abandonado'>Abandonado</option>
                  </select>                 
                </div>
                {/* Selector de nota del juego */}
                {/* <div className='flex flex-col items-center w-full gap-3 my-5 md:items-start md:w-1/6 md:my-0'>
                  <label htmlFor="notaJuego" className="text-xs text-center text-white md:text-start">Elige la nota que le pones al juego. Se podrá modificar siempre que quieras.</label>
                  <select className="w-1/3 p-1 border rounded" name="notaJuego" id="notaJuego">
                        <option className="text-sm text-gray-900 bg-gray-100" value=''>-</option>
                        <option className="text-sm text-white bg-red-900" value='0'>0</option>
                        <option className="text-sm text-white bg-red-900" value='1'>1</option>
                        <option className="text-sm text-white bg-red-900" value='2'>2</option>
                        <option className="text-sm text-white bg-red-900" value='3'>3</option>
                        <option className="text-sm text-white bg-red-900" value='4'>4</option>
                        <option className="text-sm text-white bg-orange-700" value='5'>5</option>
                        <option className="text-sm text-white bg-orange-500" value='5.5'>5.5</option>
                        <option className="text-sm text-gray-900 bg-yellow-400" value='6'>6</option>
                        <option  className="text-sm text-gray-900 bg-yellow-200" value='6.5'>6.5</option>
                        <option  className="text-sm text-gray-900 bg-green-200" value='7'>7</option>
                        <option className="text-sm text-gray-900 bg-green-300" value='7.5'>7.5</option>
                        <option className="text-sm text-gray-900 bg-green-400" value='8'>8</option>
                        <option className="text-sm text-gray-900 bg-green-500" value='8.5'>8.5</option>
                        <option className="text-sm text-white bg-green-700" value='9'>9</option>
                        <option className="text-sm text-white bg-green-800" value='9.5'>9.5</option>
                        <option className="text-sm text-white bg-green-900" value='10'>10</option>
                  </select>
                </div> */}

                {/* Envío de información en modo oculto (obtenida del juego copiado de la base de datos)*/}              
                {/* Envío del archivo imagen del juego en modo oculto */}
                <input className="w-full p-2 border rounded" type="text" hidden name="imageUrl" id="imageUrl" value={imageUrl} readOnly/>
                {/* Envío del nombre de la plataforma en modo oculto */}
                <input className="w-full p-2 border rounded" type="text" hidden name="plataforma" id="plataforma" value={plataforma} readOnly/>
                {/* Envío del archivo imagen de la plataforma en modo oculto */}
                <input className="w-full p-2 border rounded" type="text" hidden name="platformImageUrl" id="platformImageUrl" value={platformImageUrl} readOnly/>
                {/* Envío del nombre del estudio creador del juego en modo oculto */}
                <input className="w-full p-2 border rounded" type="text" hidden name="descripcion" id="descripcion" value={descripcion} readOnly/>
                {/* Envío de la nota de metacritic de la prensa en modo oculto */}
                <input className="w-full p-2 border rounded" type="number" hidden name="notaMetacriticPrensa" id="notaMetacriticPrensa" value={notaMetacriticPrensa} readOnly/>
                {/* Envío de la nota de metacritic de los usuarios en modo oculto */}
                <input className="w-full p-2 border rounded" type="number" hidden name="notaMetacriticUsuarios" id="notaMetacriticUsuarios" value={notaMetacriticUsuarios} readOnly/>
                {/* Envío del tiempo de la main story de howlongtobeat en modo oculto */}
                <input className="w-full p-2 border rounded" type="number" hidden name="tiempoMainStory" id="tiempoMainStory" value={tiempoMainStory} readOnly/>
                {/* Envío del tiempo de la main story + extra de howlongtobeat en modo oculto */}
                <input className="w-full p-2 border rounded" type="number" hidden name="tiempoMainAndSides" id="tiempoMainAndSides" value={tiempoMainAndSides} readOnly/>
                {/* Envío del tiempo completionist de howlongtobeat en modo oculto */}
                <input className="w-full p-2 border rounded" type="number" hidden name="tiempoCompletionist" id="tiempoCompletionist" value={tiempoCompletionist} readOnly/>
                {/* Envío del link de metacritic del juego en modo oculto */}
                <input className="w-full p-2 border rounded" type="text" hidden name="linkMetacritic" id="linkMetacritic" value={linkMetacritic} readOnly/>              
                {/* Envío del link de howlongtobeat del juego en modo oculto */}
                <input className="w-full p-2 border rounded" type="text" hidden name="linkHowLongToBeat" id="linkHowLongToBeat" value={linkHowLongToBeat} readOnly/>
                {/* Envío de los datos extra del juego en modo oculto */}
                <input className="w-full p-2 border rounded" type="text" hidden name="datosExtraJuego" id="datosExtraJuego" value={datosExtraJuego} readOnly/>
                {/* Envío del género del juego en modo oculto */}
                <input className="w-full p-2 border rounded" type="text" hidden name="genero" id="genero" value={genero} readOnly/>
                {/* Envio de fecha de actualización en modo oculto*/}
                <input type="hidden" name="fechaActualizacion" value={fechaActualizacion} />
                {/* Envío de información del usuario logueado en modo oculto */}
                <div className='flex flex-col gap-2'>
                  <label hidden htmlFor="infouser" className="font-medium text-white">Información del usuario</label>
                  <textarea className="p-2 border rounded resize-none" name="infouser" id="infouser" placeholder={user.email} rows="3" cols="33" hidden onChange={handleTextareaChange} value={user.email}></textarea>
                </div>



              </div>

              <p className="px-2 py-1 mt-6 text-sm font-bold text-center text-white bg-green-700 rounded-lg" hidden={isLoading || !isTitleValid || gameAdded }>¡{cleanTitle(selectedTitle)} seleccionado correctamente! Haz click en Añadir juego para incluirlo en la colección deseada</p>
              
              <div className="flex justify-center">
                 {showMessage && (
                    <>
                      {error && <p className="font-bold text-red-400 font-montserrat">{error}</p>}
                      {success && <div className="px-2 py-1 mt-3 text-sm font-bold text-center text-green-700 rounded">{success}</div>}
                    </>
                  )}
                 {isLoading && <HomePageSkeleton/>}
              </div>
              {/* <p className="flex flex-col items-center justify-between mt-5 text-xs text-white sm:mt-10">3º - Añádelo a tu colección</p> */}
              <div className="flex justify-center my-8 sm:my-10"><button onClick={handleAddGame} disabled={isLoading || !isTitleValid } className={`px-5 py-2 mb-2 text-xs font-bold text-center text-white transition duration-300 bg-gray-800 rounded-lg hover:text-white ${isTitleValid ? 'bg-green-800' : 'hover:bg-gray-800'} font-montserrat`}>Añadir juego a colección</button></div>
              </div>
          </form>
        </div>
       
        <ScrollToTopButton/>
    </div>
    }
    </>
  )
}
