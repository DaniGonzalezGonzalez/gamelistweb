import { useState } from "react"
import { Link } from "react-router-dom"
import { platformData } from "./platformsDataToMenuFlotante"
import { SearchIcon } from "../../../assets/Icons"
import ReactDOM from 'react-dom'

export const ChooseAddGamesMenuFlotante = ({chooseAddGamesMenuOpen, handleAddGameMenu}) => {
  const [selectedPlatform, setSelectedPlatform] = useState('') 

  const handlePlatformClick = (platform) => {
    setSelectedPlatform(platform) 
  }
  
  // Función para renderizar el contenido de la plataforma seleccionada
  const renderPlatformContent = () => {
    if (!selectedPlatform) return null

    // Obtener los datos de la plataforma seleccionada
    const platformItems = platformData[selectedPlatform] || []

    return (
      <div className="flex flex-col justify-center h-full gap-3 sm:gap-1">
        <div className={`grid p-3 items-center justify-center gap-3 
        ${(platformItems[0].name === 'PS1' || platformItems[0].name === 'Nintendo Switch 2') && 'grid grid-cols-3 xl:grid-cols-3'}
        ${platformItems[0].name === 'Nintendo 3DS' && 'grid grid-cols-4'}
        ${platformItems[0].name === 'SNES' && 'grid grid-cols-3'}
        ${platformItems[0].name === 'Xbox 1' && 'grid grid-cols-2 xl:grid-cols-4'}      
        `}>
          {platformItems.map((item) => (
              <Link to={item.route} key={item.name}>
              <div className={`flex items-center justify-center cursor-pointer`}>
                <img className={`object-contain h-10 w-14 lg:w-20 lg:h-14 sm:h-8 sm:w-14 p-1 transition duration-300 shadow rounded-xl bg-slate-200 hover:bg-slate-400 shadow-black 
                ${(item.name === 'PS1' || item.name ==='PS2' || item.name ==='PS3' || item.name ==='PS4') && 'p-2 sm:p-2 lg:p-3'}
                ${(item.name === 'Wii') && 'p-3 sm:p-2 lg:p-4'}        
                ${(item.name === 'PC') && 'p-2 sm:p-1.5 lg:p-3'}
                ${(item.name === 'WiiU' || item.name === 'Nintendo 64' || item.name === 'Nintendo Switch' || item.name === 'Nintendo Switch 2' || item.name === 'GameCube' || item.name === 'SNES') && 'p-1.5 lg:p-3'}
                ${(item.name === 'Xbox 360') && 'p-0'}              
                `} 
                src={item.image} alt={item.name} title={item.name} />
              </div>
            </Link>
            ))
          }
        </div>
          <div><button onClick={() => setSelectedPlatform('')} className="w-32 p-2 text-xs text-white transition duration-300 rounded-lg sm:mt-1 lg:mt-4 bg-slate-950 hover:bg-slate-200 hover:text-slate-900">Volver</button></div>
      </div>
    )
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center font-medium bg-black bg-opacity-70 backdrop-blur-md">
      <div className="flex flex-col items-center p-5 transition-transform transform border-2 border-gray-400 shadow-2xl xl:px-24 xl:pt-24 rounded-3xl lg:p-8 sm:p-4 bg-slate-950">
        <div className="flex flex-col items-center h-full gap-5 text-sm lg:gap-10 lg:flex-row">          
          <Link to="/add-game-to-list">
            <div
              className="relative flex flex-col items-center justify-center gap-2 p-4 text-xs text-center text-white transition duration-500 shadow-md cursor-pointer rounded-3xl w-60 h-44 sm:h-36 lg:text-sm lg:h-80 lg:w-80 xl:h-96 sm:w-48 xl:w-[500px] bg-cover bg-center bg-no-repeat hover:brightness-110"
              style={{ backgroundImage: 'url(/wallpaperImages/Aventura-wallpaper.webp)' }}
            >
              <div className="absolute inset-0 transition duration-500 bg-black hover:bg-opacity-50 bg-opacity-60 rounded-3xl" />
                <div className="absolute flex items-center gap-2 px-3 py-2 text-white bottom-4 left-4 bg-black/30 rounded-xl">
                  <p>Catálogo completo</p>
                  <SearchIcon w={6} h={6} />
                </div>
            </div>
          </Link>
          <div>
          <div
              className="relative flex flex-col items-center justify-center gap-3 text-center text-white transition duration-500 shadow-md cursor-pointer shadow-black rounded-3xl w-60 h-44 sm:h-36 xl:h-96 lg:h-80 lg:w-80 sm:w-48 xl:w-[500px] bg-cover bg-center bg-no-repeat hover:brightness-110"
              style={{ backgroundImage: 'url(/platformFondos/Nintendo-Switch-fondo.webp)' }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60 hover:bg-opacity-30 rounded-3xl" />
              <div className="relative z-10 w-full h-full">

             { !selectedPlatform && 
             <div className="flex flex-col items-center justify-center pt-4 text-xs lg:text-sm gap-7 lg:gap-10 sm:gap-5 xl:w-full">
                <div className="absolute flex items-center gap-2 px-3 py-2 text-white bottom-4 left-4 bg-black/30 rounded-xl">
                  <h2>Por Plataforma/Sistema</h2>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:gap-2 xl:w-[80%] xl:pt-6">
                    {[
                      { name: 'Playstation', img: '/platformImages/PS1-Logo.webp', title: 'Playstation', hoverBg: 'hover:bg-slate-300' },
                      { name: 'Nintendo', img: '/platformImages/Nintendo-Logo.webp', title: 'Nintendo', hoverBg: 'hover:bg-purple-300' },
                      { name: 'Xbox', img: '/platformImages/Xbox-Logo.webp', title: 'Xbox', hoverBg: 'hover:bg-green-900' },
                      { name: 'PC', img: '/platformImages/PC-Logo.webp', title: 'Ordenador', hoverBg: 'hover:bg-green-300', link: '/add-game-to-list-by-platform/PC' },
                      { name: 'Portatil', img: '/platformImages/Portatil-Logo.webp', title: 'Consola portátil', hoverBg: 'hover:bg-yellow-500' },
                      { name: 'Retro', img: '/platformImages/Retro-Logo.webp', title: 'Consola retro', hoverBg: 'hover:bg-yellow-500' },
                    ].map(({ name, img, title, hoverBg, link }) =>
                      link ? (
                        <Link key={name} to={link} title={title} className={`flex flex-col items-center justify-center text-gray-900 xl:w-full xl:justify-between rounded-lg xl:rounded bg-slate-200 shadow-black transition duration-300 ${hoverBg}`}>
                          <img className="object-contain p-1.5 lg:h-10 lg:w-14 rounded-xl sm:h-8 sm:w-14 h-10 w-14" src={img}
                            alt="No hay imagen" title={title} />
                          <p className="hidden w-full pb-1 text-center xl:block">{name === 'PC' ? 'Ordenador' : name}</p>
                        </Link>
                      ) : (
                        <button key={name} onClick={() => handlePlatformClick(name)} className={`flex flex-col items-center justify-center text-gray-900 xl:w-full xl:justify-between rounded-lg xl:rounded bg-slate-200 shadow-black transition duration-300 ${hoverBg}`} title={title}>
                          <img className="object-contain p-1.5 lg:h-10 lg:w-14 rounded-xl sm:h-8 sm:w-14 h-10 w-14" src={img} alt="No hay imagen" title={title} />
                          <p className="hidden w-full pb-1 text-center xl:block">{name === 'PC' ? 'Ordenador' : name}</p>
                        </button>
                      )
                    )}
                </div>
              </div>}

              {selectedPlatform && renderPlatformContent()}
              </div>
             </div>
          </div>
        </div>        
        <button onClick={handleAddGameMenu} className="w-32 p-2 mt-6 text-white transition duration-500 rounded-lg shadow-md bg-slate-600 hover:bg-slate-500 hover:shadow-lg xl:mt-14 xl:mb-6">
          Cerrar
        </button>
      </div>
    </div>,
    document.body
  )
}
