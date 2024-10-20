/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { PlusIcon } from "../../../../assets/Icons/PlusIcon"
import { ArchiveIcon } from "../../../../assets/Icons/ArchiveIcon"
import { useHandlePlatformMenus } from "../../../../hooks/useHandles"
import { useEffect, useState } from "react"
import { ChooseAddGamesMenuFlotante } from "../Utils/ChooseAddGamesMenuFlotante"
import { HomeIcon } from "../../../../assets/Icons/HomeIcon"

export function IndicePantallaGrande({textAlign }) {
    const { handleAddGameMenu, menuAddGamesByPlatformOpen, chooseAddGamesMenuOpen, setChooseAddGamesMenuOpen } = useHandlePlatformMenus()
    const [configOpen, setConfigOpen] = useState(false)

    const toggleConfig = () => {
      setConfigOpen(!configOpen)
    }
    const handleScrollIndex = (idIndice) => {
      const editContentElement = document.getElementById(idIndice)
      if (editContentElement) {
        editContentElement.scrollIntoView({ behavior: "smooth" })
      }
    }

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
        setChooseAddGamesMenuOpen(false);
      }
    };

    // Escuchar el evento de cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [chooseAddGamesMenuOpen, setChooseAddGamesMenuOpen]);

  return (
    <div className={`justify-center hidden gap-5 text-xs sm:text-[10px] lg:text-xs text-white items-center font-montserrat sm:flex sm:flex-col`}>
      <div className="flex flex-col items-center gap-6">
       <Link to onClick={scrollToTop}  className="text-center text-white font-montserrat text-link-underline"><div className="flex flex-col items-center justify-center"><HomeIcon/>Inicio</div></Link>
      </div>
      <div className="items-center justify-center hidden gap-5 text-white font-montserrat sm:flex sm:flex-col">
        <Link onClick={scrollToTop} to="/edit-game-to-list-completa" className="text-center text-white font-montserrat text-link-underline"><div className="flex flex-col items-center justify-center"><ArchiveIcon/>Ver <br/> todos</div></Link>

        <div style={{ position: 'relative', zIndex: menuAddGamesByPlatformOpen ? '10' : '1' }}>
          <button onClick={handleAddGameMenu} className={`${textAlign} text-white font-montserrat text-link-underline`}>
             <div className="flex flex-col items-center"><PlusIcon /><span>Añadir <br/> juegos </span></div>                 
          </button>
        </div>
      </div>

      {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}

    </div>
  )
}
