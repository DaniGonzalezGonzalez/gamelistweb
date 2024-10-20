import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, CheckIcon } from "../../../assets/Icons"
import { useGetDataPortadaPorEstado } from "../../../hooks/Portada/useGetDataPortadaPorEstado"
import { useHandles } from "../../../hooks/useHandles/useHandles"
import { fetchPlatformImagesPortada } from "../../../hooks/useFetchsPlatforms"
import { useHandlePlatformMenus } from "../../../hooks/useHandles"
import { GET_STATE_BACKGROUND, ordenarYLimitarJuegos, scrollToTop } from "../../helpers/no-components/constants"
import { renderJuegosPortada } from "../../helpers/components/Utils/renderJuegosPortada"
import { ChooseAddGamesMenuFlotante } from "../../helpers/components/Utils/ChooseAddGamesMenuFlotante"

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
            <div className="relative px-8 pt-8 pb-5 sm:px-16">
                {/* <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(3, 7, 18, 1), rgba(9, 9, 11, 1))', backgroundSize: 'cover', backgroundPosition: 'center center', height: '20%' }}/> */}
                <h2 className="relative z-20 pb-4 mt-8 mb-2 text-xl font-bold uppercase lg:pb-8 sm:mt-0 lg:mt-12 lg:text-xl sm:text-base">Terminados</h2>
                { juegosLimitados.length >=1 && <div className="relative z-10 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
                    {renderJuegosPortada(juegosLimitados, platformImages, handleTitleClick)}
                </div>}
                {juegosLimitados.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-800 border-2 border-gray-600 border-dashed rounded-lg">
                        <h3 className="mb-4 text-lg font-semibold text-gray-300">¡No tienes juegos terminados!</h3>
                        <p className="mb-4 text-gray-400">Agrega tus juegos terminados para llevar un registro de tus logros.</p>
                        <button onClick={handleAddGameMenu} className="flex items-center px-4 py-2 text-sm font-medium text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700">
                            Agregar Juegos
                            <span className="ml-2">➕</span>
                        </button>
                    </div>
                )}

                {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}

                { juegosLimitados.length >= 1 && 
                    <div className="flex items-center gap-3 mt-3">                    
                        <Link onClick={scrollToTop} className="flex items-center justify-end gap-3 text-xs font-thin" to="/edit-game-to-list-terminados">
                            <div className={`flex items-center p-1 ${GET_STATE_BACKGROUND('Terminado')} rounded`}><CheckIcon /></div>
                            Ver todos<div className="flex items-center gap-2 text-xs"><ArrowRight /></div></Link>
                    </div>
                }
            </div>
        </>
    )
}
