import { useContext } from "react"
import { HeadHomePage } from "./HeadHomePage"
import { InfoHomePageJugando } from "./InfoHomePageJugando"
// import { InfoHomePageRecienTerminados } from "./InfoHomePageRecienTerminados"
import { InfoHomePageEnLista } from "./InfoHomePageEnLista"
import { InfoHomePageResto } from "./InfoHomePageResto"
// import { InfoHomePageProximos } from "./InfoHomePageProximos"
import { UserContext } from "../../../context/UserContext"
import { ScrollToTopButton } from "../../helpers/components/Menus&IndexHelpers/ScrollToTopButton"
import { InfoHomePageTerminados } from "./InfoHomePageTerminados"
import { Acceder } from "./Acceder"

export function Homepage() {  
  const { user } = useContext(UserContext)

  return (
    <div className="text-sm font-montserrat">
      <HeadHomePage/>
      {/* <Acceder/> */}
      {
        user.email && 
      <div>
        <div id="indice-infohomepage-jugando" className="text-white bg-slate-950 color-fondo-3">
          <InfoHomePageJugando/>
        </div>
        <div id="indice-infohomepage-terminados" className="text-white bg-indigo-300 color-fondo-3">
          <InfoHomePageTerminados/>
        </div>
        <div id="indice-infohomepage-en-lista" className="text-white bg-indigo-300 color-fondo-3">
          <InfoHomePageEnLista/>
        </div>
        <div id="indice-infohomepage-resto" className="text-white bg-indigo-300 color-fondo-3">
          <InfoHomePageResto/>
        </div>
        <div className="relative z-10"><ScrollToTopButton/></div>
      </div>
      }
    </div>
  )
}
