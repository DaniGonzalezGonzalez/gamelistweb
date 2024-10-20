import { useContext, useEffect } from "react"
import { UserContext } from "../../../context/UserContext"
import { HeadHomePage, InfoHomePageJugando, InfoHomePageEnLista, InfoHomePageResto, InfoHomePageTerminados } from './index'
import { InfoHomePageEnListaOffline, InfoHomePageGamesCategoriesOffline, InfoHomePageJugandoOffline, InfoHomePageTerminadosOffline } from "./PortadaOffline"
import { ScrollToTopButton } from "../../helpers/components/Menus&IndexHelpers/ScrollToTopButton"
import { useLocation } from "react-router-dom"
 
export function Homepage() {  
  const { user } = useContext(UserContext)
  const location = useLocation();

  useEffect(() => {
    // Limpiar previousUrl al cambiar de ruta
    sessionStorage.removeItem('previousUrl');
  }, [location]);
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
