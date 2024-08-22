import { Link, Outlet, useLocation } from "react-router-dom"
import { LinkedinIcon } from "../assets/Icons/Social-networks/LinkedinIcon"
import { NavBar } from "./MenuNavegacion/NavBar"
import { useEffect, useState } from "react"

export function MainTemplate() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

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
      <header className={`${isScrolled ? "bg-gray-950 color-fondo-1 shadow-md h-22 opacity-95" : `${location.pathname === '/' ? 'bg-transparent h-32': 'bg-transparent'}` } fixed top-0 w-screen z-50 transition-all duration-300 ease-in-out font-montserrat`}>
          <div className={`${ location.pathname === '/' && isScrolled ? "my-0 m-2 text-xs" : "m-2 mt-6 text-xs" } p-3`}>
            <NavBar isScrolled={isScrolled}/>
          </div>
      </header>
      <main className="w-full font-montserrat">
          <section className="min-h-screen">
              <Outlet/>
          </section>
      </main>
      <footer className="flex flex-col text-xs text-white font-montserrat">
           <div className="flex flex-col items-center justify-center gap-4 p-4 text-center text-white bg-gray-950 color-fondo-1">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <p>&copy; 2024 Game List Web - Daniel González González</p>
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
