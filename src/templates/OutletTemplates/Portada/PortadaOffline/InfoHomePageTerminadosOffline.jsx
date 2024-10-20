import { useEffect, useState } from "react"
import { useGetDataPortadaPorEstadoOffline } from "../../../../hooks/Portada/useGetDataPortadaPorEstadoOffline"
import { fetchPlatformImagesPortada } from "../../../../hooks/useFetchsPlatforms"
import ImagesHeadAddToGameList from "../../../helpers/components/Menus&IndexHelpers/ImagesAddToGameList/ImagesHeadAddToGameList"
import { GET_COLOR_CLASS, totalNotaMetacriticPrensa } from "../../../helpers/no-components/constants"

export function InfoHomePageTerminadosOffline() {
    const [platformImages, setPlatformImages] = useState({})
    const { juegosPortada, error, isLoading } = useGetDataPortadaPorEstadoOffline('Terminado')

    // Ordenar juegos por fecha de actualización
    const juegosOrdenados = juegosPortada.sort((a, b) => new Date(b.position) - new Date(a.position))

    // Limitar la cantidad de juegos mostrados a 2
    const juegosLimitados = juegosOrdenados.slice(0, 4)

    useEffect(() => {
        fetchPlatformImagesPortada(juegosPortada, platformImages, setPlatformImages)
      }, [juegosPortada])

    if (isLoading) return // <HomePageSkeleton/>
          
    if (error) return <div>{/* Error: {error} */}</div>
    
    return (
        <>
            <div className="relative p-8 sm:px-16 bg-zinc-950">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(3, 7, 18, 1), rgba(9, 9, 11, 1))', backgroundSize: 'cover', backgroundPosition: 'center center', height: '20%' }}/>
                <div className="relative z-20" >
                    <ImagesHeadAddToGameList gamesBDByPlatform={juegosLimitados}/>
                </div>
                <h2  className="relative z-20 flex gap-4 pt-4 text-sm font-semibold lg:pt-8 lg:text-lg">Terminados recientemente</h2>
                <h3 className="relative z-20 flex items-center gap-1 pt-2 lg:pt-4 lg:text-xs text-[9px] uppercase">Nota media metacritic · <div className="pr-2">
                    <p className={`text-[10px] lg:text-xs text-gray-100 flex justify-center items-center rounded w-4 h-4 lg:w-5 lg:h-5 lg:px-4 px-3 text-end ${GET_COLOR_CLASS(totalNotaMetacriticPrensa(juegosLimitados))}`}>{totalNotaMetacriticPrensa(juegosLimitados)}</p>
                    </div>
                </h3> 
            </div>
        </>
    )
}
