import { Acceder } from "../../Acceder";
import ImagesHeadHomepage from "./ImagesHeadHomepage";

export const OfflineBanner = ({ juegosPortada, user }) => {
    return (
      <div className="absolute w-full text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        {!user.id && (
          <div className="relative">
            <div className="flex flex-col items-center justify-between gap-3 p-3 sm:px-5 2xl:px-10">
              <div className="flex flex-col items-center justify-center">
                <div className="flex justify-center w-full" style={{ position: 'relative' }}>
                  <img
                    className="max-w-[90%] sm:max-w-[20%] md:max-w-[30%] lg:max-w-[30%] h-auto object-contain"
                    src="/Logo-GameListWeb.png"
                    alt="Logo GameListWeb"
                  />
                </div>
                <div className="flex flex-col items-center w-full gap-5 px-5 pb-2 sm:p-2 2xl:gap-10 2xl:pb-5 2xl:pt-0">
                  <p className="text-xs text-center text-white lg:text-lg">
                    Crea y gestiona tu colección de videojuegos de manera fácil y personalizada.
                  </p>
                </div>
              </div>
  
              <ImagesHeadHomepage gamesBDByPlatform={juegosPortada} />
  
              <div className="w-5/6">
                <h2 className="relative z-20 flex gap-4 pt-4 text-sm font-semibold text-white sm:pt-0 lg:pt-8 sm:text-sm lg:text-lg">
                  Descubre nuestro catálogo
                </h2>
                <h3 className="relative z-20 flex gap-1 pt-2 text-xs text-white uppercase lg:pt-4 sm:pt-0 sm:text-xs lg:text-lg">
                  754 juegos
                </h3>
              </div>
            </div>
          </div>
        )}
  
        {/* Botón para acceder al login */}
        {!user.id && <Acceder />}
      </div>
    )
  }