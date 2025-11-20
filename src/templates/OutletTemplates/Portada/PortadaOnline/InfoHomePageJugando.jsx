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
import { useVisibilityObserver } from "../../../../hooks/useVisibilityObserver"

export function InfoHomePageJugando() {
  const { juegosPortada: juegosJugando, error: errorJugando, isLoading: isLoadingJugando } = useGetDataPortadaPorEstado('Jugando')
  const { juegosPortada: juegosCompletando, error: errorCompletando, isLoading: isLoadingCompletando } = useGetDataPortadaPorEstado('Completando')
  const { handleTitleClick } = useHandles()
  const { chooseAddGamesMenuOpen, handleAddGameMenu } = useHandlePlatformMenus()
  const visibleItems = useVisibilityObserver(".observed-item", 0.3, ["jugando-block", "completando-block"]);

  if (isLoadingJugando || isLoadingCompletando) return <HomePageSkeleton />
  if (errorJugando || errorCompletando) {
    console.log(errorJugando)
    return (
      <div className="flex justify-center p-4 pt-12 text-center bg-gray-950">
        <p className="p-1 bg-red-700 rounded">Página en mantenimiento. Gracias por tu paciencia</p>
      </div>
    )
  }

  // Utilizar la función para ordenar y limitar los juegos
  const juegosJugandoLimitados = ordenarYLimitarJuegos(juegosJugando, 4)
  const juegosCompletandoLimitados = ordenarYLimitarJuegos(juegosCompletando, 4)
// Antes el div padre de todo era: relative px-6 pt-20 pb-5 sm:px-16 sm:pt-14 lg:pt-20 sm:pb-10 lg:pb-20
//       el div 

  return (
      <div className="relative px-2 pt-4 pb-5 sm:px-8 sm:pl-20 lg:pl-28 lg:pr-8 sm:pt-3 lg:pt-10 sm:pb-0 lg:pb-0">
        <h1 className="w-full gap-4 px-2 mt-3 text-2xl font-bold text-white uppercase text-start">Mis listas</h1>  
        <div className={`flex items-center gap-1 pb-1 mt-4 lg:pb-0`}>
          {/* Si NO hay juegos => No habilitamos el acceso a todos los juegos de la colección  */}
          { juegosJugandoLimitados.length === 0 && 
              <h2 className="relative z-20 flex gap-4 text-[15px] font-bold lg:text-xl sm:text-base px-2">Jugando</h2>
          }
          {/* Si hay juegos => Habilitamos el acceso a todos los juegos de la colección  */}
          { juegosJugandoLimitados.length >= 1 &&
              <div>{TitleCollection('Jugando', '/edit-game-to-list-jugando')}</div> 
          }
        </div>

        {/* Mostramos los juegos de la colección */}
        { juegosJugandoLimitados.length >= 1 &&        
            <div data-id="jugando-block"  className={`observed-item relative z-10 grid grid-cols-1 gap-0 py-0 pb-3 sm:pb-4 sm:gap-5 md:gap-8 xl:gap-10 transition duration-1000 ease-out
              ${visibleItems["jugando-block"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              ${juegosJugandoLimitados.length === 1 && 'xl:grid-cols-2'}
              ${juegosJugandoLimitados.length === 2 && 'sm:grid-cols-2 grid-cols-2'}
              ${juegosJugandoLimitados.length === 3 && 'sm:grid-cols-3 grid-cols-2'}
              ${juegosJugandoLimitados.length === 4 && 'grid-cols-2 lg:grid-cols-4'}
              `}>
              {RenderJugando(juegosJugandoLimitados, handleTitleClick)}
            </div>
        }

        {/* Opción de Añadir juegos si no hay ninguno en la colección */}
        {juegosJugandoLimitados.length === 0 && 
          <div className="px-2 mt-2">
              <NoGamesPrompt personalizedTitle="¡No tienes juegos en curso!" personalizedSubtitle="Agrega tus juegos favoritos para comenzar a jugar y llevar un registro." handleAddGameMenu={handleAddGameMenu} />
          </div>     
        }

        {/* Mostramos los juegos de la colección */}
        { juegosCompletandoLimitados.length >= 1 && 
            <div className="py-0 sm:py-4">
              {TitleCollection('Completando', '/edit-game-to-list-completando')}
              <div data-id="completando-block" className={`observed-item  transition duration-1000 ease-outrelative z-10 grid grid-cols-1 gap-3 sm:gap-5 ${visibleItems["jugando-block"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
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
