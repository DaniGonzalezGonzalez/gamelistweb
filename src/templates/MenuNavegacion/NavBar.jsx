/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom"
import { IndicePantallaPequena } from "../helpers/Menus&IndexHelpers/IndicePantallaPequena"
import { configOptions } from "../helpers/Utils/configOptions"
import { NavBarBigScreenSettingsButtons, NavBarSmallScreenSettingsButtons, useFunctionsNavBar } from "./NavBarHelpers"

export function NavBar({ isScrolled }) {
  const { user, menuOpen, setMenuOpen, configOpen, setConfigOpen, toggleMenu, toggleConfig, handleLogout, linkToContent, handleGoBack, isScrolledIndex } = useFunctionsNavBar(isScrolled)
  const location = useLocation()
  const showHomeButton = !location.pathname.includes('/game/')

  return (
    <nav>
      {/* Los enlaces sociales */}
      <div className="flex gap-0 text-white sm:gap-3 font-montserrat">
        {/* Botones del menú en pantallas pequeñas */}
        <NavBarSmallScreenSettingsButtons user={user} location={location} menuOpen={menuOpen} toggleMenu={toggleMenu} toggleConfig={toggleConfig} handleGoBack={handleGoBack} showHomeButton={showHomeButton}/>
        {/* Menú en pantallas grandes */}
        <NavBarBigScreenSettingsButtons user={user} isScrolledIndex={isScrolledIndex} toggleConfig={toggleConfig}/>
      </div>

      {/* Menú de pantallas pequeñas. Solo muestra el texto del menú cuando está abierto */}
      {(menuOpen && location.pathname === '/') && (
        <div className="flex items-start justify-start w-full gap-3 mt-4 mb-2 text-sm text-white sm:text-base sm:hidden font-montserrat">
          {/* El setMenu es para que se cierre cuando clickamos en cualquier palabra del índice, salvo el inicio */}
          <IndicePantallaPequena setMenuOpen={setMenuOpen} textAlign={'text-start'} isScrolledIndex={isScrolledIndex}/>
        </div>
      )}
      
      {/* Botón de config (ruedita) */}
      {configOptions(configOpen, user, linkToContent, toggleConfig, handleLogout)}
    </nav>
  )
}
