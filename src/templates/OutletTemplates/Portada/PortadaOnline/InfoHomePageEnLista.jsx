import { useEffect, useState } from "react"
import { useGetDataPortadaPorEstado } from "../../../../hooks/Portada/useGetDataPortadaPorEstado"
import { useHandles } from "../../../../hooks/useHandles/useHandles"
import { fetchPlatformImagesPortada } from "../../../../hooks/useFetchsPlatforms"
import { useHandlePlatformMenus } from "../../../../hooks/useHandles"
import { RenderJuegosPortada } from "./PortadaOnlineHelpers/RenderJuegosPortada"
import { ordenarYLimitarJuegos } from "../../../helpers/constants/constants"
import { ChooseAddGamesMenuFlotante } from "../../../helpers/Utils/ChooseAddGamesMenuFlotante"
import { NoGamesPrompt, TitleCollection } from "./PortadaOnlineHelpers"

export function InfoHomePageEnLista() {
    const { juegosPortada, error, isLoading } = useGetDataPortadaPorEstado('En lista')
    const { handleTitleClick } = useHandles()
    const [platformImages, setPlatformImages] = useState({})
    const { chooseAddGamesMenuOpen, handleAddGameMenu } = useHandlePlatformMenus()

    useEffect(() => {
        fetchPlatformImagesPortada(juegosPortada, platformImages, setPlatformImages)
      }, [juegosPortada])

    if (isLoading)  return // <HomePageSkeleton/>
    if (error)  return <div> {/* Error: {error} */} </div>
    
    // Utilizar la función para ordenar y limitar los juegos - El true es para cambiar el orden 
    const juegosLimitados = ordenarYLimitarJuegos(juegosPortada, 4, true)

    return (
        <>
            <div className="relative px-6 py-8 sm:px-16">
                <div className="flex items-center gap-1 pb-4 mt-8 mb-2 lg:pb-8 sm:mt-0 lg:mt-12">
                   {/* Si NO hay juegos => No habilitamos el acceso a todos los juegos de la colección  */}
                   { juegosLimitados.length === 0 && 
                        <h2 className="relative z-20 text-xl font-bold uppercase lg:text-xl sm:text-base">En lista</h2>
                   }

                   {/* Si hay juegos => Habilitamos el acceso a todos los juegos de la colección  */}
                   { juegosLimitados.length >= 1 && 
                        <div>{TitleCollection('En lista', '/edit-game-to-list-en-lista')}</div> 
                    }
                </div>

                {/* Mostramos los juegos de la colección */}
                { juegosLimitados.length >=1 && 
                    <div className="relative z-10 grid grid-cols-2 gap-5 px-2 md:grid-cols-3 xl:grid-cols-4">
                        {RenderJuegosPortada(juegosLimitados, platformImages, handleTitleClick)}
                    </div>
                }

                {/* Opción de Añadir juegos si NO hay ninguno en la colección */}
                {juegosLimitados.length === 0 && 
                    <NoGamesPrompt personalizedTitle='¡No tienes juegos en tu lista!' personalizedSubtitle='Agrega juegos a tu lista para planificar tus próximas partidas.' handleAddGameMenu={handleAddGameMenu} />   
                }

                {/* Panel oculto de Elección de catálogo cuando NO hay juegos en la colección */}
                {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}
            </div>
        </>
    )
}

