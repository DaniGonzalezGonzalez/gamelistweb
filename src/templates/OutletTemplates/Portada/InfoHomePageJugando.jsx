import { Link, useNavigate } from "react-router-dom";
import { HomePageSkeleton } from "../../helpers/components/Menus&IndexHelpers/Skeletons/HomePageSkeleton";
import { useGetDataPortadaPorEstado } from "../../../hooks/Portada/useGetDataPortadaPorEstado";
import { cleanTitle, scrollToTop } from "../../helpers/no-components/constants";
import { UpdateIcon } from "../../../assets/Icons/UpdateIcon";
import { CompleteIcon } from "../../../assets/Icons/CompleteIcon";
import { PlayIcon } from "../../../assets/Icons/PlayIcon";
import { ArrowRight } from "../../../assets/Icons/ArrowRight";
import { useEffect, useState } from "react";
import { fetchPlatformImagesJugandoYCompletando } from "../../../hooks/useFetchsPlatforms";


export function InfoHomePageJugando() {
  const { juegosPortada: juegosJugando, error: errorJugando, isLoading: isLoadingJugando } = useGetDataPortadaPorEstado('Jugando');
  const { juegosPortada: juegosCompletando, error: errorCompletando, isLoading: isLoadingCompletando } = useGetDataPortadaPorEstado('Completando');
  const navigate = useNavigate();

  const [platformImages, setPlatformImages] = useState({});

  useEffect(() => {
    fetchPlatformImagesJugandoYCompletando(juegosJugando, juegosCompletando, platformImages, setPlatformImages)
  }, [juegosJugando, juegosCompletando]);


  if (isLoadingJugando || isLoadingCompletando) {
    return <HomePageSkeleton />;
  }

  if (errorJugando || errorCompletando) {
    return (
      <div className="flex justify-center p-4 pt-12 text-center bg-gray-950">
        <p className="p-1 bg-red-700 rounded">Página en mantenimiento. Gracias por tu paciencia</p>
      </div>
    );
  }
  
  // Ordenar juegos por fecha de actualización
  const juegosJugandoOrdenados = juegosJugando.sort((a, b) => new Date(b.fechaActualizacion) - new Date(a.fechaActualizacion));
  const juegosCompletandoOrdenados = juegosCompletando.sort((a, b) => new Date(b.fechaActualizacion) - new Date(a.fechaActualizacion));
  
  // Limitar la cantidad de juegos mostrados
  const juegosJugandoLimitados = juegosJugandoOrdenados.slice(0, 2);
  const juegosCompletandoLimitados = juegosCompletandoOrdenados.slice(0, 4);

  const handleTitleClick = (gameId) => {
    scrollToTop();
    navigate(`/game/${'Juegos'}/${gameId}`)
  };

  // const handlePlatformImage = async (platform) => {
  //   const platformImageUrl = await getPlatformImageUrl(platform)
  //   console.log('Obtengo la url de la plataforma', platformImageUrl)
  // }

  return (
    <div className="relative px-8 pb-20 sm:px-16 pt-36 bg-gray-950">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))', backgroundSize: 'cover', backgroundPosition: 'center center', height: '20%' }}
      />
      <h2 className="relative z-20 flex gap-4 pb-4 mt-4 text-xl font-semibold uppercase">Jugando</h2>

      <div className="relative z-10 grid grid-cols-1 gap-10 py-4 sm:gap-14 md:gap-18 xl:gap-24 sm:grid-cols-2">
        {juegosJugandoLimitados.map((item, index) => (
          <div key={index}>
            {/* {console.log(handlePlatformImage(item.plataforma))} */}
            <div className="flex items-center justify-center gap-3 duration-500 sm:flex hover:scale-105 hover:shadow-white opacity-95 hover:opacity-100">
              <div className="w-full h-full">
                <button
                  onClick={() => handleTitleClick(item.id)}
                  className="relative flex items-center justify-center w-full gap-3 shadow-md sm:flex hover:rounded-lg"
                >
                  <img className="object-cover w-full h-40 duration-500 ease-in-out border-4 border-transparent rounded-lg lg:h-72 2xl:h-96 ransition hover:border-4 hover:rounded-lg hover:border-gray-300" src={item?.imageUrl} alt="No hay imagen" />
                  <img
                    className="absolute object-contain w-8 h-8 p-1 bg-gray-200 rounded-lg shadow right-2 bottom-2 shadow-black"
                    src={platformImages[item.plataforma]} 
                    alt="No hay imagen"
                    title={`Plataforma: ${item?.plataforma || 'Sin plataforma especificada'}`}
                  />
                  {item.rejugando === 'SI' && (
                    <div title="Rejugando" className="absolute flex items-center justify-center object-contain w-6 h-6 py-1 text-xs bg-green-600 rounded-lg shadow left-2 bottom-2 shadow-black">
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
      </div>
      <div className="relative z-10 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {juegosCompletandoLimitados.map((item, index) => (
              <div key={index}>
                  <div className="flex items-center justify-center gap-1 duration-500 sm:flex hover:scale-105 hover:shadow-white opacity-95 hover:opacity-100">
                      <div className="w-full h-full">
                          <button onClick={() => handleTitleClick(item.id)} className="relative flex items-center justify-center w-full gap-3 shadow-md sm:flex hover:rounded">
                              <img className="object-cover w-full h-40 transition duration-500 ease-in-out border-2 border-transparent rounded-lg hover:border-2 hover:rounded-lg hover:border-gray-300" src={item?.imageUrl} alt="No hay imagen" />
                              <img className="absolute object-contain w-8 h-8 p-1 bg-gray-200 rounded-lg shadow right-2 bottom-2 shadow-black" src={platformImages[item.plataforma]} alt="No hay imagen" title={`Plataforma: ${item?.plataforma || 'Sin plataforma especificada'}`} />
                              {item.rejugando === 'NO' && <div title="Completando" className="absolute flex justify-center object-contain w-6 h-6 p-1 text-xs bg-gray-700 rounded-lg shadow left-2 bottom-2 shadow-black"><CompleteIcon w="4" h="4"/></div>}
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
      </div>

      <div className="flex flex-col md:flex-row md:gap-5">
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center p-1 bg-blue-400 rounded">
            <PlayIcon w="4" h="4"/>
          </div>
          <Link onClick={scrollToTop} className="flex items-center justify-end gap-3 text-xs font-thin" to="/admin-edit-game-to-list-jugando">
            Ver Jugando
            <div className="flex items-center gap-2 text-xs">
              {/* {juegosJugandoOrdenados.length} */}
              <ArrowRight />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center p-1 bg-gray-700 rounded">
            <CompleteIcon w="4" h="4"/>
          </div>
          <Link onClick={scrollToTop} className="flex items-center justify-end gap-3 text-xs font-thin" to="/admin-edit-game-to-list-completando">
            Ver Completando
            <div className="flex items-center gap-2 text-xs">
              {/* {juegosCompletandoOrdenados.length} */}
              <ArrowRight />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
