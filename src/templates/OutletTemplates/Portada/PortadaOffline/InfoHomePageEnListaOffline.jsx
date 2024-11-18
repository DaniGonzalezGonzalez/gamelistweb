
import { useEffect, useState } from "react"
import { fetchPlatformImagesPortada } from "../../../../hooks/useFetchsPlatforms"
import { useGetDataPortadaPorEstadoOffline } from "../../../../hooks/Portada/useGetDataPortadaPorEstadoOffline"
import { GET_COLOR_CLASS, totalNotaMetacriticPrensa } from "../../../helpers/constants/constants"
import ImagesComunityHomepage from "./PortadaOfflineHelpers/ImagesComunityHomepage"

export function InfoHomePageEnListaOffline() {
    const [platformImages, setPlatformImages] = useState({})
    const { juegosPortada, error, isLoading } = useGetDataPortadaPorEstadoOffline('En lista')

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
            <div className="relative p-8 pb-14 sm:px-16 bg-slate-950">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(9, 9, 11, 1), rgba(2, 6, 23, 1))', backgroundSize: 'cover', backgroundPosition: 'center center', height: '20%' }}/>
                <div className="relative z-20">
                    <ImagesComunityHomepage gamesBDByPlatform={juegosLimitados}/>
                </div>
                <h2  className="relative z-20 flex gap-4 pt-4 text-sm font-semibold lg:pt-8 lg:text-lg">En Lista de la comunidad</h2>
                <h3 className="relative z-20 flex items-center gap-1 pt-2 lg:pt-4 lg:text-xs text-[9px] uppercase">Nota media metacritic · <div className="pr-2">
                    <p className={`text-[10px] lg:text-xs text-gray-100 flex justify-center items-center rounded w-4 h-4 lg:w-5 lg:h-5 lg:px-4 px-3 text-end ${GET_COLOR_CLASS(totalNotaMetacriticPrensa(juegosLimitados))}`}>{totalNotaMetacriticPrensa(juegosLimitados)}</p>
                  </div>
                </h3> 
            </div>
        </>
    )
}

