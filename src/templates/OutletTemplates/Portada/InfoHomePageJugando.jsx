import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, CompleteIcon, PlayIcon, UpdateIcon } from "../../../assets/Icons"
import { useGetDataPortadaPorEstado } from "../../../hooks/Portada/useGetDataPortadaPorEstado"
import { useHandles } from "../../../hooks/useHandles/useHandles"
import { useHandlePlatformMenus } from "../../../hooks/useHandles"
import { cleanTitle, GET_STATE_BACKGROUND, ordenarYLimitarJuegos, scrollToTop } from "../../helpers/no-components/constants"
import { HomePageSkeleton } from "../../helpers/components/Menus&IndexHelpers/Skeletons/HomePageSkeleton"
import { ChooseAddGamesMenuFlotante } from "../../helpers/components/Utils/ChooseAddGamesMenuFlotante"

export function InfoHomePageJugando() {
  const { juegosPortada: juegosJugando, error: errorJugando, isLoading: isLoadingJugando } = useGetDataPortadaPorEstado('Jugando')
  const { juegosPortada: juegosCompletando, error: errorCompletando, isLoading: isLoadingCompletando } = useGetDataPortadaPorEstado('Completando')
  const { handleTitleClick } = useHandles()
  const { chooseAddGamesMenuOpen, handleAddGameMenu } = useHandlePlatformMenus()

  if (isLoadingJugando || isLoadingCompletando) return <HomePageSkeleton />
  if (errorJugando || errorCompletando) {
    return (
      <div className="flex justify-center p-4 pt-12 text-center bg-gray-950">
        <p className="p-1 bg-red-700 rounded">Página en mantenimiento. Gracias por tu paciencia</p>
      </div>
    )
  }

  // Utilizar la función para ordenar y limitar los juegos
  const juegosJugandoLimitados = ordenarYLimitarJuegos(juegosJugando, 4)
  const juegosCompletandoLimitados = ordenarYLimitarJuegos(juegosCompletando, 4)

  return (
    <div className="relative px-8 pt-20 pb-5 sm:px-16 sm:pt-14 lg:pt-20 sm:pb-10 lg:pb-20">
      {/* <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))', backgroundSize: 'cover', backgroundPosition: 'center center', height: '20%' }}
      /> */}
      <h2 className="relative z-20 flex gap-4 pb-1 mt-4 text-xl font-semibold uppercase lg:pb-5 lg:text-xl sm:text-base">Jugando</h2>
 
    {  juegosJugandoLimitados.length >=1 &&   
        <div className={`relative z-10 grid grid-cols-1 gap-3 py-3 md:gap-10 sm:gap-5 md:gap-18 xl:gap-24 
          ${juegosJugandoLimitados.length === 1 && 'xl:grid-cols-2'}
          ${juegosJugandoLimitados.length === 2 && 'sm:grid-cols-2'}
          ${juegosJugandoLimitados.length === 3 && 'sm:grid-cols-3 grid-cols-2'}
          ${juegosJugandoLimitados.length === 4 && 'grid-cols-2 lg:grid-cols-4'}
          `}>
        {juegosJugandoLimitados.map((item, index) => (
          <div key={index}>
            <div className={`flex items-center justify-center gap-3 duration-500 sm:flex hover:scale-105 hover:shadow-white opacity-95 hover:opacity-100`}>
              <div className="w-full h-full">
                <button onClick={() => handleTitleClick(item.id)} className="relative flex items-center justify-center w-full gap-3 shadow-md sm:flex hover:rounded-lg">
                  <img className="object-cover w-full h-40 transition duration-500 ease-in-out border-2 border-transparent rounded-lg lg:h-72 2xl:h-96 hover:rounded-lg hover:border-gray-200" src={item.imageUrl ?? item.url[0]} alt="No hay imagen" />
                  <img className={`absolute object-contain w-8 h-8 p-1 bg-gray-200 rounded-lg shadow right-3 bottom-3 shadow-black`}
                  src={`/platformImages/${item.plataforma.replace(/\s+/g, '-').trim()}-Logo.webp`} alt="No hay imagen" title={`Plataforma: ${item?.plataforma || 'Sin plataforma especificada'}`} />

                  {item.rejugando === 'SI' && (
                    <div title="Rejugando" className="absolute flex items-center justify-center object-contain w-6 h-6 py-1 text-xs bg-green-600 rounded-lg shadow left-3 bottom-3 shadow-black">
                      <UpdateIcon w="4" h="4"/>
                    </div>
                  )}
                </button>
                <div className="sm:w-2/3">
                  <div className="flex justify-between gap-8 py-3 text-justify">
                    <p className="text-xs text-gray-200 text-start">{cleanTitle(item?.titulo)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>}

      {juegosJugandoLimitados.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-800 border-2 border-gray-600 border-dashed rounded-lg">
          <h3 className="mb-4 text-lg font-semibold text-gray-300">¡No tienes juegos en curso!</h3>
          <p className="mb-4 text-gray-400">Agrega tus juegos favoritos para comenzar a jugar y llevar un registro.</p>
          <button
            onClick={handleAddGameMenu}
            className="flex items-center px-4 py-2 text-sm font-medium text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Agregar Juegos
            <span className="ml-2">➕</span>
          </button>
        </div>
      )}

    {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}

    { juegosCompletandoLimitados.length >= 1 && 
        <div className={`relative z-10 grid grid-cols-1 gap-3 py-4 md:gap-10 sm:gap-5 md:gap-18 xl:gap-24
      ${juegosCompletandoLimitados.length === 1 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}  
      ${juegosCompletandoLimitados.length === 2 && 'grid-cols-2 lg:grid-cols-4'}  
      ${juegosCompletandoLimitados.length === 3 && 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'} 
      ${juegosCompletandoLimitados.length === 4 && 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}   
      `}>
          {juegosCompletandoLimitados.map((item, index) => (
              <div key={index}>
                  <div className="flex items-center justify-center gap-1 duration-500 sm:flex hover:scale-105 hover:shadow-white opacity-95 hover:opacity-100">
                      <div className="w-full h-full">
                          <button onClick={() => handleTitleClick(item.id)} className="relative flex items-center justify-center w-full gap-3 shadow-md sm:flex hover:rounded">
                              <img className="object-cover w-full transition duration-500 ease-in-out border-2 border-transparent rounded-lg h-36 lg:h-40 hover:border-2 hover:rounded-lg hover:border-gray-300" src={item.imageUrl ?? item.url[0]} alt="No hay imagen" />
                              <img className="absolute object-contain w-8 h-8 p-1 bg-gray-200 rounded-lg shadow right-2 bottom-2 shadow-black" src={`/platformImages/${item.plataforma.replace(/\s+/g, '-').trim()}-Logo.webp`} alt="No hay imagen" title={`Plataforma: ${item?.plataforma || 'Sin plataforma especificada'}`} />
                              {item.rejugando !== 'SI' && <div title="Completando" className="absolute flex justify-center object-contain w-6 h-6 p-1 text-xs bg-gray-700 rounded-lg shadow left-2 bottom-2 shadow-black"><CompleteIcon w="4" h="4"/></div>}
                              {item.rejugando === 'SI' && item.estado === 'Completando' && 
                              <div title="Completando y rejugando" className="absolute flex items-center justify-center object-contain w-12 h-8 gap-1 py-1 text-xs left-2 bottom-2">
                                <div className="p-1 bg-gray-700 rounded-lg shadow shadow-black"><CompleteIcon w="4" h="4"/></div>
                                <div className="p-1 bg-green-700 rounded-lg shadow shadow-black"><UpdateIcon w="4" h="4"/></div>
                              </div>}
                          </button>
                          <div className="sm:w-2/3">
                              <div className="flex flex-col gap-8 py-3 text-start">
                                  <p className="text-xs text-gray-200">{cleanTitle(item?.titulo)}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
       </div>}

      <div className="flex flex-col md:flex-row md:gap-5">
        { juegosJugandoLimitados.length >= 1 && 
          <div className="flex items-center gap-3">          
            <Link onClick={scrollToTop} className="flex items-center justify-end gap-3 text-xs font-thin" to="/edit-game-to-list-jugando">
            <div className={`flex items-center p-1.5 ${GET_STATE_BACKGROUND('Jugando')} rounded`}>
              <PlayIcon w={5} h={5}/>
            </div>
              Ver Jugando<div className="flex items-center gap-2 text-xs"><ArrowRight /></div>
            </Link>
          </div>
        }
          
        { juegosCompletandoLimitados.length >=1 && 
          <div className="flex items-center gap-3 mt-3">
            <Link onClick={scrollToTop} className="flex items-center justify-end gap-3 text-xs font-thin" to="/edit-game-to-list-completando">
            <div className={`flex items-center p-1 ${GET_STATE_BACKGROUND('Completando')} rounded`}>
              <CompleteIcon/>
            </div>
              Ver Completando<div className="flex items-center gap-2 text-xs"><ArrowRight /></div>
            </Link>
          </div>
        }
      </div>
    </div>
  )
}
