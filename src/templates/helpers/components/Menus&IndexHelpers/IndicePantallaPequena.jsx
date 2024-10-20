/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { PlusIcon } from "../../../../assets/Icons/PlusIcon";
import { useHandlePlatformMenus } from "../../../../hooks/useHandles";
import { ChooseAddGamesMenuFlotante } from "../Utils/ChooseAddGamesMenuFlotante"
import { useEffect } from "react";

export function IndicePantallaPequena({textAlign, setMenuOpen }) {
  const { handleAddGameMenu, menuAddGamesByPlatformOpen, chooseAddGamesMenuOpen, setChooseAddGamesMenuOpen } = useHandlePlatformMenus()

  const handleScrollToEdit = () => {
      setMenuOpen(false)
      scrollToTop()
    }

  const handleScrollIndex = (idIndice) => {
    const editContentElement = document.getElementById(idIndice)
    if (editContentElement) {
      editContentElement.scrollIntoView({ behavior: "smooth" })
    }
    setMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setMenuOpen(false)
  }

    // Detectar cuando el tamaño de pantalla cambia a menor que `sm` (640px)
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth > 640 && chooseAddGamesMenuOpen) {
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
    <div className="flex flex-col items-start justify-start gap-3 p-2 mb-2 text-xs text-white rounded-lg bg-slate-900 sm:text-base sm:hidden font-montserrat">
        <Link to onClick={scrollToTop} className="text-white text-start font-montserrat text-link-underline">Inicio</Link>
        <Link to="/edit-game-to-list-completa" onClick={() => handleScrollToEdit()}  className="text-white text-start font-montserrat text-link-underline">Ver todos</Link>      

        <div style={{ position: 'relative', zIndex: menuAddGamesByPlatformOpen ? '10' : '1' }}>
          <button onClick={handleAddGameMenu} className={`${textAlign} text-white font-montserrat text-link-underline`}>
            <div className="flex items-center gap-1"><span>Añadir juegos</span><PlusIcon  w={4} h={4} /></div>
          </button>          
        </div>

        {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}
    </div>
  )
}
