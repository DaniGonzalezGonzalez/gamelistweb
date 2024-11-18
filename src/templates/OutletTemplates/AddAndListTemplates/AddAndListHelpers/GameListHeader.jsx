import React from 'react';

export const GameListHeader = ({ 
  dataBD = [], 
  selectedImage, 
  nombreColeccion, 
  GET_STATE_BACKGROUND, 
  estadoSingularMayusculas, 
  backgroundClass = '', // Nueva prop para la clase de fondo personalizada
  totalTiempoMainStory 
}) => {
  // Determinar la clase de fondo: usar `backgroundClass` si está disponible, o el resultado de `GET_STATE_BACKGROUND`
  const background = backgroundClass || GET_STATE_BACKGROUND?.(estadoSingularMayusculas) || '';

  return (
    <div 
      className={`flex flex-col justify-center w-full p-4 text-center ${background} pt-0 sm:pt-0 lg:pt-0`}
    >
      <div className="relative flex justify-center mb-10 lg:mb-5 lg:top-20 top-20">
        <div className="w-80 sm:w-96">
          <div className="relative w-80 sm:w-96">
            <img 
              className="object-cover w-full h-32 border-2 rounded-lg animate-border-animation sm:h-28 lg:h-60" 
              src={selectedImage} 
              alt="Cargando..." 
            />
            <div className="absolute inset-0 bg-black border-2 border-opacity-100 rounded-lg opacity-60"></div>
            <h2 className="absolute inset-0 flex items-center justify-center p-3 text-lg font-semibold text-center text-white uppercase sm:text-3xl">
              {nombreColeccion}
            </h2> 
            <div className="absolute inset-0 flex items-end justify-start p-3 font-semibold text-center text-white">
              <div className="flex justify-start w-full gap-2 font-thin text-white sm:w-80">
                <div className="flex items-center justify-center gap-1 pr-2 text-xs border-r">
                  <span className="font-bold">{dataBD.length}</span> 
                  <div className="uppercase">JUEGOS</div>
                </div>
                <div className="flex items-center justify-center gap-1 text-xs">
                  <span className="font-bold">{totalTiempoMainStory(dataBD)}</span> 
                  <div className="uppercase">Horas</div>
                </div>                        
              </div>
            </div>
          </div>
        </div>
      </div>          
    </div>
  );
};
