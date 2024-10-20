/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useEditGameToList } from "../../../hooks/useEditGameToList";
import { cleanTitle, GET_COLOR_CLASS, GET_STATE_BACKGROUND, totalTiempoMainStory } from "../../helpers/no-components/constants"
import { ScrollToTopButton } from "../../helpers/components/Menus&IndexHelpers/ScrollToTopButton"
import { ArrowRight, ArrowLeft, Dots, EyeSlash } from "../../../assets/Icons"
import { useHandlePlatformMenus, useHandles } from "../../../hooks/useHandles"
import { useFetchDataAndSort } from "../../../hooks/useFetchDataAndSort"
import { GET_STATE_ICON, useDebounce } from "../../helpers/no-components/constantsComponents"
import { ChooseAddGamesMenuFlotante } from "../../helpers/components/Utils/ChooseAddGamesMenuFlotante"

export function EditGametoListByState({ estadoPluralMinusculas, estadoSingularMayusculas, nombreColeccion }) {
  const [contenido, setContenido] = useState({})
  const [option, setOption] = useState('Juegos')
  const [fechaActualizacion, setFechaActualizacion] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)
  const [visibleItemId, setVisibleItemId] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [isDisabled, setIsDisabled] = useState(true)

  const { fetchData, dataBD, error, user, sortedData, setItemsToShow, setSearchTerm, setSortBy, setSortDirection, itemsToShow, searchTerm, sortBy, noGamesLoaded  } = useFetchDataAndSort(estadoSingularMayusculas)
  const { handleSubmit } = useEditGameToList(contenido.idDoc, option, estadoPluralMinusculas)
  const { handleShowMore, handleShowAll, handleShowInitial, handleShowLess, handleTitleClick, handleUpPosition, handleDownPosition, shouldFetchData, setShouldFetchData } = useHandles(handleSubmit, setContenido, setFechaActualizacion, setEditingItem, setIsDisabled, isDisabled, setItemsToShow, itemsToShow, contenido)
  const { chooseAddGamesMenuOpen, handleAddGameMenu } = useHandlePlatformMenus()
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
    
  useEffect(() => {
      if (dataBD.length > 0) {
        const randomIndex = Math.floor(Math.random() * dataBD.length);
        const randomImage = dataBD[randomIndex]?.imageUrl ?? dataBD[randomIndex]?.url[0]
        setSelectedImage(randomImage)
      } 
  }, [dataBD])
   
  
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

  useEffect(() => {
    if (shouldFetchData) {
      fetchData();
      setShouldFetchData(false)
    }
  }, [shouldFetchData])
  
  const toggleVisibility = (id) => {
    setVisibleItemId((prevId) => (prevId === id ? null : id))
  }

  return (
    <> 
    { user.id && 
        <div>
          {error && (<div className="items-center justify-center h-screen"><span className="text-xl text-gray-900 font-montserrat">{error.message}</span></div>)}
          <div className="min-h-screen pb-10 bg-gray-950">
            <div className={`flex flex-col justify-center w-full p-4 text-center ${GET_STATE_BACKGROUND(estadoSingularMayusculas)} pt-28 sm:pt-10 lg:pt-32`}>
                <div className="relative flex justify-center mb-5">
                  <div className="w-80 sm:w-96">
                    <div className="relative w-80 sm:w-96">
                      <img className="object-cover w-full h-32 border-2 rounded-lg animate-border-animation sm:h-28 lg:h-60" src={selectedImage} alt='Cargando...' />
                      <div className="absolute inset-0 bg-black border-2 border-opacity-100 rounded-lg opacity-60"></div>
                      <h2 className="absolute inset-0 flex items-center justify-center p-3 text-lg font-semibold text-center text-white uppercase sm:text-3xl">
                        {nombreColeccion}
                      </h2> 
                      <div className="absolute inset-0 flex items-end justify-start p-3 font-semibold text-center text-white">
                        <div className="flex justify-start w-full gap-2 font-thin text-white sm:w-80">
                            <div className="flex items-center justify-center gap-1 pr-2 text-xs border-r"><span className="font-bold">{dataBD.length}</span> <div className="uppercase">JUEGOS</div></div>
                            <div className="flex items-center justify-center gap-1 text-xs"><span className="font-bold">{totalTiempoMainStory(dataBD)}</span> <div className="uppercase">Horas</div></div>                        
                          </div>
                      </div>
                    </div>
                  </div>
                </div>          
            </div>

            <div className="container px-8 pb-8 mx-auto">             
              <div className="flex justify-between h-6 my-14"><input type="text" placeholder="Buscar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-32 p-1 py-4 pl-2 text-xs text-white placeholder-white bg-gray-700 border-2 appearance-none rounded-xl sm:40 sm:p-4 sm:w-52 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"/>
              
              { sortedData.length >= 1 &&
                <div className="flex flex-col items-end gap-4 text-xs">
                  <select className="w-32 bg-gray-300 rounded sm:w-32" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="position">Personalizado</option>
                    {/* <option value="fechaActualizacion">Fecha de edición</option> */}
                    <option value="titulo">Título</option>
                    <option value="plataforma">Plataforma</option>
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
              }
            </div>

          {/* Mostrar mensaje cuando no se encuentren juegos filtrados */}
          {debouncedSearchTerm.trim() !== "" && sortedData.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full pt-5">
                <img src="/Imagen-no-encontrado.webp" alt="No se encontraron juegos" className="w-20 h-20 mb-4"/>
                <p className="mt-4 text-sm font-semibold text-white lg:text-lg">¡No se encontraron juegos!</p>
              </div>
            )}

          { sortedData.length >= 1 && 
            <div className="grid grid-cols-2 gap-6 px-0 py-5 mx-auto lg:px-5 xs:px-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {sortedData
              .map((item, index) => (
                  <div key={index} className="flex justify-center rounded">                 
                    { <div className="w-full">
                        {(item?.infouser === user.email && item?.estado === estadoSingularMayusculas) &&                     
                          <div className="flex justify-center w-full gap-10 mb-10 text-lg font-bold text-gray-800 rounded">
                            <div className="h-full w-80 sm:w-56 xl:w-48 2xl:w-60">
                              <button onClick={() => handleTitleClick(item.id)} className="relative flex items-center justify-center w-full gap-3 shadow-md sm:flex hover:rounded-lg">
                                <img className="object-cover w-full h-40 transition duration-500 ease-in-out border-2 border-transparent rounded-lg xl:h-48 2xl:h-52 hover:border-2 hover:rounded-lg hover:border-gradient" src={item.imageUrl ?? item.url[0]} alt="No hay imagen"></img>                             
                                <img className="absolute object-contain w-8 h-8 p-1 bg-gray-200 rounded-lg shadow right-2 bottom-2 shadow-black" src={`/platformImages/${item.plataforma.replace(/\s+/g, '-').trim()}-Logo.webp`} alt="No hay imagen" title={`Plataforma: ${item?.plataforma || 'Sin plataforma especificada'}`}></img>
                                <div className="absolute flex items-center justify-center object-contain rounded-lg shadow left-2 bottom-2 shadow-black" title="Nota personal">
                                  { item?.notaJuego !== undefined && item?.notaJuego !== null && item.notaJuego !== '' && 
                                    <p className={`text-xs text-gray-100 flex justify-center items-center rounded px-2 w-6 h-6 py-1 text-end ${GET_COLOR_CLASS(item?.notaJuego)}`}>
                                      {item?.notaJuego}
                                    </p>
                                  }
                                </div>

                              { visibleItemId === item.id && sortBy === 'position' && 
                                  <div className="absolute object-contain w-full h-40 p-1 rounded-lg shadow xl:h-48 2xl:h-52 shadow-black" onClick={(e) => e.stopPropagation()}>
                                    <div className="relative z-10 flex items-center justify-center h-full">
                                      <div className="text-white transition duration-300 hover:scale-150" onClick={() => handleUpPosition(item, sortedData)}>
                                        <ArrowLeft w={12} h={12}/>
                                      </div>
                                      <p className="text-xs text-white lg:text-sm">Mover juego</p>
                                      <div className="text-white transition duration-300 hover:scale-150" onClick={() => handleDownPosition(item, sortedData)}>
                                        <ArrowRight w={12} h={12}/>
                                      </div>
                                    </div>
                                    <div className="absolute inset-0 z-0 bg-gray-800 rounded-lg bg-opacity-80"></div> 
                                  </div>
                                }
                              </button>                       
                           
                              {/* Solo muestra o habilita los botones si la opción seleccionada es "Personalizado" */}
                              <div className="w-full">
                                <div className="flex justify-between gap-8 pt-3 pb-1 text-justify">
                                  <p className="text-xs text-white text-start">{cleanTitle(item?.titulo)}</p>
                                </div>
                                <div className="pb-2 lg:pb-2">
                                  <p className="text-xs text-white uppercase descripcion text-start">{item?.descripcion}</p>
                                </div>
                                <div className="flex flex-col justify-between w-full">
                                  <div className="flex items-center justify-between">
                                    <div className={`text-xs rounded flex items-center gap-1 text-gray-100 text-start`}>
                                      <div className={`rounded`}>{GET_STATE_ICON(item.estado, '4', '4')}</div>
                                      <span className="text-[10px] lg:text-[11px] py-1 font-semibold">{item?.estado}</span>
                                    </div>                                      
                                    {sortBy === 'position' && 
                                      <button className="text-white" onClick={() => toggleVisibility(item.id)}>
                                        {visibleItemId === item.id ? <div className="p-1">
                                          <EyeSlash w={5} h={5}/>
                                        </div> : <Dots w={7} h={7}/>}
                                      </button> 
                                    } 
                                  </div>                                
                                </div>
                              </div>                                             
                            </div>
                          </div>
                        }
                      </div>
                    }
                  </div>                
                ))
              }
            </div>
          }


          { noGamesLoaded && 
            <div className="flex flex-col items-center justify-center p-6 mt-20 mb-6 bg-gray-800 border-2 border-gray-600 border-dashed rounded-lg">
              <img src="/Imagen-no-encontrado.webp" alt="No hay juegos" className="w-20 h-20 mb-4"/>
              <h3 className="mb-4 text-lg font-semibold text-gray-300">
                ¡No tienes juegos en <span className="capitalize">{estadoPluralMinusculas === 'lista-de-deseos' ? estadoSingularMayusculas : estadoPluralMinusculas}</span>!
              </h3>
              <p className="mb-4 text-gray-400">Agrega tus juegos y empieza tu colección.</p>
              <button onClick={handleAddGameMenu} className="flex items-center px-4 py-2 text-sm font-medium text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700">
                Agregar Juegos
                <span className="ml-2">➕</span>
              </button>
            </div>            
          }

          {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}


          { sortedData.length >= 1 && 
              <div className="flex flex-col justify-end gap-5">
                <div className="flex justify-end gap-2">
                  <div className="flex justify-center">
                    <button onClick={handleShowMore} className="px-3 py-1 text-xs text-center text-white bg-gray-600 rounded hover:text-white hover:bg-blue-400">Mostrar más</button>
                  </div>
                  <div className="flex justify-center">
                    <button onClick={handleShowLess} className={`px-3 py-1 text-xs text-center text-white bg-gray-600 rounded ${sortedData.length > 8 && 'hover:text-white hover:bg-red-400'}`} disabled={itemsToShow === 8}>Mostrar menos</button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => itemsToShow >= dataBD.length ? handleShowInitial() : handleShowAll(dataBD.length)} className={`px-3 py-1 text-xs text-center text-white bg-gray-600 rounded hover:text-white ${itemsToShow >= sortedData.length ? 'hover:bg-red-400' : 'hover:bg-green-400'}`}>
                    {itemsToShow >= dataBD.length ? 'No mostrar todos' : 'Mostrar todos'}
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
