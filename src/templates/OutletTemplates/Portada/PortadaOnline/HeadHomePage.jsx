/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useMemo } from "react"
import { useGetDataGamesOffline } from "../../../../hooks/Portada/useGetDataGamesOffline"
import { useHandlePlatformMenus, useHandles } from "../../../../hooks/useHandles"
import { useUser } from "../../../../hooks/useUser"
import { ChooseAddGamesMenuFlotante } from "../../../helpers/Utils/ChooseAddGamesMenuFlotante"
import { platforms } from "../../../helpers/constants/constants"
import { OfflineBanner } from "../PortadaOffline/PortadaOfflineHelpers/HeadHomePageHelpers/OfflineBanner"
import { BannerSuperior, IndexSuperior } from "./PortadaOnlineHelpers/HeadHomepageHelpers"

export function HeadHomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentImageOfflineIndex, setCurrentImageOfflineIndex] = useState(0) 
  const { handleScrollIndex } = useHandles()
  const { user } = useUser()
  const { chooseAddGamesMenuOpen, handleAddGameMenu } = useHandlePlatformMenus()
  const localImages = useMemo(() => [ "/Imagen-portada-0.jpg", "/Imagen-portada-1.jpg", "/Imagen-portada-2.jpg" ], [])
    
  const juegosPortada = platforms.flatMap((platform) => {
    const { juegosPortada } = useGetDataGamesOffline(platform, 1)
    return juegosPortada.map((juego) => ({ ...juego, platform }))
  })

  // Efecto para la transición de imágenes. Tiempo de duración de 2500 y cambio cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % juegosPortada.length);
      }, 2500) 

    }, 10000) 

    return () => clearInterval(interval)
  }, [juegosPortada.length])
  
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageOfflineIndex((prevIndex) => (prevIndex + 1) % localImages.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [localImages])




  return (
    <div className="relative flex flex-col items-center bg-transparent sm:pl-16">      
      { !user.id && 
        <div className="lg:h-[1000px] min-h-screen">
          {localImages.map((imageUrl, index) => (
              <div key={index} className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center center', opacity: index === currentImageOfflineIndex ? 1 : 0, transition: 'opacity 1s ease-in-out' }} />
            ))}
        </div>
      }

      {/* Banner superior */}
      { user.id && 
          <BannerSuperior juegosPortada={juegosPortada} currentImageIndex={currentImageIndex} handleAddGameMenu={handleAddGameMenu} />        
      }

      {/* Índice de recuadros */}
      { user.id && 
          <IndexSuperior handleScrollIndex={handleScrollIndex} />  
      }

      {/* Panel oculto de Elección de catálogo  */}    
      {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}

      {/* Capa de superposición negra semitransparente en portada offline */}
      { !user.id && <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />}   
      { !user.id && <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1))', backgroundSize: 'cover', backgroundPosition: 'center center' }} />} 
      
      {/* Imágenes de portada offline */}
      <OfflineBanner juegosPortada={juegosPortada} user={user} />
    </div>    
  )
}
