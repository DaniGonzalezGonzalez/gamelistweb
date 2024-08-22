/* eslint-disable react/prop-types */
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { ConfigIcon, HomeIcon, LoginIcon, LogOutIcon, SettingsIcon, SettingsIconOpenMenu } from "../../assets/Icons"
import { IndicePantallaGrande } from "../helpers/components/Menus&IndexHelpers/IndicePantallaGrande"
import { IndicePantallaPequena } from "../helpers/components/Menus&IndexHelpers/IndicePantallaPequena"
import { CopyDocumentsByPlatform } from "../helpers/components/AdminComponents/MoveDocument"

export function NavBar({isScrolled}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [configOpen, setConfigOpen] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('PS5')
  const { user, _signOut } = useContext(UserContext)
  const navigate = useNavigate()

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
      <div className="flex justify-between gap-3 text-white font-montserrat">
        {/* Botón de Settings visible en todas las pantallas. Con el hidden controlo que aparezca en pantallas pequeñas solamente. Configuración del detalle específico de cada juego con /game */}
        {
        user.id ? (        
        location.pathname === '/' ?
        <button className="flex items-center p-1 space-x-2 text-white rounded hover:bg-slate-600 sm:hidden" onClick={toggleMenu}>
          {!menuOpen ? <SettingsIcon/> : <SettingsIconOpenMenu/>}
        </button> :
        <div>         
        <div className="flex items-center gap-2">
            <Link to='/'><div className="p-1 transition duration-500 bg-gray-800 rounded-lg hover:bg-slate-600"><HomeIcon/></div></Link>
            <button className="flex items-center gap-3 p-2 transition duration-500 rounded-lg bg-slate-800 hover:bg-green-700" onClick={handleGoBack}><p className="p-.05">Volver</p></button>
          </div>
        </div> ) : ''       
        }
        
        {/* Menú en pantallas grandes */}
        {
          user.id ? 
          <div className="flex items-center justify-between w-full">
            {
              (user.id) &&
              <div className="flex items-center justify-end w-full">
                {location.pathname === '/' && 
                  <div className="flex justify-center flex-1">
                  <IndicePantallaGrande textAlign={'text-center'} isScrolledIndex={isScrolledIndex} />
                </div>
                }
                <button className="flex items-center space-x-2 text-white" onClick={toggleConfig}>
                  <div className="p-1 transition duration-500 rounded hover:bg-slate-600">
                    <ConfigIcon />
                  </div>
                </button>
              </div>
            }
          </div> :
          <button>
            {location.pathname === '/' && <Link to='login'><LoginIcon /></Link>}
            <div className="flex gap-5">
              {location.pathname !== '/' && <Link to='/'><HomeIcon /></Link>}
              {location.pathname !== '/' && <div className="text-white" onClick={handleGoBack}><p className="p-1 transition duration-500 hover:text-green-600">Volver</p></div>}
            </div>

          </button>
        }
      </div>


      {/* Menú de pantallas pequeñas. Solo muestra el texto del menú cuando está abierto */}
      {(menuOpen && location.pathname === '/') && (
        <div className="flex flex-col justify-center w-2/6 gap-3 mt-6 mb-2 text-sm text-white sm:text-base sm:hidden font-montserrat">
          {/* El setMenu es para que se cierre cuando clickamos en cualquier palabra del índice, salvo el inicio */}
          <IndicePantallaPequena setMenuOpen={setMenuOpen} textAlign={'text-start'} isScrolledIndex={isScrolledIndex}/>
        </div>
      )}

      {/* Menú de configuración (ruedita) */}
      {(configOpen) && (
          <div className="flex flex-col items-end justify-end w-full gap-3 mt-6 mb-2 text-sm text-white sm:text-sm font-montserrat">
            <div className="flex flex-col justify-end w-2/6 gap-3 mb-2 text-xs text-white sm:text-sm font-montserrat">
                {(user.id && user.email===import.meta.env.VITE_ADMIN_EMAIL) && <button className="p-1 rounded text-end" onClick={linkToContent}>
                  <Link onClick={toggleConfig} to='/admin-add-content'>Añadir contenido a base de datos</Link>
                </button>}
                {(user.id && user.email===import.meta.env.VITE_ADMIN_EMAIL) && <button className="p-1 rounded text-end" onClick={linkToContent}><Link onClick={toggleConfig} to='/admin-edit-content'>Editar contenido a base de datos</Link></button>}
                {/* {(user.id && user.email===process.env.REACT_APP_ADMIN_EMAIL) && <div className="p-1 rounded text-end">
                    <label htmlFor="platform-select" className="block mb-1">Seleccionar plataforma:</label>
                    <select id="platform-select" className="p-1 text-white bg-gray-800 rounded" value={selectedPlatform}                     onChange={handlePlatformChange}>{['PS5', 'PS4', 'PS3', 'PS2', 'PS1','Nintendo Switch', 'WiiU', 'Wii', 'GameCube', 'Nintendo 64', 'Game Boy Advance', 'Game Boy Color', 'Game Boy','Xbox One', 'Xbox 360', 'SEGA Mega Drive', 'PSP', 'PSVita', 'Nintendo 3DS', 'Nintendo DS', 'NES', 'SNES'].map(platform => (<option key={platform} value={platform}>{platform}</option>))} </select>
                    <CopyDocumentsByPlatform platformName={selectedPlatform}/>
                  </div>} */}
                { user.id && 
                
                <div className="flex flex-col gap-1 sm:gap-5 sm:flex-row sm:justify-end sm:items-center">
                  <Link onClick={toggleConfig} to='/faq' className="flex justify-end gap-2 text-end"><span className="p-1 rounded-lg hover:bg-gray-900">Ayuda</span></Link>
                  <Link onClick={toggleConfig} to='/user-profile' className="flex justify-end gap-2 text-end"><span className="p-1 rounded-lg hover:bg-gray-900">Perfil</span></Link>
                  <button className="flex justify-end gap-2 text-end" onClick={handleLogout}><div className="flex items-center justify-end gap-2 p-1 transition duration-500 rounded-lg hover:bg-gray-900">Cerrar sesión <LogOutIcon/></div></button></div>
                
                }
              </div>
          </div>
        )}
    </nav>
  )
}
