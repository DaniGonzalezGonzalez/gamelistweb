import { useState } from "react"
import { Link } from "react-router-dom"
import { ListIcon } from "../../../assets/Icons/ListIcon"
import { platformData } from "./platformsDataToMenuFlotante"

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
        <div className={`grid items-center justify-center gap-3 
        ${(platformItems[0].name === 'PS1' || platformItems[0].name === 'Nintendo Switch') && 'grid grid-cols-3'}
        ${platformItems[0].name === 'Nintendo 3DS' && 'grid grid-cols-4'}
        ${platformItems[0].name === 'SNES' && 'grid grid-cols-3'}
        ${platformItems[0].name === 'Xbox 1' && 'grid grid-cols-2 lg:grid-cols-2'}      
        `}>
          {platformItems.map((item) => (
              <Link to={item.route} key={item.name}>
              <div className={`flex items-center cursor-pointer`}>
                <img className={`object-contain h-10 w-14 lg:w-20 lg:h-14 sm:h-8 sm:w-14 p-1 transition duration-300 shadow rounded-xl bg-slate-200 hover:bg-slate-400 shadow-black 
                ${(item.name === 'PS1' || item.name ==='PS2' || item.name ==='PS3' || item.name ==='PS4') && 'p-2 sm:p-2 lg:p-3'}
                ${(item.name === 'Wii') && 'p-3 sm:p-2 lg:p-4'}        
                ${(item.name === 'PC') && 'p-2 sm:p-1.5 lg:p-3'}
                ${(item.name === 'WiiU' || item.name === 'Nintendo 64' || item.name === 'Nintendo Switch' || item.name === 'GameCube' || item.name === 'SNES') && 'p-1.5 lg:p-3'}
                ${(item.name === 'Xbox 360') && 'p-0'}              
                `} 
                src={item.image} alt={item.name} title={item.name} />
              </div>
            </Link>
            ))
          }
        </div>
          <div><button onClick={() => setSelectedPlatform('')} className="w-32 p-2 mt-4 text-xs text-white transition duration-300 rounded-lg sm:mt-1 lg:mt-4 bg-slate-800 hover:bg-slate-200 hover:text-slate-900">Volver</button></div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 bg-opacity-70">
      <div className="flex flex-col items-center p-5 transition-transform transform rounded-lg shadow-2xl lg:p-8 sm:p-4 bg-slate-800">
        <div className="flex flex-col gap-5 text-sm sm:flex-row">          
          <Link to="/add-game-to-list">
            <div className="flex flex-col items-center justify-center gap-2 p-4 text-xs text-center text-white transition duration-500 shadow-md cursor-pointer rounded-3xl w-60 h-44 sm:h-36 lg:text-sm lg:h-80 sm:w-48 lg:w-80 bg-slate-700 hover:bg-slate-600">
              Catálogo completo
              <ListIcon w={8} h={8}/>
            </div>
          </Link>
          <div>
            <div className="flex flex-col items-center justify-center gap-3 p-4 text-center text-white transition duration-500 shadow-md cursor-pointer rounded-3xl w-60 h-44 sm:h-36 lg:h-80 sm:w-48 lg:w-80 bg-slate-700 hover:bg-slate-600">
             { !selectedPlatform && 
             <div className="flex flex-col items-center justify-center text-xs lg:text-sm gap-7 lg:gap-10 sm:gap-5">
                <h2>Por Plataforma</h2>
                <div className="grid grid-cols-3 gap-3 sm:gap-2">
                  <button onClick={() => handlePlatformClick('Playstation')} className="flex items-center justify-center">
                    <img className="object-contain h-10 p-2 transition duration-300 shadow w-14 lg:h-10 sm:h-8 sm:w-20 lg:w-14 rounded-xl bg-slate-200 hover:bg-slate-900 shadow-black" src={`/platformImages/PS1-Logo.webp`} alt="No hay imagen" title={`Playstation`}/>
                  </button>
                  <button onClick={() => handlePlatformClick('Nintendo')} className="flex items-center justify-center">
                    <img className="object-contain h-10 p-1 transition duration-500 shadow lg:h-10 lg:w-14 rounded-xl hover:bg-purple-300 bg-slate-200 shadow-black w-14 sm:h-8 sm:w-12" src={`/platformImages/Nintendo-Logo.webp`} alt="No hay imagen" title={`Nintendo`}/>
                  </button>
                  <button onClick={() => handlePlatformClick('Xbox')} className="flex items-center justify-center">
                    <img className="object-contain h-10 p-1 transition duration-500 shadow w-14 lg:h-10 lg:w-14 rounded-xl bg-slate-200 hover:bg-green-900 shadow-black sm:h-8 sm:w-12" src={`/platformImages/Xbox-Logo.webp`} alt="No hay imagen" title={`Xbox`}/>
                  </button>
                  <Link to={'/add-game-to-list-by-platform/PC'} title="PC" className="flex items-center justify-center"><img className="object-contain h-10 p-1 transition duration-500 shadow w-14 lg:h-10 lg:w-14 rounded-xl bg-slate-200 hover:bg-green-900 shadow-black sm:h-8 sm:w-12" src={`/platformImages/PC-Logo.webp`} alt="No hay imagen" title={`PC`}/></Link>
                  <button onClick={() => handlePlatformClick('Portatil')} className="flex items-center justify-center">
                    <img className="object-contain p-1.5 shadow lg:h-10 lg:w-14 rounded-xl bg-slate-200 shadow-black hover:bg-yellow-500 transition duration-500 sm:h-8 sm:w-14  h-10 w-14" src={`/platformImages/Portatil-Logo.webp`} alt="No hay imagen" title={`Consola portátil`}/>
                  </button>
                  <button onClick={() => handlePlatformClick('Retro')} className="flex items-center justify-center">
                    <img className="object-contain p-1.5 shadow lg:h-10 lg:w-14 rounded-xl bg-slate-200 shadow-black hover:bg-yellow-500 transition duration-500 sm:h-8 sm:w-14  h-10 w-14" src={`/platformImages/Retro-Logo.webp`} alt="No hay imagen" title={`Consola retro`}/>
                    </button>
                </div>
              </div>}

              {selectedPlatform && renderPlatformContent()}
             </div>
          </div>
        </div>        
        <button onClick={handleAddGameMenu} className="w-32 p-2 mt-6 text-white transition-shadow rounded-lg shadow-md bg-slate-600 hover:bg-slate-500 hover:shadow-lg">
          Cerrar
        </button>
      </div>
    </div>
  )
}
