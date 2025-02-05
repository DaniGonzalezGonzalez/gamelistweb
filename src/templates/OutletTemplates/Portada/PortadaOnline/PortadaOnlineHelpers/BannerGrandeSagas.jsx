import React from 'react';
import { Link } from 'react-router-dom';

export const BannerGrandeSagas = () => {
  return (
    <div className="relative w-full text-white bg-green-700 mt-14 sm:mt-10 lg:mt-14">
      {/* Imagen de fondo */}
      <img
        className="object-cover w-full h-64 sm:h-80 lg:h-96 xl:h-[70vh] object-right transition duration-500 ease-in-out"
        src={`/wallpaperImages/Zelda-wallpaper.webp`}
        alt="Fondo colección Zelda"
        title="Ver colección Zelda"
      />

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Contenido encima de la imagen */}
      <div className="absolute left-0 flex flex-col items-end justify-end w-full h-full p-4 top-4 lg:bottom-10 lg:pr-12 lg:pb-14 sm:p-8">
        <div className="flex flex-col items-end justify-end gap-1 sm:gap-2 xl:gap-5">
          <p className="text-[9px] text-end lg:text-sm sm:text-xs w-full pr-2 sm:pr-1 xl:pr-4 xl:w-full">
            Descubre una de las sagas más aclamadas <span className={`hidden sm:inline-block`}>de la historia</span>
          </p>
          <Link
            to="/collections/titulo/Zelda"
            className="px-2 py-1 mb-3 mr-2 text-[9px] text-center transition duration-300 bg-green-900 rounded lg:py-2 sm:mr-1 sm:mb-1 sm:text-xs xl:text-sm hover:bg-green-800 lg:mb-0 xl:mr-4"
          >
            Ver colección
          </Link>
        </div>
      </div>
    </div>
  );
};

