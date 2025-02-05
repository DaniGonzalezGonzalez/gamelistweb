// Plataformas.js
import React from 'react';

export const PlatformsGamesBD = ({ juego, cleanedPlatform }) => {
    return (
        <div className={`flex flex-wrap ${juego.plataforma.split(' - ').length > 6 ? 'flex-row' : 'flex'} items-center justify-center gap-3 mt-4 lg:absolute lg:z-10 flex lg:gap-3 lg:top-[690px] lg:left-[40px]`}>
            <p className='text-xs lg:block hidden'>Plataforma/s: </p>
            {/* Separar las plataformas por " - " */}
            {juego.plataforma.split(' - ').map((plataforma) => {
                // Formatear el nombre de la plataforma para el nombre de la imagen
                const formattedPlatform = plataforma.replace(/\s+/g, '-').trim();
                // Comprobar si cleanedPlatform es 'null' o si coincide con la plataforma
                if (cleanedPlatform === 'null' || formattedPlatform === cleanedPlatform.replace(/\s+/g, '-').trim()) {
                    return (
                        <img
                              key={formattedPlatform} // Usar una key única
                              src={`/platformImages/${formattedPlatform}-Logo.webp`}
                              alt={plataforma}
                              className={`object-contain w-8 h-8 p-1 bg-gray-300 rounded-lg sm:w-8 sm:h-8`}
                        />                    
                    )
                }
                
                return null // No mostrar nada si no coincide
            })}
        </div>
    );
};

