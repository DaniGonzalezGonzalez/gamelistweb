import React, { useEffect } from 'react';
import { CheckIcon, PlusIcon } from '../../../../assets/Icons';

export function ButtonAddOrAdded({ handleGameClick, game, juegosCoincidentes, plataformas, estaAñadido, onPortada = false, textSize = 'text-xs'  }) {
  return (
    <>
      {/* Botón Añadir/Añadido */}
      <button 
        type="button" 
        className={`absolute flex items-center justify-center gap-1 p-0.5 pr-1 ${estaAñadido ? 'bg-green-600' : 'bg-gray-600'} rounded-lg shadow lg:left-2 left-1 bottom-2 shadow-black hover:bg-green-500`} 
        onClick={(e) => {
          e.stopPropagation();
          handleGameClick(game);
        }}
      >
        {estaAñadido ? (
          <>
            <CheckIcon w={4} h={4} />
            <span className={textSize}>Añadido</span>
          </>
        ) : (
          <>
            <PlusIcon w={4} h={4} />
            <span className={textSize}>Añadir</span>
          </>
        )}
      </button>

      {/* Indicador de plataformas */}
      {estaAñadido && plataformas.length > 0 && (
        <div className="absolute flex items-center right-2 bottom-2">
          <div className={`relative z-30 bg-green-600 rounded-full top-3 left-2 ${plataformas.length > 1 && 'left-7'}`}>
            <CheckIcon w={4} h={4} />
          </div>
          
          {/* Mostrar contador si hay más plataformas */}
          {plataformas.length > 1 && (
            <span className="relative flex items-center justify-center w-5 h-5 text-xs font-bold text-gray-800 bg-gray-200 rounded-full shadow left-[38px] bottom-[20px] shadow-black">
              +{plataformas.length - 1}
            </span>
          )}

          {/* Mostrar el primer logo de plataforma */}
          <img 
            src={`/platformImages/${plataformas[0].replace(/\s+/g, '-').trim()}-Logo.webp`} 
            alt={plataformas[0]} 
            className="object-contain w-8 h-8 p-1 bg-gray-200 rounded-lg shadow shadow-black"
          />
        </div>
      )}
    </>
  )
}
