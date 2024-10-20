/* eslint-disable react/prop-types */
import { useContext, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { ConfigIcon, HomeIcon, LoginIcon, LogOutIcon, SettingsIcon, SettingsIconOpenMenu } from "../../assets/Icons"
import { IndicePantallaGrande } from "../helpers/components/Menus&IndexHelpers/IndicePantallaGrande"
import { IndicePantallaPequena } from "../helpers/components/Menus&IndexHelpers/IndicePantallaPequena"
import { configOptions } from "../helpers/components/Utils/configOptions"
import { ArrowLeft } from "../../assets/Icons/ArrowLeft"

export function NavBar({isScrolled}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [configOpen, setConfigOpen] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('PS5')
  const { user, _signOut } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation();
  const showHomeButton = !location.pathname.includes('/game/');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    setConfigOpen(!configOpen)
    setConfigOpen(false)
  }

  const toggleConfig = () => {
    setConfigOpen(!configOpen)
    setMenuOpen(false)
  }

  const handleLogout = () => {
    setMenuOpen(false)
    setConfigOpen(false)
    _signOut()
    navigate('/')
  }

  const linkToContent = () => {
    setConfigOpen(false)
  }

  const handleGoBack = () => {
    navigate(-1)
}

// const handlePlatformChange = (event) => {
//   setSelectedPlatform(event.target.value) // Actualiza la plataforma seleccionada
// }

  const isScrolledIndex = isScrolled

  return (
    <nav>
      {/* Los enlaces sociales */}
      <div className="flex gap-0 text-white sm:gap-3 font-montserrat">
        {/* Botón de Settings visible en todas las pantallas. Con el hidden controlo que aparezca en pantallas pequeñas solamente. Configuración del detalle específico de cada juego con /game */}
        {
        user.id ? (        
        location.pathname === '/' ?
        <div className="flex items-center justify-between w-full sm:w-0">
          <button className="flex items-center p-1 space-x-2 text-white rounded hover:bg-slate-800 sm:hidden" onClick={toggleMenu}>
            {!menuOpen ? <SettingsIcon/> : <SettingsIconOpenMenu/>}
          </button>
          <button className="sm:hidden" onClick={toggleConfig}>
            <div className="p-1 transition duration-500 rounded hover:bg-slate-800">
              <ConfigIcon />
            </div>
          </button>
        </div> :
        <div>         
          <div className="flex items-center gap-2">
            { showHomeButton && <Link to='/'><div className="p-1 mt-1 ml-2 transition duration-500 rounded-lg bg-slate-900 hover:bg-slate-700"><HomeIcon/></div></Link>}
            <button className={`flex items-center gap-1 p-2 mt-1 transition duration-500 rounded-lg bg-slate-900 hover:bg-green-700`} onClick={handleGoBack}>{!showHomeButton && <ArrowLeft w={4} h={4} />}<p className="p-.05">Volver</p></button>
          </div>
        </div> 
        ) : ''       
        }
        
        {/* Menú en pantallas grandes */}
        {
          // user.id ? 
        <div>
          {user.id && (
            <div className="relative flex items-center justify-between w-full pr-1 bg-transparent"> {/* Agregar relative aquí */}
              {location.pathname === '/' && (
                <div className="z-0 hidden w-1/4 h-full sm:block"> {/* Cambia el z-index aquí */}
                  <div className="flex flex-col items-start justify-center min-h-screen">
                    <IndicePantallaGrande textAlign={'text-start'} isScrolledIndex={isScrolledIndex} />
                    <button className="flex items-center mt-4 space-x-2 text-white" onClick={toggleConfig}>
                      <div className="p-1 transition duration-500 rounded hover:bg-slate-800">
                        <ConfigIcon />
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
          // :
          // <button>
          //   <div className="flex gap-5">
          //     {location.pathname !== '/' && <Link to='/'><HomeIcon /></Link>}
          //     {location.pathname !== '/' && <div className="text-white" onClick={handleGoBack}><p className="p-1 transition duration-500 hover:text-green-600">Volver</p></div>}
          //   </div>

          // </button>
        }
      </div>


      {/* Menú de pantallas pequeñas. Solo muestra el texto del menú cuando está abierto */}
      {(menuOpen && location.pathname === '/') && (
        <div className="flex items-start justify-start w-full gap-3 mt-4 mb-2 text-sm text-white sm:text-base sm:hidden font-montserrat">
          {/* El setMenu es para que se cierre cuando clickamos en cualquier palabra del índice, salvo el inicio */}
          <IndicePantallaPequena setMenuOpen={setMenuOpen} textAlign={'text-start'} isScrolledIndex={isScrolledIndex}/>
        </div>
      )}
       
  
      {configOptions(configOpen, user, linkToContent, toggleConfig, handleLogout)}

    </nav>
  )
}
