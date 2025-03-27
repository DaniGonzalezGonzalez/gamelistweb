import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CheckIcon, OtrosIcon, PlayIcon, ProximosIcon } from "../../../../../../assets/Icons"
import { sagas, platforms, getPlatformBackground } from "../../../../../helpers/constants/constants";
import { useFiltrarJuegos } from "../../Carruseles/CarruselesUseEffects/useJuegos";


export const IndexSuperior = ({ handleScrollIndex }) => {
  const [iconSize, setIconSize] = useState(window.innerWidth >= 1024 ? 8 : 5);
  const [randomSaga, setRandomSaga] = useState(null)
  // const [randomPlatform, setRandomPlatform] = useState(null)

  const navigate = useNavigate()

  const handleSagasClick = () => {
    navigate(`/collections/titulo/${randomSaga.name}`)
  }

  const handleRetroClick = () => {
    navigate(`/collections/lanzamiento/1990-1999`)
  }

  const handleTopRatedClick = () => {
    navigate(`/collections/notaMetacriticPrensa/10-9`)
  }

  const handleNuevosClick = () => {
    navigate(`/collections/lanzamiento/2024`)
  }

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * sagas.length)
    // const randomPlatformIndex = Math.floor(Math.random() * platforms.length)

    setRandomSaga(sagas[randomIndex])
    // setRandomPlatform(platforms[randomPlatformIndex])
    // Función para actualizar el tamaño del ícono según el ancho de la ventana
    const handleResize = () => {
      setIconSize(window.innerWidth >= 1024 ? 8 : 5)
    }
    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener("resize", handleResize);
    // Limpieza del efecto
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  if (!randomSaga) return null
  
  return (
    <div className="relative z-10 w-full text-[7px] grid-cols-4 gap-2 lg:gap-4 px-2 mt-4 font-thin lg:font-semibold text-white sm:px-0 sm:w-[93%] lg:text-sm sm:mt-14 sm:grid-cols-4 bottom-0 sm:bottom-7 md:bottom-0 hidden lg:grid">
      {/* <Link to onClick={() => handleScrollIndex('indice-infohomepage-jugando')}>
        <div className="relative flex flex-col items-center justify-center w-full h-12 uppercase transition duration-300 border-2 border-transparent rounded-lg shadow-md group sm:h-12 lg:h-32 bg-slate-700 hover:border-gray-200 lg:rounded-2xl shadow-slate-900">
          <div className="relative flex-shrink-0 transition-transform duration-300 bottom-2 sm:bottom-2 lg:bottom-0 lg:group-hover:-translate-y-6">
            <PlayIcon w={iconSize} h={iconSize} />
          </div>
          <p className="absolute transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-6 sm:top-11 lg:top-16 lg:group-hover:-translate-y-0 group-hover:opacity-100">Jugando</p>
        </div>
      </Link>
      <Link to onClick={() => handleScrollIndex('indice-infohomepage-terminados')}>
        <div className="relative flex flex-col items-center justify-center w-full h-12 uppercase transition duration-300 border-2 border-transparent rounded-lg shadow-md group sm:h-12 lg:h-32 bg-slate-700 hover:border-gray-200 lg:rounded-2xl shadow-slate-900">
          <div className="relative flex-shrink-0 transition-transform duration-300 bottom-2 sm:bottom-2 lg:bottom-0 lg:group-hover:-translate-y-6">
            <CheckIcon w={iconSize} h={iconSize} />
          </div>
          <p className="absolute transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-6 sm:top-11 lg:top-16 lg:group-hover:-translate-y-0 group-hover:opacity-100">Terminados</p>
        </div>
      </Link>
      <Link to onClick={() => handleScrollIndex('indice-infohomepage-proximos')}>
        <div className="relative flex flex-col items-center justify-center w-full h-12 uppercase transition duration-300 border-2 border-transparent rounded-lg shadow-md group sm:h-12 lg:h-32 bg-slate-700 hover:border-gray-200 lg:rounded-2xl shadow-slate-900">
          <div className="relative flex-shrink-0 transition-transform duration-300 bottom-2 sm:bottom-2 lg:bottom-0 lg:group-hover:-translate-y-6">
            <ProximosIcon w={iconSize} h={iconSize} />
          </div>
          <p className="absolute transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-6 sm:top-11 lg:top-16 lg:group-hover:-translate-y-0 group-hover:opacity-100">Próximos</p>
        </div>
      </Link>
      <Link to onClick={() => handleScrollIndex('indice-infohomepage-resto')}>
        <div className="relative flex flex-col items-center justify-center w-full h-12 uppercase transition duration-300 border-2 border-transparent rounded-lg shadow-md group sm:h-12 lg:h-32 bg-slate-700 hover:border-gray-200 lg:rounded-2xl shadow-slate-900">
          <div className="relative flex-shrink-0 transition-transform duration-300 bottom-2 sm:bottom-2 lg:bottom-0 lg:group-hover:-translate-y-6">
            <OtrosIcon w={iconSize} h={iconSize} />
          </div>
          <p className="absolute transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-6 sm:top-11 lg:top-16 lg:group-hover:-translate-y-0 group-hover:opacity-100">Otros</p>
        </div>
      </Link> */}

      {/* Alternativa a probar nueva */}

      <button onClick={handleSagasClick}>
        <div className={`relative flex flex-col items-center justify-center w-full h-12 uppercase transition duration-300 border-2 border-transparent rounded-lg shadow-md group sm:h-12 lg:h-32 bg-slate-700 hover:border-gray-200 hover:${randomSaga.bgColor} lg:rounded-2xl shadow-slate-900`}>
          <div className="relative bottom-0 flex-shrink-0 transition-transform duration-300 sm:bottom-2 lg:bottom-0 lg:group-hover:-translate-y-6">
            <img className={`object-contain w-full h-28 sm:h-28 px-4 py-7 lg:px-16 2xl:px-24 transition duration-500 ease-in-out border-2 border-transparent rounded-lg ${randomSaga.name === 'Grand Theft Auto' ? 'lg:h-32 px-6' : 'lg:h-40'}`} src={`/collectionIcons/${randomSaga.name.replace(/\s+/g, '-').trim()}-icon.webp`} alt={`${randomSaga.name} index button`} title={`Colección ${randomSaga.name}`} />
          </div>
          {/* Capa de opacidad en pantallas pequeñas */}
          <div className="absolute w-full h-full transition-all duration-300 bg-black rounded-lg bg-opacity-70 sm:block lg:hidden group-hover:bg-opacity-0"></div>
          <div className="absolute font-thin lg:font-bold uppercase transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-2 sm:top-11 lg:top-[86px] lg:group-hover:-translate-y-0 group-hover:opacity-100 w-full text-center flex flex-col lg:flex-row lg:gap-1 lg:items-center lg:justify-center hover:text-transparent lg:hover:text-white">
            <div className="absolute top-0 w-full lg:static lg:w-auto">Colección</div> 
            <div className="absolute w-full top-3 lg:static lg:w-auto">{randomSaga.name === 's Creed' ? <><span className="hidden lg:inline">Assassin's Creed</span><span className="lg:hidden">Assassin's</span></> : randomSaga.name === 'Grand Theft Auto' ? 'GTA' : randomSaga.name}</div>
          </div>
        </div>
      </button>

      <button onClick={handleTopRatedClick}>
        <div className="relative flex flex-col items-center justify-center w-full h-12 uppercase transition duration-300 border-2 border-transparent rounded-lg shadow-md group sm:h-12 lg:h-32 bg-slate-700 hover:bg-green-800 hover:border-gray-200 lg:rounded-2xl shadow-slate-900">
          <div className="relative bottom-0 flex-shrink-0 transition-transform duration-300 sm:bottom-2 lg:bottom-0 lg:group-hover:-translate-y-6">
            <img className={`object-contain w-full h-20 px-5 py-7 sm:px-11 md:px-14 lg:px-16 2xl:px-24 transition duration-500 ease-in-out border-2 border-transparent rounded-lg lg:h-32`} src={'collectionIcons/10-9-icon.webp'} alt={'Mejores index button'} title={'Colección juegos mejor valorados'} />
          </div>
          <div className="absolute w-full h-full transition-all duration-300 bg-black rounded-lg bg-opacity-70 sm:block lg:hidden group-hover:bg-opacity-0"></div>
          <div className="absolute font-thin lg:font-bold uppercase transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-2 sm:top-11 lg:top-[86px] lg:group-hover:-translate-y-0 group-hover:opacity-100 w-full text-center flex flex-col lg:flex-row lg:gap-1 lg:items-center lg:justify-center hover:text-transparent lg:hover:text-white">
            <div className="absolute top-0 w-full lg:static lg:w-auto">Colección</div> 
            <div className="absolute w-full top-3 lg:static lg:w-auto">Mejores</div>
          </div>
        </div>
      </button>

      <button onClick={handleRetroClick}>
        <div className={`relative flex flex-col items-center justify-center w-full h-12 uppercase transition duration-300 border-2 border-transparent rounded-lg shadow-md group sm:h-12 lg:h-32 bg-slate-700 hover:border-gray-200 hover:bg-gray-600 lg:rounded-2xl shadow-slate-900`}>
          <div className="relative bottom-0 flex-shrink-0 transition-transform duration-300 sm:bottom-2 lg:bottom-0 lg:group-hover:-translate-y-6">
            <img className={`object-contain w-full h-20 sm:px-11 md:px-14 lg:px-16 2xl:px-24 transition duration-500 ease-in-out border-2 border-transparent rounded-lg lg:h-32`} src={'collectionIcons/1990-1999-icon.webp'} alt={'Juegos retro index button'} title={'Colección juegos retro'} />
            {/* <img className={`object-contain w-full h-20 sm:h-20 px-4 py-7 lg:px-16 2xl:px-24 transition duration-500 ease-in-out border-2 border-transparent ${['PS3', 'PS4', 'Wii'].includes(randomPlatform) ? 'lg:py-12' : 'lg:py-7'} rounded-lg ${['Nintendo Switch', 'SNES', 'WiiU', 'Nintendo 3DS', 'Game Boy Color'].includes(randomPlatform) ? 'lg:h-[100px]' : 'lg:h-32'}`} src={`/platformImages/${randomPlatform.replace(/\s+/g, '-').trim()}-Logo.webp`} alt={`${randomPlatform} index button`} title={`Colección ${randomPlatform}`} /> */}
          </div>
          <div className="absolute w-full h-full transition-all duration-300 bg-black rounded-lg bg-opacity-70 sm:block lg:hidden group-hover:bg-opacity-0"></div>
          <div className="absolute font-thin lg:font-bold uppercase transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-2 sm:top-11 lg:top-[86px] lg:group-hover:-translate-y-0 group-hover:opacity-100 w-full text-center flex flex-col lg:flex-row lg:gap-1 lg:items-center lg:justify-center hover:text-transparent lg:hover:text-white">
            <div className="absolute top-0 w-full lg:static lg:w-auto">Colección Retro</div> 
            {/* <div className="absolute w-full top-3 lg:static lg:w-auto">{randomPlatform === 's Creed' ? <><span className="hidden lg:inline">Assassin's Creed</span><span className="lg:hidden">Assassin's</span></> : randomPlatform === 'Game Boy Color' ? 'GBC' : randomPlatform}</div> */}
          </div>
        </div>
      </button>

      <button onClick={handleNuevosClick}>
        <div className={`relative flex flex-col items-center justify-center w-full h-12 uppercase transition duration-300 border-2 border-transparent rounded-lg shadow-md group sm:h-12 lg:h-32 bg-slate-700 hover:border-gray-200 hover:bg-blue-900 lg:rounded-2xl shadow-slate-900`}>
          <div className="relative bottom-0 flex-shrink-0 transition-transform duration-300 sm:bottom-2 lg:bottom-0 lg:group-hover:-translate-y-6" title="Colección próximos lanzamientos">
            <img className={`object-contain w-full h-20 px-5 py-7 sm:px-11 md:px-14 lg:px-16 2xl:px-24 transition duration-500 ease-in-out border-2 border-transparent rounded-lg lg:h-32`} src={'collectionIcons/2024-icon.webp'} alt={'Nuevos juegos index button'} title={'Colección nuevos juegos'} />
          </div>
          <div className="absolute w-full h-full transition-all duration-300 bg-black rounded-lg bg-opacity-70 sm:block lg:hidden group-hover:bg-opacity-0"></div>
          <div className="absolute font-thin lg:font-bold uppercase transition-all duration-300 ease-in-out transform opacity-100 lg:opacity-0 sm:-translate-y-5 lg:-translate-y-4 top-2 sm:top-11 lg:top-[86px] lg:group-hover:-translate-y-0 group-hover:opacity-100 w-full text-center flex flex-col lg:flex-row lg:gap-1 lg:items-center lg:justify-center hover:text-transparent lg:hover:text-white">
            <div className="absolute top-0 w-full lg:static lg:w-auto">Colección</div> 
            <div className="absolute w-full top-3 lg:static lg:w-auto">Nuevos</div>
          </div>
        </div>
      </button>      
    </div>
  )
}
