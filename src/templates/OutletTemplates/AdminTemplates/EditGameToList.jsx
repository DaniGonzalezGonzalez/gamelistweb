import { useContext, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"
import { getDocumentsWithFilter } from "../../../api/supabase/cloud-supabase"
import { useHandlePlatformMenus, useHandles } from "../../../hooks/useHandles"
import { cleanTitle, GET_COLOR_CLASS, GET_STATE_BACKGROUND, scrollToTop, totalTiempoMainStory } from "../../helpers/no-components/constants"
import { ScrollToTopButton } from "../../helpers/components/Menus&IndexHelpers/ScrollToTopButton"
import { GET_STATE_ICON, useDebounce } from "../../helpers/no-components/constantsComponents"
import { ChooseAddGamesMenuFlotante } from "../../helpers/components/Utils/ChooseAddGamesMenuFlotante"

export function EditGametoList() {
  const [dataBD, setDataBD] = useState([])
  const [contenido, setContenido] = useState({})
  const [error, setError] = useState(null)
  const [fechaActualizacion, setFechaActualizacion] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)
  const [shouldFetchData, setShouldFetchData] = useState(false)
  const [noGamesLoaded, setNoGamesLoaded] = useState(false)
  const [sortBy, setSortBy] = useState('titulo')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsToShow, setItemsToShow] = useState(10)

  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const { chooseAddGamesMenuOpen, handleAddGameMenu } = useHandlePlatformMenus()
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  
  const fetchData = async () => {
    try {
      const filters = [
        { field: 'infouser', value: user.email },
      ];
      const datos = await getDocumentsWithFilter('Juegos', filters)
      setDataBD(datos)
      if (datos.length === 0) {
        setNoGamesLoaded(true)
      } else {
        setNoGamesLoaded(false)
      }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContenido({
        ...contenido,
        [name]: value
    })
    // Si el nombre del campo es "estado", actualiza la fecha de actualización
    if (name === 'estado' || name ==='notaJuego') {
        // Obtener la fecha y hora actuales
        const currentDateTime = new Date()
        const formattedDateTime = currentDateTime.toISOString()

        setFechaActualizacion(formattedDateTime)
    }
  }

  useEffect(() => {   
    fetchData()
    const handleDataChanged = () => {
      fetchData()
    }      
    document.addEventListener('data-changed', handleDataChanged)
    return () => {
      document.removeEventListener('data-changed', handleDataChanged)
    }
  }, [])

  const preSortedData = useMemo(() => {
    return dataBD
      .sort((a, b) => {
        if (sortBy === 'fechaActualizacion') {
          return sortDirection === 'asc'
            ? b.fechaActualizacion.localeCompare(a.fechaActualizacion)
            : a.fechaActualizacion.localeCompare(b.fechaActualizacion);
        } else if (sortBy === 'plataforma') {
          return sortDirection === 'asc'
            ? a.plataforma.localeCompare(b.plataforma)
            : b.plataforma.localeCompare(a.plataforma);
        } else if (sortBy === 'notaJuego') {
          return sortDirection === 'asc'
            ? parseFloat(a.notaJuego) - parseFloat(b.notaJuego)
            : parseFloat(b.notaJuego) - parseFloat(a.notaJuego);
        } else {
          return sortDirection === 'asc'
            ? a[sortBy].localeCompare(b[sortBy])
            : b[sortBy].localeCompare(a[sortBy]);
        }
      })
      .filter(
        (item) =>
          (item.estado === 'Jugando' ||
            item.estado === 'Proximo' ||
            item.estado === 'Recién terminado' ||
            item.estado === 'En lista' ||
            item.estado === 'Terminado' ||
            item.estado === 'Completando' ||
            item.estado === 'Lista de deseos' ||
            item.estado === 'Otra vez' ||
            item.estado === 'Pausado' ||
            item.estado === 'Abandonado') &&
          item.infouser === user.email
      );
  }, [dataBD, sortBy, sortDirection, user.email]);
  
  const sortedData = useMemo(() => {
    return preSortedData
      .filter((item, index) => index < itemsToShow) // Controlar cuántos elementos mostrar
      .filter((item) => item.titulo.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [preSortedData, itemsToShow, searchTerm])

  const handleTitleClick = (gameId) => {
    scrollToTop()
    navigate(`/game/${'Juegos'}/${gameId}`)
  }

 
  useEffect(() => {
      if (preSortedData.length > 0) {
        const randomIndex = Math.floor(Math.random() * preSortedData.length);
        const randomImage = preSortedData[randomIndex]?.imageUrl ?? preSortedData[randomIndex]?.url[0];
        setSelectedImage(randomImage);
      }     
  }, [preSortedData]);


  useEffect(() => {
    if (shouldFetchData) {
      fetchData();
      setShouldFetchData(false) // Resetear estado para evitar recarga infinita
    }
  }, [shouldFetchData])
  


  return (
    <> 
    { user.id && 
      <div>
        {error && (<div className="items-center justify-center h-screen"><span className="text-xl text-gray-900 font-montserrat">{error.message}</span></div>)}
        <div className="min-h-screen pb-10 bg-gray-950">
          <div className={`flex flex-col justify-center w-full p-4 text-center animate-bg-animation pt-28 sm:pt-10 lg:pt-32`}>
              <div className="relative flex justify-center mb-5">
                <div className="w-80 sm:w-96">
                  <div className="relative w-80 sm:w-96">
                    <img className="object-cover w-full h-32 border-2 rounded-lg animate-border-animation sm:h-28 lg:h-60"  src={selectedImage} alt='Cargando...' />
                    <div className="absolute inset-0 bg-black border-2 border-opacity-100 rounded-lg opacity-60"></div>
                     <h2 className="absolute inset-0 flex items-center justify-center p-3 text-lg font-semibold text-center text-white uppercase sm:text-3xl">
                      Todos mis juegos
                    </h2> 
                    <div className="absolute inset-0 flex items-end justify-start p-3 font-semibold text-center text-white">
                      <div className="flex justify-start w-full gap-2 font-thin text-white sm:w-80">
                          <div className="flex items-center justify-center gap-1 pr-2 text-xs border-r"><span className="font-bold">{preSortedData.length}</span> <div className="uppercase">JUEGOS</div></div>
                          <div className="flex items-center justify-center gap-1 text-xs"><span className="font-bold">{totalTiempoMainStory(preSortedData)}</span> <div className="uppercase">Horas</div></div>                        
                        </div>
                    </div>
                  </div>
                </div>
              </div>          
          </div>

          <div className="container px-4 pb-8 mx-auto">
            <div className="flex justify-between h-6 mx-3 lg:mx-6 my-14"><input type="text" placeholder="Buscar por título" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-32 p-1 py-4 pl-2 text-xs text-white placeholder-white bg-gray-700 border-2 appearance-none rounded-xl sm:40 sm:p-4 sm:w-52 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"/>
              <div className="flex flex-col items-end gap-4 text-xs">
                <select className="w-32 bg-gray-300 rounded sm:w-32" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="titulo">Título</option>
                  <option value="estado">Estado</option>
                  <option value="plataforma">Plataforma</option>
                  {/* <option value="fechaActualizacion">Fecha de edición</option> */}
                  {/* <option value="notaJuego">Nota</option> */}
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
            
            <div className="grid grid-cols-2 gap-6 px-3 py-5 mx-auto lg:px-5 xs:px-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {sortedData.map((item, index) => (
                <div key={index} className="flex justify-center rounded">
                  {        
                    <div className="w-full">
                      {(item?.infouser === user.email) && 
                      <div>
                        <div className="flex justify-center w-full gap-10 mb-10 text-lg font-bold text-gray-800 rounded">
                          <div className="h-full w-80 sm:w-56 xl:w-48 2xl:w-60">
                              {/* Imagen del juego y plataforma */}
                              <button onClick={() => handleTitleClick(item.id)} className="relative flex items-center justify-center w-full gap-3 shadow-md sm:flex hover:rounded-lg">
                                  <img className="object-cover w-full h-40 transition duration-500 ease-in-out border-2 border-transparent rounded-lg xl:h-48 2xl:h-52 hover:border-2 hover:rounded-lg hover:border-gradient" src={item.imageUrl ?? item.url[0]} alt="No hay imagen"></img>
                                  <img className="absolute object-contain w-8 h-8 p-1 bg-gray-200 rounded-lg shadow right-2 bottom-2 shadow-black" src={`/platformImages/${item.plataforma.replace(/\s+/g, '-').trim()}-Logo.webp`} alt="No hay imagen" title={`Plataforma: ${item?.plataforma || 'Sin plataforma especificada'}`}></img>
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
                                  <div className="flex items-center justify-between gap-2 pb-1">
                                    <div  className={`text-xs rounded flex items-center gap-1 text-gray-100 text-start`}>
                                      <div className={`${GET_STATE_BACKGROUND(item.estado)} p-0.5 rounded mr-1`}>{GET_STATE_ICON(item.estado, '4', '4')}</div><span className="text-[10px] lg:text-[11px] py-1 font-semibold">{item?.estado}</span></div>

                                      <div className="pr-2">
                                      {item?.notaJuego !== undefined && item?.notaJuego !== null && item.notaJuego !== '' && <p className={`text-xs text-gray-100 flex justify-center items-center rounded px-2 w-6 h-6 py-1 text-end ${GET_COLOR_CLASS(item?.notaJuego)}`}>{item?.notaJuego}</p>}
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
                ))
              }
            </div>

            {/* Mostrar mensaje cuando no se encuentren juegos filtrados */}
            {debouncedSearchTerm.trim() !== "" && sortedData.length === 0 && (
                <div className="flex flex-col items-center justify-center w-full pt-5">
                  <img src="/Imagen-no-encontrado.webp" alt="No se encontraron juegos" className="w-20 h-20 mb-4"/>
                  <p className="mt-4 text-sm font-semibold text-white lg:text-lg">¡No se encontraron juegos!</p>
                </div>
              )
            }

            { noGamesLoaded && 
              <div className="flex flex-col items-center justify-center p-6 mt-20 mb-6 bg-gray-800 border-2 border-gray-600 border-dashed rounded-lg">
                <img src="/Imagen-no-encontrado.webp" alt="No hay juegos" className="w-20 h-20 mb-4"/>
                <h3 className="mb-4 text-lg font-semibold text-gray-300">
                  ¡No tienes juegos en tus colecciones!
                </h3>
                <p className="mb-4 text-gray-400">Agrega tus juegos y empieza tu colección.</p>
                <button
                  onClick={handleAddGameMenu}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Agregar Juegos
                  <span className="ml-2">➕</span>
                </button>
              </div>            
            }

          {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}
            
          {/* Botones de Mostrar más y mostrar menos */}
          { sortedData.length >= 1 && 
          <div className="flex flex-col items-end justify-end gap-4">
              <div className="flex gap-2">
                <div className="flex justify-center">
                  <button onClick={handleShowMore} className="px-3 py-1 text-xs text-center text-white bg-gray-600 rounded hover:text-white hover:bg-blue-400">Mostrar más</button>
                </div>
                <div className="flex justify-center">
                  <button onClick={handleShowLess} className={`px-3 py-1 text-xs text-center text-white bg-gray-600 rounded ${sortedData.length > 8 && 'hover:text-white hover:bg-red-400'}`} disabled={itemsToShow === 8}>Mostrar menos</button>
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={() => itemsToShow >= preSortedData.length ? setItemsToShow(8) : setItemsToShow(preSortedData.length)}
                  className={`px-3 py-1 text-xs text-center text-white bg-gray-600 rounded hover:text-white ${itemsToShow >= sortedData.length ? 'hover:bg-red-400' : 'hover:bg-green-400'}`}>
                  {itemsToShow >= preSortedData.length ? 'No mostrar todos' : 'Mostrar todos'}
                </button>
              </div>
            </div>
            }
           
          </div>
        </div>
      </div>
    }      
    <ScrollToTopButton/>
    </>
  )
}
