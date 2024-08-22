import React from 'react'

export default function ImagesHeadAddToGameList({gamesBDByPlatform}) {
  return (
    <div className="flex">
      {/* Imagen 1 - mostrando la mitad central */}
      <div className="w-1/4 h-32 overflow-hidden rounded-l-lg sm:h-60">
        <img 
          className="object-cover w-[200%] h-full object-center" 
          src={gamesBDByPlatform[Math.floor(Math.random() * gamesBDByPlatform.length)]?.url[0] ?? gamesBDByPlatform[Math.floor(Math.random() * gamesBDByPlatform.length)]?.imageUrl} 
          alt="No hay imagen" 
        />
      </div>

      {/* Imagen 2 - mostrando la mitad central */}
      <div className="w-1/4 h-32 overflow-hidden sm:h-60">
        <img 
          className="object-cover w-[200%] h-full object-center" 
          src={gamesBDByPlatform[Math.floor(Math.random() * gamesBDByPlatform.length)]?.url[0] ?? gamesBDByPlatform[Math.floor(Math.random() * gamesBDByPlatform.length)]?.imageUrl} 
          alt="No hay imagen" 
        />
      </div>

      {/* Imagen 3 - mostrando la mitad central */}
      <div className="w-1/4 h-32 overflow-hidden sm:h-60">
        <img 
          className="object-cover w-[200%] h-full object-center" 
          src={gamesBDByPlatform[Math.floor(Math.random() * gamesBDByPlatform.length)]?.url[0] ?? gamesBDByPlatform[Math.floor(Math.random() * gamesBDByPlatform.length)]?.imageUrl} 
          alt="No hay imagen" 
        />
      </div>

      {/* Imagen 4 - mostrando la mitad central */}
      <div className="w-1/4 h-32 overflow-hidden rounded-r-lg sm:h-60">
        <img 
          className="object-cover w-[200%] h-full object-center" 
          src={gamesBDByPlatform[Math.floor(Math.random() * gamesBDByPlatform.length)]?.url[0] ?? gamesBDByPlatform[Math.floor(Math.random() * gamesBDByPlatform.length)]?.imageUrl} 
          alt="No hay imagen" 
        />
      </div>
    </div>
  );
};