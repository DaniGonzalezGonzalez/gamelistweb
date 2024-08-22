/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { MenuPSPlatforms } from "./MenuPlatforms/MenuPSPlatforms"
import { MenuNintendoPlatforms } from "./MenuPlatforms/MenuNintendoPlatforms"
import { MenuXboxPlatforms } from "./MenuPlatforms/MenuXboxPlatforms"
import { MenuPortatilesPlatforms } from "./MenuPlatforms/MenuPortatilesPlatforms"
import { MenuRetroPlatforms } from "./MenuPlatforms/MenuRetroPlatforms"
import { PlusIcon } from "../../../../assets/Icons/PlusIcon";
import { useHandlePlatformMenus } from "../../../../hooks/useHandles";
import { MenuPCPlatforms } from "./MenuPlatforms/MenuPCPlatforms";

export function IndicePantallaPequena({textAlign, isScrolledIndex, setMenuOpen }) {
  const { handleAddGameMenu, handlePSMenu, handleNintendoMenu, handleXboxMenu, handlePortatilesMenu, handleRetroMenu, handlePCMenu, menuAddGamesByPlatformOpen, menuAddGamesPS, menuAddGamesNintendo, menuAddGamesXbox, menuAddGamesPortatiles, menuAddGamesRetro, menuAddGamesPC } = useHandlePlatformMenus()

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


  return (
    <div className="flex flex-col justify-center w-3/5 gap-3 mx-3 mt-6 mb-2 text-xs text-white sm:text-base sm:hidden font-montserrat">
        <Link to onClick={scrollToTop} className="text-white text-start font-montserrat text-link-underline">Inicio</Link>
        <Link to onClick={() => handleScrollIndex('indice-infohomepage-jugando')}  className="text-white text-start font-montserrat text-link-underline">Jugando</Link>
        <Link to onClick={() => handleScrollIndex('indice-infohomepage-terminados')}  className="text-white text-start font-montserrat text-link-underline">Terminados</Link>
        <Link to onClick={() => handleScrollIndex('indice-infohomepage-en-lista')}  className="text-white text-start font-montserrat text-link-underline">En lista</Link>
        <Link to onClick={() => handleScrollIndex('indice-infohomepage-resto')}  className="text-white text-start font-montserrat text-link-underline">Otros</Link>
        
        <Link to="/admin-edit-game-to-list-completa" onClick={() => handleScrollToEdit()}  className="text-white text-start font-montserrat text-link-underline">Ver todos los juegos</Link>
        {/* <Link to="/admin-add-game-to-list" onClick={() => handleScrollToEdit()} className={`text-start text-white font-montserrat text-link-underline`}>Añadir juegos</Link> */}


        {/* <div style={{ position: 'relative', zIndex: menuAddGamesByPlatformOpen ? '10' : '1' }}>
          <div onClick={handleMenu} className={`text-white font-montserrat text-link-underline`}>
            {!menuAddGamesByPlatformOpen ? <SettingsIcon /> : <SettingsIconOpenMenu />}
          </div>
          {menuAddGamesByPlatformOpen && (
            <div className='bg-slate-950' style={{ position: 'absolute', top: '100%', left: 0, zIndex: '10', padding: '10px' }}>
              <Link to="/admin-add-game-to-list-PS4" className={`text-white font-montserrat text-link-underline`}>
                <div className={`${menuAddGamesByPlatformOpen ? 'bg-slate-700': 'bg-transparent'}flex items-center justify-center w-40 gap-1 text-xs`}>Añadir juegos de PS4</div>
              </Link>
            </div>
          )}
        </div> */}


        <div style={{ position: 'relative', zIndex: menuAddGamesByPlatformOpen ? '10' : '1' }}>
          <button onClick={handleAddGameMenu} className={`${textAlign} text-white font-montserrat text-link-underline`}>
            {!menuAddGamesByPlatformOpen ? <div className="flex items-center gap-1"><span>Añadir juegos</span><PlusIcon /></div> : <div className="flex items-center gap-1"><span>Añadir juegos</span><PlusIcon /></div>}
          </button>
          {menuAddGamesByPlatformOpen && (
            <div className={`${isScrolledIndex ? 'bg-slate-950' : 'bg-transparent'} flex flex-col items-start gap-3 rounded-lg`} style={{ position: 'absolute', top: '100%', left: 0, zIndex: '10', padding: '10px' }}>
                <Link className="p-1 transition duration-300 rounded-lg hover:bg-slate-800" to="/add-game-to-list"><div className="flex items-center justify-start w-32 gap-1 pt-2">Catálogo completo</div></Link>
                <div style={{ position: 'relative', zIndex: menuAddGamesPS ? '10' : '1' }}>
                  <button className="p-1 transition duration-300 rounded-lg hover:bg-slate-800" onClick={handlePSMenu}>Playstation
                    { menuAddGamesPS && <MenuPSPlatforms isScrolledIndex={isScrolledIndex}/> }
                  </button>
                </div>
                <div style={{ position: 'relative', zIndex: menuAddGamesPS ? '10' : '1' }}>
                  <button className="p-1 transition duration-300 rounded-lg hover:bg-slate-800" onClick={handleNintendoMenu}>Nintendo
                    { menuAddGamesNintendo && <MenuNintendoPlatforms isScrolledIndex={isScrolledIndex}/> }
                  </button>
                </div>
                <div style={{ position: 'relative', zIndex: menuAddGamesPS ? '10' : '1' }}>
                  <button className="p-1 transition duration-300 rounded-lg hover:bg-slate-800" onClick={handleXboxMenu}>Xbox
                    { menuAddGamesXbox && <MenuXboxPlatforms isScrolledIndex={isScrolledIndex}/> }
                  </button>
                </div>
                <div style={{ position: 'relative', zIndex: menuAddGamesPS ? '10' : '1' }}>
                  <button className="p-1 transition duration-300 rounded-lg hover:bg-slate-800" onClick={handlePortatilesMenu}>Portátiles
                    { menuAddGamesPortatiles && <MenuPortatilesPlatforms isScrolledIndex={isScrolledIndex}/> }
                  </button>
                </div>
                <div style={{ position: 'relative', zIndex: menuAddGamesPS ? '10' : '1' }}>
                  <button className="p-1 transition duration-300 rounded-lg hover:bg-slate-800" onClick={handleRetroMenu}>Retro
                    { menuAddGamesRetro && <MenuRetroPlatforms isScrolledIndex={isScrolledIndex}/> }
                  </button>
                </div>

                <div style={{ position: 'relative', zIndex: menuAddGamesPS ? '10' : '1' }}>
                  <button className="p-1 transition duration-300 rounded-lg hover:bg-slate-800" onClick={handlePCMenu}>PC
                    { menuAddGamesPC && <MenuPCPlatforms isScrolledIndex={isScrolledIndex}/> }
                  </button>
                </div>
            </div>
          )}
        </div>
    </div>
  )
}
