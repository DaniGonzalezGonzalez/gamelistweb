import React from 'react'
import { Link } from 'react-router-dom'

export default function ImagesHeadHomepage({ gamesBDByPlatform }) {
  // Limitar la cantidad de juegos a mostrar a un máximo de 4
  const displayedGames = gamesBDByPlatform.slice(0, 4)

  return (
    <div className='w-5/6 mx-auto'>
      <Link to='/login' className="flex w-full overflow-hidden transition duration-500 hover:opacity-75">
        {displayedGames.map((game, index) => (
          <div
            key={index}
            className={`flex-1 h-60 overflow-hidden ${index === 0 ? 'rounded-l-lg' : ''} ${index === displayedGames.length - 1 ? 'rounded-r-lg' : ''} sm:h-28 lg:h-96`}
          >
            <img
              className="object-cover object-center w-full h-full"
              src={game?.url?.[0] ?? game?.imageUrl ?? 'URL_DE_IMAGEN_PREDIMINADA'}
              alt="No hay imagen"
            />
          </div>
        ))}
      </Link>
    </div>
  )
}