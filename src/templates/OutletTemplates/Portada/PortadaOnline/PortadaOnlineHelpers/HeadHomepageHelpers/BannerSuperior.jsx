export const BannerSuperior = ({juegosPortada, currentImageIndex, handleAddGameMenu }) => {
    return (
        <div className="relative w-full h-96 sm:h-40 lg:h-[400px] mt-0 sm:mt-5 lg:mt-20 overflow-hidden">
          {juegosPortada.map((juego, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="flex justify-center w-full h-full">
                <button onClick={handleAddGameMenu} className="relative w-full sm:w-4/5">
                  <img
                    className="object-cover w-full h-full sm:rounded-lg"
                    src={juego?.imageUrl ?? juego?.url[0]}
                    alt={`Imagen de juego ${index + 1}`}
                  />
                  <div className="absolute inset-0 z-10 flex items-center justify-center transition duration-300 border-2 border-black sm:rounded-lg border-opacity-40 hover:border-2 hover:border-gray-200 hover:opacity-80">
                    <div className="absolute inset-0 bg-black sm:rounded-md opacity-40"></div>
                    <h2 className="flex items-center justify-center h-full text-lg font-semibold text-center text-white uppercase sm:text-3xl">
                      {juego.name}
                    </h2>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between p-3 font-semibold text-center text-white">
                      <div className="font-thin text-white sm:w-80 text-[10px] lg:text-xs w-full flex items-start">
                        <p>Explora el catálogo</p>
                      </div>
                      <div className="flex justify-end w-full gap-2 font-thin text-white sm:w-80 text-[10px]">
                        <div className="font-semibold lg:text-xs">
                          <p>{juego.platform === 'Xbox 1' ? 'Xbox' : juego.platform}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
    )
}