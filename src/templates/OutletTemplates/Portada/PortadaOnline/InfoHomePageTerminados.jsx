import { useEffect, useState } from "react"
import { useGetDataPortadaPorEstado } from "../../../../hooks/Portada/useGetDataPortadaPorEstado"
import { useHandles } from "../../../../hooks/useHandles/useHandles"
import { fetchPlatformImagesPortada } from "../../../../hooks/useFetchsPlatforms"
import { useHandlePlatformMenus } from "../../../../hooks/useHandles"
import { ordenarYLimitarJuegos } from "../../../helpers/constants/constants"
import { ChooseAddGamesMenuFlotante } from "../../../helpers/Utils/ChooseAddGamesMenuFlotante"
import { RenderJuegosPortada } from "./PortadaOnlineHelpers/RenderJuegosPortada"
import { NoGamesPrompt, TitleCollection } from "./PortadaOnlineHelpers"

export function InfoHomePageTerminados() {
    const [platformImages, setPlatformImages] = useState({})
    const { juegosPortada, error, isLoading } = useGetDataPortadaPorEstado('Terminado')
    const { handleTitleClick } = useHandles()
    const { chooseAddGamesMenuOpen, handleAddGameMenu } = useHandlePlatformMenus()

    useEffect(() => {
        fetchPlatformImagesPortada(juegosPortada, platformImages, setPlatformImages)
      }, [juegosPortada])
    
    if (isLoading) return // <HomePageSkeleton/>
    if (error) return <div> {/* Error: {error} */} </div>

    // Utilizar la función para ordenar y limitar los juegos
    const juegosLimitados = ordenarYLimitarJuegos(juegosPortada, 4)

    return (
        <>
            <div className="relative px-2 pb-8 sm:py-4 sm:px-3 lg:px-8 sm:pl-20 lg:pl-20 lg:pr-8">
                <div className="flex items-center gap-1 pb-1 mt-0 mb-0 sm:pb-0 sm:mb-0 lg:pb-0 sm:mt-0">
                   {/* Si NO hay juegos => No habilitamos el acceso a todos los juegos de la colección  */}
                   {juegosLimitados.length === 0 && 
                        <h2 className="relative z-20 text-[15px] px-2 font-bold uppercase lg:text-xl sm:text-base">Terminados</h2>
                   }

                   {/* Si hay juegos => Habilitamos el acceso a todos los juegos de la colección  */}
                   { juegosLimitados.length >= 1 && 
                        <div>{TitleCollection('Terminados', '/edit-game-to-list-terminados')}</div> 
                    }
                </div>

                {/* Mostramos los juegos de la colección */}
                { juegosLimitados.length >= 1 && 
                    <div className="relative z-10 grid grid-cols-2 gap-3 px-0 sm:gap-0 md:gap-5 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4">
                        {RenderJuegosPortada(juegosLimitados, platformImages, handleTitleClick)}
                    </div>
                }

                {/* Opción de Añadir juegos si NO hay ninguno en la colección */}
                {juegosLimitados.length === 0 && 
                    <div className="px-2 mt-2">
                         <NoGamesPrompt personalizedTitle='¡No tienes juegos terminados!' personalizedSubtitle='Agrega tus juegos terminados para llevar un registro de tus logros.' handleAddGameMenu={handleAddGameMenu} />      
                     </div>            
                }

                {/* Panel oculto de Elección de catálogo cuando NO hay juegos en la colección */}
                {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}
            </div>
        </>
    )
}
