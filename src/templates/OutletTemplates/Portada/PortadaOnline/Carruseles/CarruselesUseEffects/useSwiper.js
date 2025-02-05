import { useEffect, useState } from 'react';
import Swiper from 'swiper'; // Asegúrate de tener Swiper instalado

export const useSwiperCarousel = (juegosFiltrados) => {
  useEffect(() => {
    if (juegosFiltrados.length > 0) {
      new Swiper('.swiper-container', {
        spaceBetween: 10,
        slidesPerView: 4,
        centeredSlides: true,
        grabCursor: true,
        loop: true,
        speed: 1000,
        freeMode: true,
        freeModeMomentumRatio: 0.5,
        freeModeSticky: true,
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2.8,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2.9,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2.9,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 25,
          },
        },
      });
    }
  }, [juegosFiltrados]);
};


export const useSwiperCollectionCarousel = (juegosFiltrados) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Define el límite de tamaño para pantallas pequeñas
  const [initialSlide, setInitialSlide] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Actualiza el estado cuando se cambia el tamaño de la pantalla
    };

    window.addEventListener('resize', handleResize); // Escucha los cambios en el tamaño de la ventana

    // Cleanup listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (juegosFiltrados.length > 0) {
      new Swiper('.swiper-container', {
        spaceBetween: 10,
        slidesPerView: 4,
        centeredSlides: isMobile,
        grabCursor: true,
        loop: isMobile,
        speed: 1000,
        freeMode: true,
        freeModeMomentumRatio: 0.5,
        freeModeSticky: true,
        initialSlide: isMobile ? 0 : initialSlide,
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4.5,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4.5,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4.1,
            spaceBetween: 20,
          },
          1580: {
            slidesPerView: 8,
            spaceBetween: 10,
            // slidesOffsetBefore: -200, // Ajusta este valor para cortar a la izquierda
            // slidesOffsetAfter: 0, // Por defecto 0, ajusta si necesitas compensar el lado derecho
          },
        },
      });
      setInitialSlide(null)
    }
  }, [juegosFiltrados]);
};
