import React from 'react';

export const MobileCollectionInfo = ({ 
  isMobile, 
  src, 
  handleError, 
  filterValue, 
  filteredGames 
}) => {
  if (!isMobile) return null; // No renderizar nada si no es móvil

  const getBackgroundClass = (value) => {
    switch (value) {
      case '10-9':
        return 'bg-green-700 rounded-2xl p-6';
      case '9-8':
        return 'bg-green-600 rounded-2xl px-6';
      case '8-7':
        return 'bg-green-500 rounded-2xl px-6';
      case '7-6':
        return 'bg-orange-500 rounded-2xl px-6';
      case '6-5':
        return 'bg-yellow-500 rounded-2xl px-6';
      case '5-0':
        return 'bg-red-600 rounded-2xl px-6';
      default:
        return 'bg-transparent rounded-none px-0';
    }
  };

  return (
    <div className='flex flex-col items-center justify-start px-5 mx-3 mt-10 mb-6 bg-gray-800 border-2 rounded-lg border-gray-203 lg:gap-3 lg:flex-row sm:mt-10 lg:border-none lg:mx-0'>
      <div className='flex justify-center my-2'>
        <img
          src={src}
          alt="Colección Icon"
          onError={handleError}
          className={`object-contain h-24 sm:h-24 ${getBackgroundClass(filterValue.replace(/\s+/g, '-').trim())}`}
        />
      </div>
      <div className='flex items-start justify-between w-full mb-1 lg:flex-col'>
        <h1 className="text-sm lg:text-lg lg:font-bold">
          Colección {filterValue === 's Creed' ? "Assassin's Creed" : filterValue}
        </h1>
        <p className="pt-1 pl-1 text-xs lg:text-sm">{filteredGames.length} juegos</p>
      </div>
    </div>
  )
}