import React from 'react'

export const DesktopCollectionInfo = ({ isMobile, filterValue, filteredGames }) => {
  if (isMobile) return null; // No renderizar nada si es móvil

  return (
    <div className='flex flex-col items-end justify-center pr-3 text-gray-100'>
      <h1 className='text-sm xl:text-base'>
        Colección {filterValue === 's Creed' ? "Assassin's Creed" : filterValue}
      </h1>
      <p className="pt-1 pl-1 text-[10px] xl:text-xs">{filteredGames.length} juegos</p>
    </div>
  )
}
