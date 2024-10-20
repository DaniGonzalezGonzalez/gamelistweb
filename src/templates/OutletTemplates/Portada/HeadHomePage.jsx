/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { CheckIcon, OtrosIcon, PlayIcon, ProximosIcon } from "../../../assets/Icons"
import { useGetDataGamesOffline } from "../../../hooks/Portada/useGetDataGamesOffline"
import { useHandlePlatformMenus } from "../../../hooks/useHandles"
import { useUser } from "../../../hooks/useUser"
import ImagesHeadHomepage from "../../helpers/components/Menus&IndexHelpers/ImagesAddToGameList/ImagesHeadHomepage"
import { ChooseAddGamesMenuFlotante } from "../../helpers/components/Utils/ChooseAddGamesMenuFlotante"
import { platforms } from "../../helpers/no-components/constants"
import { Acceder } from "./Acceder"

export function HeadHomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentImageOfflineIndex, setCurrentImageOfflineIndex] = useState(0) 
  const { user } = useUser()
  const { chooseAddGamesMenuOpen, handleAddGameMenu } = useHandlePlatformMenus()
  const localImages = useMemo(() => [ "/Imagen-portada-0.jpg", "/Imagen-portada-1.jpg", "/Imagen-portada-2.jpg" ], [])
    
  const juegosPortada = platforms.flatMap((platform) => {
    const { juegosPortada } = useGetDataGamesOffline(platform, 1)
    return juegosPortada.map((juego) => ({ ...juego, platform }))
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Cambiar imagen después de la transición
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % juegosPortada.length);
      }, 2500) // Tiempo de duración de la animación

    }, 10000) // Cambia cada 12 segundos

    return () => clearInterval(interval)
  }, [juegosPortada.length])
  

  const handleScrollIndex = (idIndice) => {
    const editContentElement = document.getElementById(idIndice)
    if (editContentElement) {
      editContentElement.scrollIntoView({ behavior: "smooth" })
    }
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageOfflineIndex((prevIndex) => (prevIndex + 1) % localImages.length)
    }, 10000) // Cambiar la imagen cada 10 segundos (10000 milisegundos)

    return () => clearInterval(interval)
  }, [localImages])


  return (
    <div className="relative flex flex-col items-center bg-transparent">      
      { !user.id && 
        <div className="lg:h-[1000px] min-h-screen">
          {localImages.map((imageUrl, index) => (
              <div key={index} className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center center', opacity: index === currentImageOfflineIndex ? 1 : 0, transition: 'opacity 1s ease-in-out' }} />
            ))}
        </div>
      }

      {/* Banner superior */}
      {  user.id && 
          <div className="relative w-full h-60 sm:h-40 lg:h-[400px] mt-20 sm:mt-5 lg:mt-20 overflow-hidden">
            {juegosPortada.map((juego, index) => (
                <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex justify-center w-full h-full">
                    <button onClick={handleAddGameMenu} className="relative w-80 sm:w-4/5">
                      <img className="object-cover w-full h-full rounded-lg" src={juego?.imageUrl ?? juego?.url[0]} alt={`Imagen de juego ${index + 1}`}/>
                      <div className="absolute inset-0 z-10 flex items-center justify-center transition duration-300 border-2 border-black rounded-lg border-opacity-40 hover:border-2 hover:border-gray-200 hover:opacity-80">
                        <div className="absolute inset-0 bg-black rounded-md opacity-40"></div>
                        <h2 className="flex items-center justify-center h-full text-lg font-semibold text-center text-white uppercase sm:text-3xl">
                          {juego.name}
                        </h2>
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between p-3 font-semibold text-center text-white">
                          <div className="font-thin text-white sm:w-80 text-[10px] lg:text-xs w-1/2 flex items-start">
                            <p>Explora el catálogo</p>
                          </div>
                          <div className="flex justify-end w-full gap-2 font-thin text-white sm:w-80 text-[10px]">
                            <div className="font-semibold lg:text-xs">
                              <p>{juego.platform === 'Xbox 1' ? 'Xbox' : juego.platform}</p>                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        }

    
        {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}
      
        { user.id && 
          <div className="relative z-10 grid w-5/6 grid-cols-2 gap-4 font-semibold text-white lg:text-lg mt-14 sm:grid-cols-4">
            <Link to onClick={() => handleScrollIndex('indice-infohomepage-jugando')}>
              <div className="relative flex flex-col items-center justify-center w-full h-24 uppercase transition duration-300 border-2 border-transparent shadow-md group sm:h-20 lg:h-32 bg-slate-700 hover:border-gray-200 rounded-2xl shadow-slate-900">
                <div className={`flex-shrink-0 transition-transform bottom-3 lg:bottom-0 relative duration-300 lg:group-hover:-translate-y-6`}><PlayIcon w={8} h={8}/></div>
                <p className="absolute transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-14 sm:top-16 lg:group-hover:-translate-y-0 group-hover:opacity-100">Jugando</p>
              </div>
            </Link>
            <Link to onClick={() => handleScrollIndex('indice-infohomepage-terminados')}>
              <div className="relative flex flex-col items-center justify-center w-full h-24 uppercase transition duration-300 border-2 border-transparent shadow-md group sm:h-20 lg:h-32 bg-slate-700 hover:border-gray-200 rounded-2xl shadow-slate-900">
                <div className={`flex-shrink-0 transition-transform bottom-3 lg:bottom-0 relative duration-300 lg:group-hover:-translate-y-6`}><CheckIcon w={8} h={8} /></div>
                <p className="absolute transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-14 sm:top-16 lg:group-hover:-translate-y-0 group-hover:opacity-100">Terminados</p>
              </div>
            </Link>
            <Link to onClick={() => handleScrollIndex('indice-infohomepage-en-lista')}>
              <div className="relative flex flex-col items-center justify-center w-full h-24 uppercase transition duration-300 border-2 border-transparent shadow-md group sm:h-20 lg:h-32 bg-slate-700 hover:border-gray-200 rounded-2xl shadow-slate-900">
                <div className={`flex-shrink-0 transition-transform bottom-3 lg:bottom-0 relative duration-300 lg:group-hover:-translate-y-6`}><ProximosIcon w={8} h={8} /></div>
                <p className="absolute transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-14 sm:top-16 lg:group-hover:-translate-y-0 group-hover:opacity-100">En lista</p>
              </div>
            </Link>
            <Link to onClick={() => handleScrollIndex('indice-infohomepage-resto')}>
              <div className="relative flex flex-col items-center justify-center w-full h-24 uppercase transition duration-300 border-2 border-transparent shadow-md group sm:h-20 lg:h-32 bg-slate-700 hover:border-gray-200 rounded-2xl shadow-slate-900">
                <div className={`flex-shrink-0 transition-transform bottom-3 lg:bottom-0 relative duration-300 lg:group-hover:-translate-y-6`}><OtrosIcon w={8} h={8} /></div>
                <p className="absolute transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-14 sm:top-16 lg:group-hover:-translate-y-0 group-hover:opacity-100">Otros</p>
              </div>            
            </Link>
          </div>
       }


      {/* Capa de superposición negra semitransparente */}
      {!user.id && <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />}     

      { !user.id && <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1))', backgroundSize: 'cover', backgroundPosition: 'center center' }} />} 


      {/* Contenedores Offline y Online */}
      <div className="absolute w-full text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        {/* Imágenes de portada offline */}
        { !user.id && 
          <div className="relative">
            <div className="flex flex-col items-center justify-between gap-3 p-3 sm:px-5 2xl:px-10">
              <div className="flex flex-col items-center justify-center">
                <div className="flex justify-center w-full" style={{ position: 'relative' }}><img className="max-w-[90%] sm:max-w-[20%] md:max-w-[70%] lg:max-w-[30%] h-auto object-contain" src="/Logo-GameListWeb.png"></img>
                </div>
                <div className="flex flex-col items-center w-full gap-5 px-5 pb-2 sm:p-2 2xl:gap-10 2xl:pb-5 2xl:pt-0">
                  <p className="text-xs text-center text-white lg:text-lg">Crea y gestiona tu colección de videojuegos de manera fácil y personalizada.</p>
                </div>
              </div>

              <ImagesHeadHomepage gamesBDByPlatform={juegosPortada}/>

              <div className="w-5/6">
                <h2  className="relative z-20 flex gap-4 pt-4 text-sm font-semibold text-white sm:pt-0 lg:pt-8 sm:text-sm lg:text-lg">Descubre nuestro catálogo</h2>
                <h3 className="relative z-20 flex gap-1 pt-2 text-xs text-white uppercase lg:pt-4 sm:pt-0 sm:text-xs lg:text-lg">316 juegos</h3>
              </div>
            </div>
          </div>
        }
        
        {/* Botón para acceder al login */}
        { !user.id && <Acceder/>}
      </div>
    </div>    
  )
}
