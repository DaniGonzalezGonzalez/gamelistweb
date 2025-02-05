/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { ArchiveIcon, ConfigIcon, HomeIcon, SearchIcon } from "../../../assets/Icons"
import { useHandlePlatformMenus, useHandles } from "../../../hooks/useHandles"
import { ChooseAddGamesMenuFlotante } from "../Utils/ChooseAddGamesMenuFlotante"
import { ProfileIcon } from "../../../assets/Icons/ProfileIcon"
import { useState } from "react"

export function IndicePantallaGrande({textAlign, toggleConfig }) {
    const { handleAddGameMenu, menuAddGamesByPlatformOpen, chooseAddGamesMenuOpen, setChooseAddGamesMenuOpen } = useHandlePlatformMenus()
    // const [configOpen, setConfigOpen] = useState(false)
  const [iconSize, setIconSize] = useState(6)

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
      if (window.innerWidth < 768) {
        // Si la pantalla es menor a `sm` y el menú está abierto, cerrarlo
        setIconSize(5)
      } else {
        setIconSize(6)
      }
    }

    // handleResize();


    // Escuchar el evento de cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize)

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize)
    };
  }, [chooseAddGamesMenuOpen, setChooseAddGamesMenuOpen])

  const { handleScrollToSection } = useHandles()

  return (
    <div className={`justify-center pl-6 sm:pl-10 lg:pl-10 pr-3 min-h-screen hidden gap-5 text-xs sm:text-[9px] lg:text-xs text-white items-center font-montserrat sm:flex sm:flex-col`}>
      <div className="flex flex-col items-center gap-6">
       <Link to onClick={scrollToTop}  className="p-1 text-center text-white transition duration-500 rounded font-montserrat hover:bg-slate-800"><div className="flex flex-col items-center justify-center"><HomeIcon w={iconSize} h={iconSize}/>Inicio</div></Link>
      </div>
      <div className="items-center justify-center hidden gap-5 text-white font-montserrat sm:flex sm:flex-col">
        <button onClick={() => handleScrollToSection("indice-infohomepage-jugando")} className="p-1 text-center text-white transition duration-500 rounded font-montserrat hover:bg-slate-800"><div className="flex flex-col items-center justify-center"><ArchiveIcon w={iconSize} h={iconSize}/>Mis listas</div></button>
        <div style={{ position: 'relative', zIndex: menuAddGamesByPlatformOpen ? '10' : '1' }}>
          <button onClick={() => handleScrollToSection("explora-el-catalogo")} className={`${textAlign} text-white font-montserrat p-1 transition duration-500 rounded hover:bg-slate-800`}>
             <div className="flex flex-col items-center"><SearchIcon w={iconSize} h={iconSize} /><span>Buscar <br/> juegos </span></div>                 
          </button>
        </div>
        <Link to={'/user-profile'}>
            <div className="flex flex-col items-center justify-center p-1 transition duration-500 rounded hover:bg-slate-800">
              <ProfileIcon w={iconSize} h={iconSize} />
              <p>Perfil</p>             
            </div>
          </Link>
        <button className="flex items-center space-x-2 text-white" onClick={toggleConfig}>
          <div className="flex flex-col items-center p-1 transition duration-500 rounded hover:bg-slate-800">
            <ConfigIcon w={iconSize} h={iconSize} />
            <p>Ajustes</p>             
          </div>
        </button>
      </div>

      {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}

    </div>
  )
}
