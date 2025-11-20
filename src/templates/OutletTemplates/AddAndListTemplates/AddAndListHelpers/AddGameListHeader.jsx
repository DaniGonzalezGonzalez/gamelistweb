import React from 'react';

export const AddGameListHeader = ({ 
    selectedImage, 
    games, // Cambiado de gamesBDComplete a un nombre genérico
    totalTiempoMainStory, 
    tituloRef, 
    scrollToTop, 
    platform, // Propiedad opcional para plataforma
    getPlatformBackground // Función opcional para obtener el fondo basado en la plataforma
}) => (
    <div className={`flex flex-col justify-center w-full pt-0 text-center ${platform ? getPlatformBackground(platform) : 'bg-blue-950'}`}>
        <div className="relative flex justify-center mb-5 top-20 sm:top-16 lg:top-20">
            <div className="w-80 sm:w-96">
                <button onClick={() => { tituloRef.current.focus(); if (scrollToTop) scrollToTop(); }} className="relative w-80 sm:w-96">
                    {/* Usar la imagen seleccionada una sola vez */}
                    <img className="object-cover w-full h-32 rounded-lg sm:h-40 lg:h-60" src={selectedImage} alt="No hay imagen" />
                    <div className="absolute inset-0 bg-black rounded-lg opacity-60"></div>    
                    <div className={`absolute inset-0 flex items-end p-3 font-semibold text-center text-white ${platform ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex justify-start w-full gap-2 font-thin text-white sm:w-80">
                            <div className="flex items-center justify-center gap-1 pr-2 text-xs border-r">
                                <span className="font-bold">{games.length}</span>
                                <div className="font-medium uppercase">JUEGOS</div>
                            </div>
                            <div className="flex items-center justify-center gap-1 text-xs">
                                <span className="font-bold">{totalTiempoMainStory(games)}</span>
                                <div className="font-medium uppercase">Horas</div>
                            </div>                        
                        </div>
                        {/* Mostrar plataforma si se proporciona */}
                        {platform && (
                            <div className="text-xs sm:text-sm">
                                {platform === 'Xbox 1' ? 'Xbox' : platform}
                            </div>
                        )}
                    </div>
                </button>
            </div>
        </div>          
    </div>
);
