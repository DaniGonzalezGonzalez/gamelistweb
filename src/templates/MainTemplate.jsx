import { Link, Outlet, useLocation } from "react-router-dom"
import { LinkedinIcon } from "../assets/Icons/Social-networks/LinkedinIcon"
import { NavBar } from "./MenuNavegacion/NavBar"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { useGetDataPortadaPorEstado } from "../hooks/Portada/useGetDataPortadaPorEstado"
import { HomePageSkeleton } from "./helpers/Utils/Skeletons/HomePageSkeleton"

export function MainTemplate() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const { user } = useContext(UserContext)

  const { isLoading: isLoadingJugando } = useGetDataPortadaPorEstado('Jugando')
  const { isLoading: isLoadingCompletando } = useGetDataPortadaPorEstado('Completando')

  const isLoadingHome = location.pathname === '/' && (isLoadingJugando || isLoadingCompletando)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    
    // Este return no sé si es necesario, no veo diferencia si lo elimino (hecho por Chat GPT) 
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      {isLoadingHome && <HomePageSkeleton />}

      <header className={`${(user.id && isScrolled) ? `${location.pathname === '/' ? 'bg-slate-950 bottom-0 sm:top-0 shadow-white shadow-md': 'bg-transparent top-0'} color-fondo-1  sm:h-0 opacity-100 sm:opacity-100` : `${location.pathname === '/' ? 'bg-slate-950 bottom-0': 'bg-transparent top-0'}` } fixed sm:w-0 w-full z-50 transition-all duration-300 ease-in-out font-montserrat font-medium`}>
        <div className={`${ location.pathname === '/' ? "text-xs " : "text-xs px-4 py-3" } sm:py-0 sm:px-0`}>
        <NavBar isScrolled={isScrolled}/>
        </div>
      </header>
      <main className="relative z-10 w-full font-medium font-montserrat bg-gradient-to-b from-slate-950 to-slate-950">
        <section className="min-h-screen">
            <Outlet/>
        </section>
      </main>
      <footer className="flex flex-col text-xs font-medium text-white font-montserrat">
        <div className={`flex flex-col items-center justify-center gap-4 p-4 text-center text-white ${location.pathname === '/' ? 'pb-14' : 'pb-4'} sm:pb-4 bg-gray-950 color-fondo-1`}>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <p>&copy; 2025 Game List Web - Daniel González González</p>
            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/daniel-gonz%C3%A1lez-gonz%C3%A1lez-3322668a/">
              <LinkedinIcon/>
            </a>
          </div>
          <div className="flex gap-6">
            <button className="text-link-underline"><Link to='use-terms'>Términos de uso</Link></button>
            <button className="text-link-underline"><Link to='privacy-policies'>Política de privacidad</Link></button>
          </div>
        </div>
      </footer>
      </>
    )
}
