/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { MenuPSPlatforms } from "./MenuPlatforms/MenuPSPlatforms"
import { MenuNintendoPlatforms } from "./MenuPlatforms/MenuNintendoPlatforms"
import { MenuPortatilesPlatforms } from "./MenuPlatforms/MenuPortatilesPlatforms"
import { MenuXboxPlatforms } from "./MenuPlatforms/MenuXboxPlatforms"
import { MenuRetroPlatforms } from "./MenuPlatforms/MenuRetroPlatforms"
import { PlusIcon } from "../../../../assets/Icons/PlusIcon"
import { ControllerIcon } from "../../../../assets/Icons/ControllerIcon"
import { PlayIcon } from "../../../../assets/Icons/PlayIcon"
import { CheckIcon } from "../../../../assets/Icons/CheckIcon"
import { ProximosIcon } from "../../../../assets/Icons/ProximosIcon"
import { ListIcon } from "../../../../assets/Icons/ListIcon"
import { ArchiveIcon } from "../../../../assets/Icons/ArchiveIcon"
import { useHandlePlatformMenus } from "../../../../hooks/useHandles"
import { MenuPCPlatforms } from "./MenuPlatforms/MenuPCPlatforms"

export function IndicePantallaGrande({textAlign, isScrolledIndex}) {
    const { handleAddGameMenu, handlePSMenu, handleNintendoMenu, handleXboxMenu, handlePortatilesMenu, handleRetroMenu, handlePCMenu, menuAddGamesByPlatformOpen, menuAddGamesPS, menuAddGamesNintendo, menuAddGamesXbox, menuAddGamesPortatiles, menuAddGamesRetro, menuAddGamesPC } = useHandlePlatformMenus()

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

  return (
    <div className="justify-center hidden gap-5 text-white sm:items-end font-montserrat sm:flex">
      <div className="flex items-end gap-6 pr-10">
       <Link to onClick={scrollToTop}  className="text-center text-white font-montserrat text-link-underline"><div className="flex flex-col items-center justify-center"><ControllerIcon/>Inicio</div></Link>
        <Link to onClick={() => handleScrollIndex('indice-infohomepage-jugando')}  className="text-center text-white font-montserrat text-link-underline"><div className="flex flex-col items-center justify-center"><PlayIcon/>Jugando</div></Link>
        <Link to onClick={() => handleScrollIndex('indice-infohomepage-terminados')}  className="text-center text-white font-montserrat text-link-underline"><div className="flex flex-col items-center justify-center"><CheckIcon/>Terminados</div></Link>
        <Link to onClick={() => handleScrollIndex('indice-infohomepage-en-lista')}  className="text-center text-white font-montserrat text-link-underline"><div className="flex flex-col items-center justify-center"><ProximosIcon/>En lista</div></Link>
        <Link to onClick={() => handleScrollIndex('indice-infohomepage-resto')}  className="text-center text-white font-montserrat text-link-underline"><div className="flex flex-col items-center justify-center"><ListIcon/>Otros</div></Link>
      </div>
      <div className="justify-center hidden gap-5 text-white sm:items-end font-montserrat sm:flex">
        <Link onClick={scrollToTop} to="/admin-edit-game-to-list-completa" className="text-center text-white font-montserrat text-link-underline"><div className="flex flex-col items-center justify-center"><ArchiveIcon/>Ver todos</div></Link>



        <div style={{ position: 'relative', zIndex: menuAddGamesByPlatformOpen ? '10' : '1' }}>
          <button onClick={handleAddGameMenu} className={`${textAlign} text-white font-montserrat text-link-underline`}>
            {!menuAddGamesByPlatformOpen ? <div className="flex flex-col items-center"><PlusIcon /><span>Añadir juegos </span></div> : <div className="flex items-center gap-2"><span>Añadir juegos </span><PlusIcon /></div>}
          </button>
          {menuAddGamesByPlatformOpen && (
            <div className={`${isScrolledIndex ? 'bg-slate-950' : 'bg-transparent'} flex flex-col items-start gap-3 rounded-lg`} style={{ position: 'absolute', top: '100%', left: 0, zIndex: '10', padding: '10px' }}>
              <Link className="p-1 transition duration-300 rounded-lg hover:bg-slate-800" to="/add-game-to-list"><div className="flex items-center justify-start w-32 gap-1">Catálogo completo</div></Link>
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
    </div>
  )
}
