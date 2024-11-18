import { useGetDataPortadaPorEstado } from "../../../../hooks/Portada/useGetDataPortadaPorEstado"
import { useHandles } from "../../../../hooks/useHandles/useHandles"
import { useHandlePlatformMenus } from "../../../../hooks/useHandles"
import { ordenarYLimitarJuegos } from "../../../helpers/constants/constants"
import { ChooseAddGamesMenuFlotante } from "../../../helpers/Utils/ChooseAddGamesMenuFlotante"
import { RenderCompletando } from "./PortadaOnlineHelpers/renderCompletando"
import { RenderJugando } from "./PortadaOnlineHelpers/renderJugando"
import { TitleCollection } from "./PortadaOnlineHelpers/TitleCollection"
import { NoGamesPrompt } from "./PortadaOnlineHelpers"
import { HomePageSkeleton } from "../../../helpers/Utils/Skeletons/HomePageSkeleton"

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
      <div className="relative px-6 pt-20 pb-5 sm:px-16 sm:pt-14 lg:pt-20 sm:pb-10 lg:pb-20">
        <div className="flex items-center gap-1 pb-1 mt-4 lg:pb-5">
          {/* Si NO hay juegos => No habilitamos el acceso a todos los juegos de la colección  */}
          { juegosJugandoLimitados.length === 0 && 
              <h2 className="relative z-20 flex gap-4 text-xl font-semibold uppercase lg:text-xl sm:text-base">Jugando</h2>
          }

          {/* Si hay juegos => Habilitamos el acceso a todos los juegos de la colección  */}
          { juegosJugandoLimitados.length >= 1 &&
              <div>{TitleCollection('Jugando', '/edit-game-to-list-jugando')}</div> 
          }
        </div>

        {/* Mostramos los juegos de la colección */}
        { juegosJugandoLimitados.length >= 1 &&        
            <div className={`relative z-10 grid grid-cols-1 gap-3 py-3 sm:gap-5 md:gap-8 xl:gap-10
              ${juegosJugandoLimitados.length === 1 && 'xl:grid-cols-2'}
              ${juegosJugandoLimitados.length === 2 && 'sm:grid-cols-2'}
              ${juegosJugandoLimitados.length === 3 && 'sm:grid-cols-3 grid-cols-2'}
              ${juegosJugandoLimitados.length === 4 && 'grid-cols-2 lg:grid-cols-4'}
              `}>
              {RenderJugando(juegosJugandoLimitados, handleTitleClick)}
            </div>
        }

        {/* Opción de Añadir juegos si no hay ninguno en la colección */}
        {juegosJugandoLimitados.length === 0 && 
          <div className="mt-6">
              <NoGamesPrompt personalizedTitle="¡No tienes juegos en curso!" personalizedSubtitle="Agrega tus juegos favoritos para comenzar a jugar y llevar un registro." handleAddGameMenu={handleAddGameMenu} />
          </div>     
        }

        {/* Mostramos los juegos de la colección */}
        { juegosCompletandoLimitados.length >= 1 && 
            <div>
              {TitleCollection('Completando', '/edit-game-to-list-completando')}
              <div className={`relative z-10 grid grid-cols-1 gap-3 py-4 md:gap-10 sm:gap-5 md:gap-18 xl:gap-24
                    ${juegosCompletandoLimitados.length === 1 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}  
                    ${juegosCompletandoLimitados.length === 2 && 'grid-cols-2 lg:grid-cols-4'}  
                    ${juegosCompletandoLimitados.length === 3 && 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'} 
                    ${juegosCompletandoLimitados.length === 4 && 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}   
                    `}>
                {RenderCompletando(juegosCompletandoLimitados, handleTitleClick)}              
                </div>
            </div>
        }

        {/* Panel oculto de Elección de catálogo cuando NO hay juegos en la colección */}
        {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}
      </div>
    )
}
