import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiperCarousel } from '../../Portada/PortadaOnline/Carruseles/CarruselesUseEffects/useSwiper';

export const ImagesRAWG = ({ gameFromRAWG }) => {
  const screenshots = gameFromRAWG[0]?.short_screenshots || [];
  useSwiperCarousel(screenshots); // Llamamos al hook para usar el swiper

  return (
    <div className="p-4 mt-4 border border-gray-500 lg:p-6 lg:mt-10 rounded-xl">
      <div className="image-gallery">
        <h2 className="mb-4 text-base font-bold lg:text-2xl text-start">Galería de Imágenes</h2>
        <Swiper
          spaceBetween={.01} // Espacio entre las imágenes
          slidesPerView={1.2} // Mostrar la imagen centrada y un poco de las adyacentes
          centeredSlides={true} // Asegura que la imagen central esté centrada
          loop={true} // Carrusel infinito
          pagination={{ clickable: true }} // Paginación
          autoplay={{ delay: 3000 }} // Deslizar automáticamente
          effect="slide" // Efecto de transición
          breakpoints={{
            640: {
              slidesPerView: 2, // Muestra 2 imágenes en pantallas pequeñas
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2.5, // Muestra más imágenes en pantallas medianas
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2.3, // Muestra 3 imágenes en pantallas grandes
              spaceBetween: 1,
            },
          }}
        >
          {screenshots.map((screenshot, index) => (
            <SwiperSlide key={index}>
              <div className="relative p-2 sm:p-3 image-item">
                <img
                  src={screenshot.image}
                  alt={`Screenshot ${index + 1}`}
                  className="object-cover w-full shadow-lg h-60 sm:h-72 lg:h-80 rounded-3xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};