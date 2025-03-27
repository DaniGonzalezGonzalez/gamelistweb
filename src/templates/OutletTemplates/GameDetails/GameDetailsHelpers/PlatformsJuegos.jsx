import React from 'react';

export const PlatformsJuegos = ({ plataforma, handleOpenEditPlatformPanel }) => {
  const platformImage = `/platformImages/${plataforma.replace(/\s+/g, '-').trim()}-Logo.webp`;

  return (
    <div
      className="lg:absolute lg:z-10 flex lg:gap-3 items-center justify-center mt-2 cursor-pointer lg:top-[690px] lg:left-[40px]"
      onClick={() => handleOpenEditPlatformPanel(plataforma)}
    >
      {/* <p className='hidden text-xs lg:block'>Plataforma: </p> */}
      <img
        src={platformImage}
        alt={plataforma}
        className="object-contain w-8 h-8 p-1 transition duration-300 bg-gray-300 rounded-lg hover:bg-gray-500 sm:w-8 sm:h-8"
      />
    </div>
  )
}

