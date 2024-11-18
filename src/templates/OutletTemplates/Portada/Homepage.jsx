import { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"
import { HeadHomePage, InfoHomePageJugando, InfoHomePageEnLista, InfoHomePageResto, InfoHomePageTerminados, Carrusel } from './PortadaOnline'
import { InfoHomePageEnListaOffline, InfoHomePageGamesCategoriesOffline, InfoHomePageJugandoOffline, InfoHomePageTerminadosOffline } from "./PortadaOffline"
import { ScrollToTopButton } from "../../helpers/Utils/ScrollToTopButton"

export function Homepage() {  
  const { user } = useContext(UserContext)
  const location = useLocation()
  
  useEffect(() => {
    // Limpiar previousUrl al cambiar de ruta. Url se usa para añadir plataforma a título de juego
    sessionStorage.removeItem('previousUrl');
  }, [location])

  return (
    <div className={`text-sm ${user.id && 'sm:pl-10'} font-montserrat`}>
      <HeadHomePage/>
      {
        user.email && 
      <div>
        <div id="indice-infohomepage-jugando" className="text-white ">
          <InfoHomePageJugando/>
        </div>
        <div id="indice-infohomepage-terminados" className="text-white">
          <InfoHomePageTerminados/>
        </div>
        <div id="indice-infohomepage-en-lista" className="text-white">
          <InfoHomePageEnLista/>
        </div>
        <div id="indice-infohomepage-resto" className="text-white">
          <InfoHomePageResto/>
        </div>
        <div className="flex flex-col items-start justify-start text-white mt-28 lg:mt-40 sm:pl-16">
          <h1 className="pl-8 text-2xl font-bold text-center uppercase sm:pl-0">Explora el catálogo</h1>
          <h1 className="pl-8 mt-3 text-sm font-bold text-center lg:text-xl sm:pl-0">¡Añade nuevos juegos!</h1>
          <Carrusel />
        </div>
        <div className="relative z-10"><ScrollToTopButton/></div>
      </div>
      }
      
      { !user.email && 
       <div>
        <div  className="text-white bg-slate-950 color-fondo-3">
         <InfoHomePageGamesCategoriesOffline/>
        </div>
         <div id="indice-infohomepage-jugando" className="text-white bg-slate-950 color-fondo-3">
         <InfoHomePageJugandoOffline/>
        </div>
        <div id="indice-infohomepage-terminados" className="text-white bg-slate-950 color-fondo-3">
          <InfoHomePageTerminadosOffline/>
        </div>
        <div id="indice-infohomepage-en-lista" className="text-white bg-indigo-300 color-fondo-3">
          <InfoHomePageEnListaOffline/>
        </div>
       </div>
      }
    </div>
  )
}
