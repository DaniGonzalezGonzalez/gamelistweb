/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { ArchiveIcon, ConfigIcon, HomeIcon, SearchIcon } from "../../../assets/Icons"
import { useHandlePlatformMenus } from "../../../hooks/useHandles"
import { ChooseAddGamesMenuFlotante } from "../Utils/ChooseAddGamesMenuFlotante"

export function IndicePantallaGrande({textAlign, toggleConfig }) {
    const { handleAddGameMenu, menuAddGamesByPlatformOpen, chooseAddGamesMenuOpen, setChooseAddGamesMenuOpen } = useHandlePlatformMenus()
    // const [configOpen, setConfigOpen] = useState(false)

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

  // Detectar cuando el tamaño de pantalla cambia a menor que `sm` (640px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640 && chooseAddGamesMenuOpen) {
        // Si la pantalla es menor a `sm` y el menú está abierto, cerrarlo
        setChooseAddGamesMenuOpen(false)
      }
    }

    // Escuchar el evento de cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize)

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize)
    };
  }, [chooseAddGamesMenuOpen, setChooseAddGamesMenuOpen])

  return (
    <div className={`justify-center pl-6 sm:pl-10 lg:pl-10 pr-3 min-h-screen bg-slate-950 hidden gap-5 text-xs sm:text-[10px] lg:text-xs text-white items-center font-montserrat sm:flex sm:flex-col`}>
      <div className="flex flex-col items-center gap-6">
       <Link to onClick={scrollToTop}  className="text-center text-white font-montserrat text-link-underline"><div className="flex flex-col items-center justify-center"><HomeIcon/>Inicio</div></Link>
      </div>
      <div className="items-center justify-center hidden gap-5 text-white font-montserrat sm:flex sm:flex-col">
        <Link onClick={scrollToTop} to="/edit-game-to-list-completa" className="text-center text-white font-montserrat text-link-underline"><div className="flex flex-col items-center justify-center"><ArchiveIcon/>Mis juegos</div></Link>

        <div style={{ position: 'relative', zIndex: menuAddGamesByPlatformOpen ? '10' : '1' }}>
          <button onClick={handleAddGameMenu} className={`${textAlign} text-white font-montserrat text-link-underline`}>
             <div className="flex flex-col items-center"><SearchIcon /><span>Buscar <br/> juegos </span></div>                 
          </button>
        </div>

        <button className="flex items-center mt-4 space-x-2 text-white" onClick={toggleConfig}>
          <div className="p-1 transition duration-500 rounded hover:bg-slate-800">
            <ConfigIcon />
          </div>
        </button>
      </div>

      {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}

    </div>
  )
}
