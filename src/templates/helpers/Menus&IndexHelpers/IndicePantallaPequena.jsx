/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react"
import { useHandlePlatformMenus } from "../../../hooks/useHandles"
import { ArchiveIcon, HomeIcon, SearchIcon } from "../../../assets/Icons"
import { ChooseAddGamesMenuFlotante } from "../Utils/ChooseAddGamesMenuFlotante"

export function IndicePantallaPequena({textAlign, setMenuOpen }) {
  const { handleAddGameMenu, menuAddGamesByPlatformOpen, chooseAddGamesMenuOpen, setChooseAddGamesMenuOpen } = useHandlePlatformMenus()
  const indexRef = useRef(null) // Referencia al índice

  const handleScrollToEdit = () => {
      setMenuOpen(false)
      scrollToTop()
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
      }
  
      // Escuchar el evento de cambio de tamaño de la ventana
      window.addEventListener('resize', handleResize)
  
      // Limpiar el event listener cuando el componente se desmonte
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [chooseAddGamesMenuOpen, setChooseAddGamesMenuOpen])


    useEffect(() => {
      // Cierra el menú al hacer clic fuera del índice
      function handleClickOutside(event) {
        if (indexRef.current && !indexRef.current.contains(event.target)) {
          setMenuOpen(false)
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [setMenuOpen])

    return (
      <div ref={indexRef} className="flex flex-col items-start justify-start gap-3 p-4 mb-2 text-xs text-white rounded-lg bg-slate-900 sm:text-base sm:hidden font-montserrat">
        <Link to="/" onClick={scrollToTop} className="flex items-center gap-2 text-white text-start font-montserrat"><HomeIcon w={5} h={5}/><span className="text-link-underline">Inicio</span></Link>
        <Link to="/edit-game-to-list-completa" onClick={handleScrollToEdit} className="flex items-center gap-2 text-white text-start font-montserrat"><ArchiveIcon w={5} h={5}/><span className="text-link-underline">Mis juegos</span></Link>      
  
        <div style={{ position: "relative", zIndex: menuAddGamesByPlatformOpen ? "10" : "1" }}>
          <button onClick={handleAddGameMenu} className={`${textAlign} text-white font-montserrat flex gap-2 items-center`}>
            <SearchIcon w={5} h={5}/>
            <div className="flex items-center gap-1 text-link-underline"><span>Buscar juegos <br/>en catálogo</span></div>
          </button>          
        </div>
  
        {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}
      </div>
    )
  }