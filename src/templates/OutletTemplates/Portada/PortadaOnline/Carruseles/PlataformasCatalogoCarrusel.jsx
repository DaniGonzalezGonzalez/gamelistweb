import React, { useState } from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { platforms } from '../../../../helpers/constants/constants'
import { platformData } from '../../../../helpers/Utils/platformsDataToMenuFlotante'


export const PlataformasCatalogoCarrusel = () => {
  const [dragging, setDragging] = useState(false); // Estado para controlar el arrastre

  const desiredOrder = platforms
  // Extraer y ordenar las plataformas
  const platformsToShow = desiredOrder.reduce((result, name) => {
    for (const category in platformData) {
      const platform = platformData[category].find(p => p.name === name);
      if (platform) {
        result.push(platform);
        break; // Sale del bucle una vez encontrada la plataforma
      }
    }
    return result;
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1200,
    slidesToShow: 4.1,
    slidesToScroll: 4,
    arrows: false,
    appendDots: (dots) => (
      <div className="flex justify-center mt-4">
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 transition duration-300 bg-gray-500 rounded-full cursor-pointer hover:bg-gray-400" />
    ),
    centerPadding: '5px',
    centerMode: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 300,
          centerPadding: '40px',
          centerMode: true,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.10,
          slidesToScroll: 2,
          speed: 600,
          centerPadding: '0px',
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3.15,
          slidesToScroll: 3,
          speed: 800,
          centerPadding: '3px',
          centerMode: false,
        }
      }
    ],
    beforeChange: () => setDragging(true), // Detectar cuando comienza el arrastre
    afterChange: () => setDragging(false)  // Detectar cuando termina el arrastre
  };

  const handleClick = (route) => {
    if (!dragging) {
      window.location.href = route; // Redirige solo si no se estaba arrastrando
    }
  };

  return (
    <div className="max-w-full overflow-hidden p0-6 lg:pb-8 lg:pt-0">
      <Slider {...settings}>
      <Link to='/add-game-to-list' className="relative p-4 ml-0 sm:ml-4 md:ml-7 lg:ml-8 group">
          <div className="relative text-center text-white bg-slate-950 rounded-lg h-[350px] sm:h-90 lg:h-[600px] overflow-hidden">
            <img
              className="object-cover w-full h-full transition duration-500 ease-in-out border-2 border-transparent rounded-lg group-hover:border-gray-200"
              src={`/platformFondos/Catalogo-fondo.webp`}
              alt="Catálogo completo"
              title="Ver catálogo completo"
            />
            {/* Texto encima de la imagen */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="px-4 py-2 text-lg font-bold transition duration-500 ease-in-out bg-black bg-opacity-50 rounded-md lg:text-xl group-hover:bg-opacity-70">
                Catálogo<br/> completo
              </p>
            </div>
          </div>
        </Link>
        {platformsToShow.map((platform, index) => (
          <button
            type='button'
            key={`${platform.name}-${index}`}
            className="p-4 ml-0 sm:ml-4 md:ml-7 lg:ml-8"
            onClick={() => handleClick(platform.route)}
            onMouseDown={() => setDragging(false)}
          >
            <div className="text-center text-white bg-slate-950 rounded-lg h-[350px] sm:h-90 lg:h-[600px]">
              <img
                className="object-cover w-full h-full transition duration-500 ease-in-out border-2 border-transparent rounded-lg hover:rounded-lg hover:border-gray-200"
                // Rutas personalizadas de las imágenes basadas en el nombre de la plataforma
                src={`/platformFondos/${platform.name.replace(/\s+/g, '-').trim()}-fondo.webp`}
                alt={`Fondo de ${platform.name}`}
                title={`Plataforma: ${platform.name}`}
              />
            </div>
          </button>
        ))}
      </Slider>
    </div>
  )
}