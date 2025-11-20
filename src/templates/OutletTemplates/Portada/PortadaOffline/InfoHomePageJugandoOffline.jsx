import { useEffect, useState } from "react"
import { useGetDataPortadaPorEstadoOffline } from "../../../../hooks/Portada/useGetDataPortadaPorEstadoOffline"
import { fetchPlatformImagesJugandoYCompletando } from "../../../../hooks/useFetchsPlatforms"
import { GET_COLOR_CLASS, totalNotaMetacriticPrensa } from "../../../helpers/constants/constants"
import { HomePageSkeleton } from "../../../helpers/Utils/Skeletons/HomePageSkeleton"
import ImagesComunityHomepage from "./PortadaOfflineHelpers/ImagesComunityHomepage"
import { useVisibilityObserver } from "../../../../hooks/useVisibilityObserver"

export function InfoHomePageJugandoOffline() {
  const [platformImages, setPlatformImages] = useState({})
  const { juegosPortada: juegosJugando, error: errorJugando, isLoading: isLoadingJugando } = useGetDataPortadaPorEstadoOffline('Jugando')
  const { juegosPortada: juegosCompletando, error: errorCompletando, isLoading: isLoadingCompletando } = useGetDataPortadaPorEstadoOffline('Completando')
  const visibleItems = useVisibilityObserver(".observed-item", 0.3);
  const block5Id = "block5Id"

  // Ordenar juegos por fecha de actualización
  const juegosJugandoOrdenados = juegosJugando.sort((a, b) => new Date(b.position) - new Date(a.position))
  
  // Limitar la cantidad de juegos mostrados
  const juegosJugandoLimitados = juegosJugandoOrdenados.slice(0, 2)

  useEffect(() => {
    fetchPlatformImagesJugandoYCompletando(juegosJugando, juegosCompletando, platformImages, setPlatformImages)
  }, [juegosJugando, juegosCompletando])


  if (isLoadingJugando || isLoadingCompletando) return <HomePageSkeleton />
  
  if (errorJugando || errorCompletando) {
    return (
      <div className="flex justify-center p-4 pt-12 text-center bg-gray-950">
        <p className="p-1 bg-red-700 rounded">Página en mantenimiento. Gracias por tu paciencia</p>
      </div>
    )
  } 

  return (
    <div className="relative px-8 pt-20 pb-4 sm:pt-10 sm:px-16 lg:pt-36 lg:px-32 xl:px-48 bg-gray-950">
      <div className="absolute top-0 left-0 w-full h-full"
        style={{ backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))', backgroundSize: 'cover', backgroundPosition: 'center center', height: '20%' }} />
      <h2 data-id={block5Id} className={`transition duration-[1000ms] observed-item ease-out ${visibleItems[block5Id] ? "opacity-100 translate-x-0" : "opacity-0 translate-y-20" } relative z-20 flex w-full xl:items-center xl:justify-center gap-4 pt-14 pb-10 text-lg font-bold sm:pt-8 xl:text-3xl xl:text-center xl:font-light xl:pb-20`}>¿Qué tiene la comunidad en sus colecciones?</h2>
      <h2 data-id={block5Id} className={`transition duration-[1000ms] observed-item ease-out ${visibleItems[block5Id] ? "opacity-100 translate-x-0" : "opacity-0 translate-y-20" }  relative z-20 flex gap-4 pb-4 text-sm font-bold lg:pb-8 lg:text-lg`}>Se está jugando</h2> 
      <div data-id={block5Id} className={`transition duration-[1000ms] observed-item ease-out ${visibleItems[block5Id] ? "opacity-100 translate-x-0" : "opacity-0 translate-y-20" }`}>
        <ImagesComunityHomepage gamesBDByPlatform={juegosJugandoLimitados}/>
      </div>
      {/* <h3 className="relative z-20 flex items-center gap-1 pt-2 lg:pt-4 lg:text-xs text-[9px] uppercase">Nota media metacritic · 
        <div className="pr-2">
          <p className={`text-[10px] lg:text-xs text-gray-100 flex justify-center items-center rounded w-4 h-4 lg:w-5 lg:px-4 px-3 lg:h-5 text-end ${GET_COLOR_CLASS(totalNotaMetacriticPrensa(juegosJugandoLimitados))}`}>{totalNotaMetacriticPrensa(juegosJugandoLimitados)}</p>
        </div>
      </h3>  */}
    </div>
  )
}
