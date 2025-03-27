import { useContext, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"
import { HeadHomePage, InfoHomePageJugando, InfoHomePageResto, InfoHomePageTerminados, InfoHomePageProximos } from './PortadaOnline'
import { InfoHomePageGamesCategoriesOffline, InfoHomePageJugandoOffline, InfoHomePageProximosOffline, InfoHomePageTerminadosOffline } from "./PortadaOffline"
import { ScrollToTopButton } from "../../helpers/Utils/ScrollToTopButton"
import { BannerGrandeSagas } from "./PortadaOnline/PortadaOnlineHelpers/BannerGrandeSagas"
import { PlataformasCatalogoCarrusel } from "./PortadaOnline/Carruseles"
import { PersonalizadoColeccionesCarrusel } from "./PortadaOnline/Carruseles/PersonalizadoColeccionesCarrusel"
import { desarrolladoras, genero, notaPrensa, platforms, sagas } from "../../helpers/constants/constants"
import { OnlineExamplesGallery } from "./PortadaOffline/OnlineExamplesGallery"
// import { useGamesFromRAWG } from "../../../hooks/useGamesFromRAWG"

export function Homepage() {   
  const { user } = useContext(UserContext)
  const location = useLocation()
  // const { games } = useGamesFromRAWG('God of War')

  useEffect(() => {
    // Limpiar previousUrl al cambiar de ruta. Url se usa para añadir plataforma a título de juego
    sessionStorage.removeItem('previousUrl');
  }, [location])

  return (
    <div className={`text-sm ${user.id && ''} font-montserrat`}>
      {/* {console.log(games)} */}
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
          <div id="indice-infohomepage-proximos" className="text-white">
            <InfoHomePageProximos/>
          </div>
          <div id="indice-infohomepage-resto" className="text-white">
            <InfoHomePageResto/>
          </div>
          <div id="explora-el-catalogo" className="flex flex-col items-start justify-start text-white mt-20 pt-10 sm:mt-10 lg:mt-14 sm:pl-20 lg:pl-[85px]">
            <h1 className="pl-6 text-2xl font-bold text-center uppercase sm:pl-2">Buscar en catálogo</h1>
            <h1 className="pl-6 mt-4 text-base text-center lg:text-xl sm:pl-2">Por plataforma</h1>
            <PlataformasCatalogoCarrusel />
          </div>
          <div className="pb-10 mt-3">
            <PersonalizadoColeccionesCarrusel items={genero} filterType={'genero'} nombreCarrusel={'Por género'}/>
          </div>
          <div className="pb-10 mt-3">
            <PersonalizadoColeccionesCarrusel items={notaPrensa} filterType={'notaMetacriticPrensa'} nombreCarrusel={'Por nota de los medios'}/>
          </div>
          <BannerGrandeSagas/>
          <div className="pb-10 mt-3">
            <PersonalizadoColeccionesCarrusel items={sagas} filterType={'titulo'} nombreCarrusel={'Sagas'}/>
          </div>
          <div className="pb-10 mt-3">
            <PersonalizadoColeccionesCarrusel items={desarrolladoras} filterType={'descripcion'} nombreCarrusel={'Desarrolladoras'}/>
          </div>
          <div className="relative z-10"><ScrollToTopButton/></div>
        </div>
      }
      
      { !user.email && 
        <div>
          <div  className="text-white color-fondo-3">
            <OnlineExamplesGallery/>
          </div>
          <div  className="text-white bg-slate-950 color-fondo-3">
          <InfoHomePageGamesCategoriesOffline/>
          </div>
          <div id="indice-infohomepage-jugando" className="text-white bg-slate-950 color-fondo-3">
          <InfoHomePageJugandoOffline/>
          </div>
          <div id="indice-infohomepage-terminados" className="text-white bg-slate-950 color-fondo-3">
            <InfoHomePageTerminadosOffline/>
          </div>
          <div id="indice-infohomepage-próximos" className="text-white bg-indigo-300 color-fondo-3">
            <InfoHomePageProximosOffline/>
          </div>
        </div>
      }
    </div>
  )
}
