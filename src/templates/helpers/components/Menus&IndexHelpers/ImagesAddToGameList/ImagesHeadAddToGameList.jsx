import React from 'react'
import { scrollToTop } from '../../../no-components/constants';

export default function ImagesHeadAddToGameList({ gamesBDByPlatform }) {
  // Limitar la cantidad de juegos a mostrar a un máximo de 4
  const displayedGames = gamesBDByPlatform.slice(0, 4);

  return (
    <button onClick={scrollToTop} className="flex w-full overflow-hidden transition duration-500 hover:opacity-75">
      {displayedGames.map((game, index) => (
        <div
          key={index}
          className={`flex-1 h-32 overflow-hidden ${index === 0 ? 'rounded-l-lg' : ''} ${index === displayedGames.length - 1 ? 'rounded-r-lg' : ''} lg:h-60`}
        >
          <img
            className="object-cover object-center w-full h-full"
            src={game?.url?.[0] ?? game?.imageUrl ?? 'URL_DE_IMAGEN_PREDIMINADA'}
            alt="No hay imagen"
          />
        </div>
      ))}
    </button>
  );
}