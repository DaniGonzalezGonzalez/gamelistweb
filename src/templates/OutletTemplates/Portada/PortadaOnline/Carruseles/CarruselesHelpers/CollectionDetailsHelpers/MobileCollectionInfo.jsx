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
        return 'bg-green-700 rounded-lg px-1';
      case '9-8':
        return 'bg-green-600 rounded-lg px-1';
      case '8-7':
        return 'bg-green-500 rounded-lg px-1';
      case '7-6':
        return 'bg-orange-500 rounded-lg px-1';
      case '6-5':
        return 'bg-yellow-500 rounded-lg px-1';
      case '5-0':
        return 'bg-red-600 rounded-lg px-1';
      default:
        return 'bg-transparent rounded-none px-0';
    }
  };

  return (
    <div className='flex items-center justify-between gap-2 lg:flex-row sm:mt-10 lg:border-none lg:mx-0'>
      <div className='flex justify-center'>
        <img
          src={src}
          alt="Colección Icon"
          onError={handleError}
          className={`object-contain h-9 sm:h-12 ${getBackgroundClass(filterValue.replace(/\s+/g, '-').trim())}`}
        />
      </div>
      <div className='flex flex-col items-end justify-between w-full mb-1 font-normal'>
        <h1 className='text-[11px]'>
          Colección {filterValue === 's Creed' ? "Assassin's Creed" : filterValue}
        </h1>
        <p className='text-[9px]'>{filteredGames.length} juegos</p>
      </div>
    </div>
  )
}