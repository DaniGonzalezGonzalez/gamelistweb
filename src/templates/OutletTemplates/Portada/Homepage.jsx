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
import { useVisibilityObserver } from "../../../hooks/useVisibilityObserver"
// import { useGamesFromRAWG } from "../../../hooks/useGamesFromRAWG"

export function Homepage() {   
  const { user } = useContext(UserContext)
  const location = useLocation()
  // const { games } = useGamesFromRAWG('God of War')
  const visibleItems = useVisibilityObserver(".observed-item", 0.2, ["carrusel-plataformas-block", 'carrusel-genero-block', 'carrusel-notaprensa-block', 'banner-grande', 'carrusel-sagas-block', 'carrusel-desarrolladoras-block']);

  useEffect(() => {
    // Limpiar previousUrl al cambiar de ruta. Url se usa para añadir plataforma a título de juego
    sessionStorage.removeItem('previousUrl');
  }, [location])

  return (
    <div className={`text-sm ${user.id && ''} font-montserrat font-medium`}>
      <HeadHomePage/>
      {
        user.email && 
        <div>
          <div id="indice-infohomepage-jugando" className="text-white">
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
          <div data-id='carrusel-plataformas-block' id="explora-el-catalogo" className={`observed-item flex flex-col items-start justify-start text-white mt-20 pt-10 sm:mt-10 lg:mt-14 sm:pl-20 lg:pl-[89px] transition duration-1000 ease-out ${visibleItems["carrusel-plataformas-block"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h1 className="pl-6 text-2xl font-bold text-center uppercase sm:pl-2">Buscar en catálogo</h1>
            <h1 className="pl-6 mt-4 text-base text-center lg:text-xl sm:pl-2">Por plataforma</h1>
            <PlataformasCatalogoCarrusel />
          </div>
          <div data-id='carrusel-genero-block' className={`transition duration-1000 ease-out pb-10 xl:pl-2 mt-3 observed-item ${visibleItems["carrusel-genero-block"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <PersonalizadoColeccionesCarrusel items={genero} filterType={'genero'} nombreCarrusel={'Por género'}/>
          </div>
          <div data-id='carrusel-notaprensa-block' className={`transition duration-1000 ease-out xl:pl-2 pb-10 mt-3 observed-item ${visibleItems["carrusel-notaprensa-block"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <PersonalizadoColeccionesCarrusel items={notaPrensa} filterType={'notaMetacriticPrensa'} nombreCarrusel={'Por nota de los medios'}/>
          </div>
          <div data-id='banner-grande' className={`transition duration-1000 ease-out observed-item ${visibleItems["banner-grande"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}><BannerGrandeSagas/></div>
          <div data-id='carrusel-sagas-block' className={`transition duration-1000 ease-out pb-10 xl:pl-2 mt-3 observed-item ${visibleItems["carrusel-sagas-block"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <PersonalizadoColeccionesCarrusel items={sagas} filterType={'titulo'} nombreCarrusel={'Sagas'}/>
          </div>
          <div data-id='carrusel-desarrolladoras-block' className={`transition duration-1000 xl:pl-2 ease-out pb-10 mt-3 observed-item ${visibleItems["carrusel-desarrolladoras-block"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
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
