import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ItemCard = ({ item, filterType }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navega a la URL con el tipo de filtro y el valor del ítem
    navigate(`/collections/${filterType}/${item.name}`);
  };

  const [src, setSrc] = useState(`/collectionIcons/${item.name.replace(/\s+/g, '-').trim()}-icon.webp`);

  const handleError = () => {
    // Si falla la carga de WebP, intenta con SVG
    setSrc(`/collectionIcons/${item.name.replace(/\s+/g, '-').trim()}-icon.svg`);
  };

  return (
    <div className="relative w-full h-full lg:h-40">
      <button
        className="w-full"
        type="button"
        onClick={handleCardClick}
      >
        <img
          className={`object-contain w-full h-40 px-7 py-7 sm:px-8 md:px-14 lg:px-16 2xl:px-24 transition duration-500 ease-in-out border-2 border-transparent rounded-lg lg:h-40 hover:rounded-lg hover:border-gray-200 hover:scale-102 ${item.bgColor}`}
          src={src}
          alt={item.name}
          title={item.name}
          onError={handleError}
        />
      </button>
      <div className="text-start">
        <h3 className='text-white'>   
        {item.name === 's Creed' ? 'Assassin`s Creed' :
         item.name === '10-9' ? '9.0+' :
         item.name === '9-8' ? '8.0+' : 
         item.name === '8-7' ? '7.0+' : 
         item.name === '7-6' ? '6.0+' : 
         item.name === '6-5' ? '5.0+' : 
         item.name === '5-0' ? '5.0-' : 
         item.name}
        </h3>
      </div>
    </div>
  );
};
