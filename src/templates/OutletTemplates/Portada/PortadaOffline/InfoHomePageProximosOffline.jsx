
import { useEffect, useState } from "react"
import { fetchPlatformImagesPortada } from "../../../../hooks/useFetchsPlatforms"
import { useGetDataPortadaPorEstadoOffline } from "../../../../hooks/Portada/useGetDataPortadaPorEstadoOffline"
import { GET_COLOR_CLASS, totalNotaMetacriticPrensa } from "../../../helpers/constants/constants"
import ImagesComunityHomepage from "./PortadaOfflineHelpers/ImagesComunityHomepage"
import { useVisibilityObserver } from "../../../../hooks/useVisibilityObserver"

export function InfoHomePageProximosOffline() {
    const [platformImages, setPlatformImages] = useState({})
    const { juegosPortada, error, isLoading } = useGetDataPortadaPorEstadoOffline('Próximos')
    const visibleItems = useVisibilityObserver(".observed-item", 0.3);
    const block7Id = "block7Id"
    // Ordenar juegos por fecha de actualización
    const juegosOrdenados = juegosPortada.sort((a, b) => new Date(a.position) - new Date(b.position))

    // Limitar la cantidad de juegos mostrados a 2
    const juegosLimitados = juegosOrdenados.slice(0, 4)
    
    useEffect(() => {
        fetchPlatformImagesPortada(juegosPortada, platformImages, setPlatformImages)
      }, [juegosPortada]);

    if (isLoading) return // <HomePageSkeleton/>
    
    if (error)     return <div> {/* Error: {error} */}  </div>
    
    return (
        <>
            <div className="relative p-8 pb-8 xl:pb-16 sm:px-16 bg-slate-950 lg:px-32 xl:px-48">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(9, 9, 11, 1), rgba(2, 6, 23, 1))', backgroundSize: 'cover', backgroundPosition: 'center center', height: '20%' }}/>
                <h2 data-id={block7Id} className={`transition duration-[1000ms] observed-item ease-out ${visibleItems[block7Id] ? "opacity-100 translate-x-0" : "opacity-0 translate-y-20" } relative z-20 flex gap-4 pb-4 text-sm font-bold lg:pb-8 lg:text-lg`}>Próximos de la comunidad</h2>
                <div data-id={block7Id} className={`transition duration-[1000ms] observed-item ease-out ${visibleItems[block7Id] ? "opacity-100 translate-x-0" : "opacity-0 translate-y-20" } relative z-20`}>
                    <ImagesComunityHomepage gamesBDByPlatform={juegosLimitados}/>
                </div>
                {/* <h3 className="relative z-20 flex items-center gap-1 pt-2 lg:pt-4 lg:text-xs text-[9px] uppercase">Nota media metacritic · <div className="pr-2">
                    <p className={`text-[10px] lg:text-xs text-gray-100 flex justify-center items-center rounded w-4 h-4 lg:w-5 lg:h-5 lg:px-4 px-3 text-end ${GET_COLOR_CLASS(totalNotaMetacriticPrensa(juegosLimitados))}`}>{totalNotaMetacriticPrensa(juegosLimitados)}</p>
                  </div>
                </h3>  */}
            </div>
        </>
    )
}

