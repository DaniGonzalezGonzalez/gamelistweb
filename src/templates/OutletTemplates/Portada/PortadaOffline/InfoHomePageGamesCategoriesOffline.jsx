import { useEffect, useState } from "react"
import { scrollToTop } from "../../../helpers/constants/constants"
import { fetchPlatformImagesPortada } from "../../../../hooks/useFetchsPlatforms"
import { useGetDataGamesOffline } from "../../../../hooks/Portada/useGetDataGamesOffline"
import { HomePageSkeleton } from "../../../helpers/Utils/Skeletons/HomePageSkeleton"
import { useVisibilityObserver } from "../../../../hooks/useVisibilityObserver"

export function InfoHomePageGamesCategoriesOffline() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImage2, setSelectedImage2] = useState(null)
  const [selectedImage3, setSelectedImage3] = useState(null)
  const { juegosPortada, error, isLoading } = useGetDataGamesOffline('PS5', 4)
  const [platformImages, setPlatformImages] = useState({})
  const { juegosPortada: juegosRetro } = useGetDataGamesOffline('NES', 4)
  const { juegosPortada: juegosPortatiles } = useGetDataGamesOffline('Nintendo 3DS', 4)
  const visibleItems = useVisibilityObserver(".observed-item", 0.3);
  const block2Id = "block2Id"
  const block3Id = "block3Id"
  const block4Id = "block4Id"

  // useEffect para cargar la imagen solo una vez al montar el componente
  useEffect(() => {
    if (juegosPortada.length > 0) {
      const randomIndex = Math.floor(Math.random() * juegosPortada.length)
      const randomImage = juegosPortada[randomIndex]?.imageUrl ?? juegosPortada[randomIndex]?.url[0]
      setSelectedImage(randomImage)
    }
  }, [juegosPortada])

  useEffect(() => {
    if (juegosRetro.length > 0) {
      const randomIndex2 = Math.floor(Math.random() * juegosRetro.length)
      const randomImage2 = juegosRetro[randomIndex2]?.imageUrl ?? juegosRetro[randomIndex2]?.url[0]
      setSelectedImage2(randomImage2);
    }
  }, [juegosRetro])

  useEffect(() => {
    if (juegosPortatiles.length > 0) {
      const randomIndex3 = Math.floor(Math.random() * juegosPortatiles.length)
      const randomImage3 = juegosPortatiles[randomIndex3]?.imageUrl ?? juegosPortatiles[randomIndex3]?.url[0]
      setSelectedImage3(randomImage3)
    }
  }, [juegosPortatiles])
  

  useEffect(() => {
    fetchPlatformImagesPortada(juegosRetro, platformImages, setPlatformImages)
  }, [juegosRetro])
  
  useEffect(() => {
    fetchPlatformImagesPortada(juegosPortada, platformImages, setPlatformImages)
  }, [juegosPortada])

  useEffect(() => {
    fetchPlatformImagesPortada(juegosPortatiles, platformImages, setPlatformImages)
  }, [juegosPortatiles])


  if (isLoading) return <HomePageSkeleton />
  
  if (error) {
    return (
      <div className="flex justify-center p-4 pt-12 text-center bg-gray-950">
        <p className="p-1 bg-red-700 rounded">Página en mantenimiento. Gracias por tu paciencia</p>
      </div>
    )
  }
  
  return (
    <div className="relative px-8 pt-0 pb-0 bg-black sm:pt-14 sm:pb-10 sm:px-16 lg:px-32 xl:p-48">
      <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))', backgroundSize: 'cover', backgroundPosition: 'center center', height: '20%' }}/>
      <h2 data-id={block2Id} className={`transition duration-[1000ms] observed-item ease-out ${visibleItems[block2Id] ? "opacity-100 translate-x-0" : "opacity-0 translate-y-20" } relative z-20 flex w-full xl:items-center xl:justify-center gap-4 text-lg font-bold pt-14 lg:pt-28 text-start sm:text-xl xl:text-3xl xl:text-center xl:font-light`}>¿Qué juegos encontrarás?</h2>
      <h3 data-id={block2Id} className={`transition duration-[1000ms] observed-item ease-out ${visibleItems[block2Id] ? "opacity-100 translate-x-0" : "opacity-0 translate-y-20" } relative z-20 flex w-full gap-4 pt-8 text-base font-bold text-start sm:text-lg`}>Categorías variadas</h3>
      <div data-id={block3Id} className={`transition duration-[2000ms] observed-item ease-out ${visibleItems[block3Id] ? "opacity-100 translate-x-0" : "opacity-0 translate-y-20" } flex justify-center gap-5 py-5 sm:pb-10 lg:gap-20 sm:gap-10`}>
        <div className="w-full" >
          <button className="relative z-20 flex flex-col items-center justify-center w-full" onClick={scrollToTop}><img className="object-cover w-full h-40 transition duration-500 rounded-2xl sm:h-40 lg:h-96 hover:opacity-75" src={selectedImage} alt='Cargando...' />
            <h2 className="relative z-20 flex w-full gap-4 pt-4 text-sm font-bold text-start lg:pt-8 lg:text-lg">Últimas generaciones</h2>
            <p className="w-full pt-3 pb-3 text-xs italic text-gray-400 xl:text-sm text-start">Encuentra las últimas novedades y videojuegos de las generaciones actuales</p>
            <h3 className="relative z-20 flex items-center w-full gap-1 pt-1 sm:pt-2 lg:pt-4 sm:text-xs text-[9px] uppercase text-start">Nintendo Switch 2 - PS5 - PC - Xbox Series</h3>
          </button>
        </div>       
      </div>

      <div data-id={block4Id} className={`transition duration-[2000ms] observed-item ease-out ${visibleItems[block4Id] ? "opacity-100 translate-x-0" : "opacity-0 translate-y-20" } flex justify-center gap-5 pt-2 lg:pt-10 lg:gap-20 sm:gap-10`}>
        <div className="w-1/2">
          <button className="relative z-20 flex flex-col items-center justify-center w-full" onClick={scrollToTop}><img className="object-cover w-full h-40 transition duration-500 rounded-2xl sm:h-40 lg:h-96 hover:opacity-75" src={selectedImage2} alt='Cargando...' />
            <h2 className="relative z-20 flex w-full gap-4 pt-4 text-sm font-bold text-start lg:pt-8 lg:text-lg">Retro</h2>
            <p className="w-full pt-3 pb-3 text-xs italic text-gray-400 xl:text-sm text-start">Descubre juegos de consolas antiguas</p>
            <h3 className="relative z-20 flex items-center w-full gap-1 pt-1 sm:pt-2 lg:pt-4 sm:text-xs text-[9px] uppercase text-start">SNES - NES - SEGA MegaDrive</h3>
          </button>
        </div>
        
        <div className="w-1/2">
          <button className="relative z-20 flex flex-col items-center justify-center w-full" onClick={scrollToTop}><img className="object-cover w-full h-40 transition duration-500 rounded-2xl sm:h-40 lg:h-96 hover:opacity-75" src={selectedImage3} alt='Cargando...' />
            <h2 className="relative z-20 flex w-full gap-4 pt-4 text-sm font-bold text-start lg:pt-8 lg:text-lg">Portátiles</h2>
            <p className="w-full pt-3 pb-3 text-xs italic text-gray-400 xl:text-sm text-start">Para amantes de las portátiles clásicas</p>
            <h3 className="relative z-20 flex items-center w-full gap-1 pt-1 sm:pt-2 lg:pt-4 sm:text-xs text-[9px] uppercase text-start">3DS - DS - PS Vita - PSP - GBA - GBC - GB</h3>
          </button>
        </div>
      </div>
    </div>
  )
}
