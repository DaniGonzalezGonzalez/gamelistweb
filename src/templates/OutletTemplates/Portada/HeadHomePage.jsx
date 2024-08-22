import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowDown } from "../../../assets/Icons/ArrowDown";
import { useUser } from "../../../hooks/useUser";
import { Acceder } from "./Acceder";

export function HeadHomePage() {
  const { user } = useUser()
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const localImages = useMemo(() => [ "/Imagen-portada-0.jpg", "/Imagen-portada-1.jpg", "/Imagen-portada-2.jpg" ], [])
  const texts = useMemo(() => [ "Descubre nuevas aventuras y gestiónalas en tu lista", "¿Probando algo nuevo? Añádelo a Jugando", "Puntúa tus juegos favoritos"], [])
  const handleScrollIndex = (idIndice) => {
    const editContentElement = document.getElementById(idIndice)
    if (editContentElement) {
      editContentElement.scrollIntoView({ behavior: "smooth" })
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % localImages.length);
    }, 10000); // Cambiar la imagen cada 10 segundos (10000 milisegundos)

    return () => clearInterval(interval);
  }, [localImages]);

  return (
    <div className="relative min-h-screen">
     {localImages.map((imageUrl, index) => (
        <div key={index}
          className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center center', opacity: index === currentImageIndex ? 1 : 0, transition: 'opacity 1s ease-in-out' }} />
      ))}

      {/* Capa de superposición negra semitransparente */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />

      {/* Capa de superposición negra semitransparente con difuminado */}
     { user.id && <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))', backgroundSize: 'cover', backgroundPosition: 'center center' }} />}

     { !user.id && <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1))', backgroundSize: 'cover', backgroundPosition: 'center center' }} />}

      {/* Contenedor para el contenido (logo y texto) */}
      <div className="absolute w-full text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        {/* Contenedor de texto */}
       { user.id && <div className="relative">
          <h1 className="m-10 text-4xl text-white font-montserrat" style={{ position: 'relative' }}>GAME <br/> LIST</h1>
        </div>}

        { !user.id && <div className="relative">
          <div className="flex flex-col items-center justify-between gap-3 p-3 mt-28 sm:mt-16 sm:p-5 2xl:p-10 sm:flex-row">
          <div className="flex flex-col items-center w-full gap-5 p-5 2xl:gap-10 2xl:p-10 sm:items-start">
            <h1 className="text-xl text-white lg:text-4xl font-montserrat">GAME LIST WEB</h1>
              <p className="text-xs text-justify text-white lg:text-lg xl:text-xl">GameListWeb te permite crear y gestionar tu colección de videojuegos de manera fácil y personalizada. Puedes calificar cada juego según tu experiencia y ver la duración promedio para completarlo, así como las valoraciones de otros usuarios. Todo esto te ayuda a descubrir nuevos juegos y gestionar tus experiencias de juego en un solo lugar.</p>
          </div>
          {/* <div className="h-full p-3 sm:p-0 2xl:flex 2xl:justify-center 2xl:w-5/6">
            <img className="rounded-lg" src="/Images-portada-sin-user.png" alt="Imagen de muestra de la web" />
          </div> */}
          <div className="w-2/5"><Acceder/></div>
          </div>
        </div>}

        {/* Texto asociado a la imagen actual */}
        {/* <div className="absolute bottom-[-14] left-0 w-full text-center p-4">
          <p className="text-lg text-white">{texts[currentImageIndex]}</p>
        </div> */}
      {/* Texto asociado a la imagen actual */}
     { user.id && <div className="absolute bottom-[-75%] sm:bottom-[-60%] left-0 w-full text-center p-4">
        {texts.map((text, index) => (
          <div key={index} className={`absolute bottom-0 left-0 w-full text-center transition-transform duration-1000 ease-in-out ${
              index === currentImageIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
            style={{ transform: index === currentImageIndex ? 'translateY(0)' : 'translateY(100%)', opacity: index === currentImageIndex ? 1 : 0, transition: 'transform 1s ease-in-out, opacity 1s ease-in-out', zIndex: 100 }}>
            <p className="p-6 text-sm text-white sm:text-base">{text}</p>
            <div className="flex items-center justify-center mt-2 text-white bounce-animation">
              <Link to onClick={() => handleScrollIndex('indice-infohomepage-jugando')}>
                <ArrowDown />
              </Link>
            </div>
          </div>
        ))}
      </div>}


        {/* { !user.id && <Acceder/>} */}

      </div>
    </div>
  );
}
