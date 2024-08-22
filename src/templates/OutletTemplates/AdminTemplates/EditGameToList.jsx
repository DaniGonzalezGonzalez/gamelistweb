import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"
import { useEditGameToList } from "../../../hooks/useEditGameToList"
import { cleanTitle, GET_COLOR_CLASS, scrollToTop, totalTiempoMainStory } from "../../helpers/no-components/constants"
import { DeleteIcon } from "../../../assets/Icons/DeleteIcon"
import { EditIcon } from "../../../assets/Icons/EditIcon"
import { ScrollToTopButton } from "../../helpers/components/Menus&IndexHelpers/ScrollToTopButton"
import { getDocuments } from "../../../api/supabase/cloud-supabase"
import { fetchPlatformImages } from "../../../hooks/useFetchsPlatforms"
import { useHandles } from "../../../hooks/useHandles"


export function EditGametoList() {
  const [dataBD, setDataBD] = useState([])
  const [contenido, setContenido] = useState({})
  const [error, setError] = useState(null)
  const [option, setOption] = useState('Juegos')
  const [fechaActualizacion, setFechaActualizacion] = useState("")
  const [editingItem, setEditingItem] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);

  const [sortBy, setSortBy] = useState('titulo')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsToShow, setItemsToShow] = useState(10);
  const navigate = useNavigate() // Usa useNavigate
  const { user } = useContext(UserContext)
  const { handleSubmit, tituloRef, handleDelete, isLoading } = useEditGameToList(contenido.idDoc, option, 'completa')
  const { handleGuardarContenido, handleEditarContenido } = useHandles(handleSubmit, setContenido, setFechaActualizacion, setEditingItem, setItemsToShow, itemsToShow, contenido)

  const [platformImages, setPlatformImages] = useState({});
  
  const [shouldFetchData, setShouldFetchData] = useState(false); // Nuevo estado para controlar la recarga

  const fetchData = async () => {
    try {
      const datos = await getDocuments(option)
      setDataBD(datos)
    } catch (error) {
      setError("Error al cargar los datos")
    }
  }  

  const handleShowMore = () => {
    setItemsToShow(prevItemsToShow => prevItemsToShow + 8) // Añadir 2 elementos adicionales cada vez que se presiona
  }
  const handleShowLess = () => {
    if (itemsToShow > 8) {
      setItemsToShow(prevItemsToShow => Math.max(prevItemsToShow - 8, 8)) // Quitar 8 elementos adicionales o dejar al menos 1
    }  
  }

  const handleRecargar = () => {
    setShouldFetchData(true); // Cambiar el estado para indicar que se necesita recargar
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContenido({
        ...contenido,
        [name]: value
    });
    // Si el nombre del campo es "estado", actualiza la fecha de actualización
    if (name === 'estado' || name ==='notaJuego') {
        // Obtener la fecha y hora actuales
        const currentDateTime = new Date();
        // Formatear la fecha a un string legible
        const formattedDateTime = currentDateTime.toISOString();

        // Establecer la fecha de actualización en el estado
        setFechaActualizacion(formattedDateTime);
    }
}

  useEffect(() => {   
    fetchData()
    const handleDataChanged = () => {
      fetchData()
    }      
    document.addEventListener('data-changed', handleDataChanged);
    return () => {
      document.removeEventListener('data-changed', handleDataChanged);
    }
  }, []);

  const sortedData = dataBD.sort((a, b) => {
    if (sortBy === 'fechaActualizacion') {
      return sortDirection === 'asc' ? b.fechaActualizacion.localeCompare(a.fechaActualizacion) : a.fechaActualizacion.localeCompare(b.fechaActualizacion);
    } else if (sortBy === 'plataforma') {
      return sortDirection === 'asc' ? a.plataforma.localeCompare(b.plataforma) : b.plataforma.localeCompare(a.plataforma);
    } else if (sortBy === 'notaJuego') {
      return sortDirection === 'asc' ? parseFloat(a.notaJuego) - parseFloat(b.notaJuego) : parseFloat(b.notaJuego) - parseFloat(a.notaJuego);
    } else {
      return sortDirection === 'asc' ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
    }
  })
  .filter(item => 
    (item.estado === 'Jugando' || item.estado === 'Proximo' || item.estado === 'Recién terminado' || item.estado === 'En lista' || item.estado === 'Terminado' || item.estado === 'Completando' || item.estado === 'Lista de deseos' || item.estado === 'Rejugar' || item.estado === 'Pausado' || item.estado === 'Abandonado') && item.infouser === user.email
  )
  .filter((item, index) => index < itemsToShow) // Controlar cuántos elementos mostrar
  .filter((item) => item.titulo.toLowerCase().includes(searchTerm.toLowerCase()))


  const handleTitleClick = (gameId) => {
    scrollToTop()
    navigate(`/game/${'Juegos'}/${gameId}`)
  }

      // Manejar el cambio en los select y deshabilitar el botón
      const handleChangeWithTimeOut = (e) => {
        handleChange(e)
        setIsSaving(true)
        setTimeout(() => {
          setIsSaving(false)
        }, 2000) // 2 segundos de espera
      };
        // useEffect para cargar la imagen solo una vez al montar el componente
  useEffect(() => {
    if (dataBD.length > 0) {
      const randomIndex = Math.floor(Math.random() * dataBD.length);
      const randomImage = dataBD[randomIndex]?.imageUrl ?? dataBD[randomIndex]?.url[0];
      setSelectedImage(randomImage);
    }
  }, [dataBD]);

  useEffect(() => {
    if (shouldFetchData) {
      fetchData();
      setShouldFetchData(false); // Resetear estado para evitar recarga infinita
    }
  }, [shouldFetchData]);
  

  useEffect(() => {
    if (sortedData.length > 0) {
      fetchPlatformImages(sortedData, setPlatformImages);
    }
  }, [sortedData]);


  return (
    <> 
    { user.id && 
      <div>
        {error && (<div className="items-center justify-center h-screen"><span className="text-xl text-gray-900 font-montserrat">{error.message}</span></div>)}
        {/* <div className="min-h-screen p-4 pt-20 pb-10 bg-gray-900"> */}
          {/* Prueba con imagen de fondo local */}
          <div className="min-h-screen p-4 pt-20 pb-10" style={{ backgroundImage: `url("/Imagen-fondo-colecciones.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center'}} >
          <div className="flex flex-col justify-center w-full text-center bg-transparent pt-14 sm:pt-28">
              <div className="relative flex justify-center mb-5">
                <div className="w-80 sm:w-96">
                  <div className="relative border-2 border-gray-300 rounded-lg w-80 sm:w-96">
                    {/* <img className="object-cover w-full h-32 rounded-lg sm:h-60" src={dataBD[Math.floor(Math.random()*(dataBD.length))]?.imageUrl?? dataBD[Math.floor(Math.random()*(dataBD.length))]?.url[0] } alt="No hay imagen" /> */}
                    <img className="object-cover w-full h-32 rounded-lg sm:h-60" src={selectedImage} alt='Cargando...' />
                    <div className="absolute inset-0 bg-black rounded-lg opacity-60"></div>
                     <h2 className="absolute inset-0 flex items-center justify-center p-3 text-lg font-semibold text-center text-white uppercase sm:text-3xl">
                      Todos tus juegos
                    </h2> 
                    <div className="absolute inset-0 flex items-end justify-start p-3 font-semibold text-center text-white">
                      <div className="flex justify-start w-full gap-2 font-thin text-white sm:w-80">
                          <div className="flex items-center justify-center gap-1 pr-2 text-xs border-r"><span className="font-bold">{dataBD.length}</span> <div className="uppercase">JUEGOS</div></div>
                          <div className="flex items-center justify-center gap-1 text-xs"><span className="font-bold">{totalTiempoMainStory(dataBD)}</span> <div className="uppercase">Horas</div></div>                        
                        </div>
                      {/* <div className="text-xs sm:text-base">{platform}</div> */}
                    </div>
                  </div>
                </div>
              </div>          
          </div>

          <div className="w-full">
            {/* <select hidden name="tipoContenido" id="tipo-contenido"  className="p-2 border rounded" onChange={handleOption}>
              <option value="Juegos">Juegos de mi lista</option>
            </select> */}
            {/* <h2 className="p-3 my-4 text-4xl text-gray-100 uppercase">Todos los juegos</h2> */}
            <div className="flex justify-around h-6 sm:justify-between my-14 sm:ml-10"><input type="text" placeholder="Buscar por título" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-24 p-1 text-xs text-white placeholder-white bg-gray-700 border-2 rounded appearance-none sm:40 sm:p-2 sm:w-52 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"/>
              <div className="grid items-center gap-4 text-xs">
                <select className="bg-gray-300 rounded w-14 sm:w-28" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="titulo">Título</option>
                  <option value="estado">Estado</option>
                  <option value="plataforma">Plataforma</option>
                  <option value="fechaActualizacion">Fecha de actualización</option>
                  <option value="notaJuego">Nota</option>
                </select>
                <div className="flex flex-col gap-1">
                  <div className="text-white">
                    <p className="pb-1">Orden:</p>
                    <div className="flex gap-2">
                      <button className="w-16 max-w-xs p-1 overflow-hidden text-white bg-gray-700 rounded sm:w-24 text-ellipsis md:max-w-none hover:bg-gray-400" onClick={() => setSortDirection('asc')}>Ascendente</button>
                      <button className="w-16 max-w-xs p-1 overflow-hidden text-white bg-gray-700 rounded sm:w-24 text-ellipsis md:max-w-none hover:bg-gray-400" onClick={() => setSortDirection('desc')}>Descendente</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 px-5 py-5 mx-auto xs:px-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {sortedData.map((item, index) => (
                <div key={index} className="flex justify-center rounded">
                  {
                    (editingItem === item && (item?.infouser === user.email)) ?
                    <form className="w-full" onSubmit={handleGuardarContenido}>
                      <div>
                        <div>
                          <label className="hidden pb-1 font-medium text-white font-montserrat" htmlFor="titulo">Titulo</label>
                          <input ref={tituloRef} className="hidden w-full p-2 text-sm rounded" type="text" name="titulo" id="titulo" placeholder="Título" value={contenido.titulo} readOnly/>
                        </div>
                      </div>
                      <div className="flex justify-center w-full gap-10 mb-10 text-lg font-bold text-gray-800 rounded">
                        <div className="h-full w-80 sm:w-56 xl:w-48 2xl:w-60">
                          <div className="relative flex items-center justify-center gap-3 shadow-md sm:flex hover:rounded-lg">
                              <img className="object-cover w-full transition duration-500 ease-in-out border-2 border-transparent rounded-lg h-36 xl:h-48 2xl:h-52 hover:border-2 hover:rounded-lg hover:border-gray-300" src={item?.imageUrl} alt="No hay imagen"></img>
                              <img className="absolute object-contain w-8 h-8 p-1 bg-gray-200 rounded-lg shadow right-2 bottom-2 shadow-black" src={platformImages[item.plataforma]} alt="No hay imagen" title={`Plataforma: ${item?.plataforma || 'Sin plataforma especificada'}`}></img>
                          </div>
                          <div className="relative z-10 w-full">
                                  <div className="flex justify-between gap-8 pt-3 pb-1 text-justify">
                                    <p className="text-xs text-white text-start">{cleanTitle(item?.titulo)}</p>
                                  </div>
                                  <div className="pb-3">
                                    <p className="text-xs text-white uppercase descripcion text-start">{item?.descripcion}</p>
                                  </div>
                                <div className="flex flex-col justify-between w-full gap-2">
                                  <div className='flex flex-col gap-2'>
                                    <label htmlFor="estado" className="block text-xs text-white font-montserrat">Estado del juego</label>
                                    <select className="w-full px-2 py-1 text-xs border rounded" name="estado" id="estado" value={contenido.estado} onChange={handleChangeWithTimeOut}>
                                          <option value='Jugando'>Jugando</option>
                                          {/* <option value='Proximo'>Próximo</option> */}
                                          <option value='En lista'>En lista</option>
                                          {/* <option value='Recién terminado'>Recién terminado</option> */}
                                          <option value='Terminado'>Terminados</option>
                                          <option value='Completando'>Completando</option>  
                                          <option value='Lista de deseos'>Lista de deseos</option>
                                          <option value='Rejugar'>Rejugar</option>  
                                          <option value='Pausado'>Pausado</option>  
                                          <option value='Abandonado'>Abandonado</option>  
                                    </select>
                                  </div>
                                  <div className="flex items-end justify-between gap-3">
                                    <div className='flex flex-col gap-1'>
                                      <label htmlFor="notaJuego" className="block mt-2 text-xs text-white">Nota</label>
                                      <select className="w-full px-2 py-1 text-xs bg-gray-300 rounded" name="notaJuego" id="notaJuego" value={contenido.notaJuego} onChange={handleChangeWithTimeOut}>
                                            {/* <option className="text-sm text-gray-900 bg-gray-100" value=''>-</option> */}
                                            {/* <option className="text-sm text-white bg-red-900" value='0'>0</option> */}
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
                                    </div>     
                                    <div className='flex items-end justify-center w-1/3 gap-3 pt-1'>
                                    <button onClick={handleRecargar} disabled={isLoading || isSaving} className={`px-2 py-1 text-xs text-center text-white rounded-sm ${isLoading ? 'bg-gray-400' : (isSaving ? 'bg-gray-700' : 'bg-green-700')} ${!isLoading && !isSaving ? 'hover:bg-green-600' : ''}`}>{isLoading || isSaving ? <div className="spinner-icon"></div> : 'Guardar'}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                          </div>
                          {/* Campo oculto para enviar la fecha de actualización */}
                          <input type="hidden" name="fechaActualizacion" value={fechaActualizacion} />
                              
                          {error && (<div className="max-w-3/4"><strong className="block w-full p-2 text-center bg-red-500 rounded">{error?.message}</strong></div>
                          )}
                        </div>
                      </div>
                    </form> 
                    
                    
                    :


                    
                    <div className="w-full">
                      {(item?.infouser === user.email) && 
                      <div>
                        <div className="flex justify-center w-full gap-10 mb-10 text-lg font-bold text-gray-800 rounded">
                          <div className="h-full w-80 sm:w-56 xl:w-48 2xl:w-60">
                              {/* Imagen del juego y plataforma */}
                              <button onClick={() => handleTitleClick(item.id)} className="relative flex items-center justify-center w-full gap-3 shadow-md sm:flex hover:rounded-lg">
                                  <img className="object-cover w-full transition duration-500 ease-in-out border-2 border-transparent rounded-lg h-36 xl:h-48 2xl:h-52 hover:border-2 hover:rounded-lg hover:border-gray-300" src={item?.imageUrl} alt="No hay imagen"></img>
                                  <img className="absolute object-contain w-8 h-8 p-1 bg-gray-200 rounded-lg shadow right-2 bottom-2 shadow-black" src={platformImages[item.plataforma]} alt="No hay imagen" title={`Plataforma: ${item?.plataforma || 'Sin plataforma especificada'}`}></img>
                              </button>
                              <div className="w-full">
                                {/* Información del título del juego */}
                                <div className="flex justify-between gap-8 pt-3 pb-1 text-justify">
                                  <p className="text-xs text-white text-start">{cleanTitle(item?.titulo)}</p>
                                </div>

                                {/* Información del estudio creador del juego */}
                                <div className="pb-3">
                                  <p className="text-xs text-white uppercase descripcion text-start">{item?.descripcion}</p>
                                </div>

                                <div className="flex flex-col justify-between w-full gap-2">
                                  {/* Información del estado del juego */}
                                  <div className="flex items-center justify-between gap-2">
                                    <p className="text-xs text-gray-100 text-start">Estado: {item?.estado}</p>
                                  </div>

                                  {/* Botones de nota + editar + eliminar */}
                                  <div className="flex items-center gap-3">
                                    <div className="pr-2">
                                      <p className={`text-xs text-gray-100 flex justify-center items-center rounded px-2 w-6 h-6 py-1 text-end ${GET_COLOR_CLASS(item?.notaJuego)}`}>{item?.notaJuego}</p>
                                    </div>
                                    <div className="flex items-center justify-center">
                                      <button className="p-1 text-sm font-bold text-center text-white bg-green-500 rounded-lg hover:bg-green-600" onClick={() => handleEditarContenido(item)}><EditIcon/></button>
                                    </div>
                                    <div className='flex items-center justify-center gap-3 md:mt-0'>
                                      <button onClick={() => handleDelete(item.id, item.titulo)} type="button" className={`text-white hover:text-white bg-gray-700 hover:bg-red-700 font-bold rounded-lg text-sm text-center p-1`}><DeleteIcon/></button>
                                    </div>
                                  </div>

                                </div>
                              </div>
                          </div>
                        </div>
                      </div>}
                    </div>
                  }
                </div>
              ))}
            </div>
            
            {/* Botones de Mostrar más y mostrar menos */}
            <div className="flex justify-end gap-2">
              <div className="flex justify-center">
                <button onClick={handleShowMore} className="px-3 py-1 text-xs text-center text-white bg-gray-600 rounded hover:text-white hover:bg-blue-400">Mostrar más</button>
              </div>
              <div className="flex justify-center">
                <button onClick={handleShowLess} className={`px-3 py-1 text-xs text-center text-white bg-gray-600 rounded ${sortedData.length > 8 && 'hover:text-white hover:bg-red-400'}`} disabled={itemsToShow === 8}>Mostrar menos</button>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    }      
    <ScrollToTopButton/>
    </>
  )
}
