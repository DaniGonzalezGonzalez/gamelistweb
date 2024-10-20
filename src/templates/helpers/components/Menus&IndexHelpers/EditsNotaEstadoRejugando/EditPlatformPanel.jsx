/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from '../../../../../assets/Icons';

export function EditPlatformPanel({ onClose, onPlatformChange, onAvanzar, textoBoton, onOmitir, platformActual, onAdded }) {
  const panelRef = useRef(null);
  const [platform, setPlatform] = useState(platformActual || '');
  const [platformsList, setPlatformsList] = useState([]);

  useEffect(() => {
    if (platform) {
      // Solo dividir si platform no es una cadena vacía
      setPlatformsList(platform.split(' - '));
    } else {
      setPlatformsList([]);
    }
  }, [platform]);

  const handleCerrarPanel = () => {
    if (platform) {
      onPlatformChange(platform);
    }
    onAvanzar();
  };

 const handleOmitirPanel = () => {
 onClose()
};

const handlePlatformClick = (value) => {
  setPlatform(value);
  // Aquí llamamos a la función para cerrar el panel y avanzar al mismo tiempo
  onPlatformChange(value);
  onAvanzar();
};

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
    <div
      ref={panelRef}
      className="flex flex-col items-center w-5/6 px-3 pt-5 pb-10 text-gray-100 border-2 border-gray-100 shadow-lg sm:w-4/6 lg:px-3 lg:pt-5 lg:pb-20 lg:w-1/2 rounded-2xl bg-slate-950" onClick={(e) => e.stopPropagation()}
    >
       <div className="flex flex-col items-center justify-center w-full mb-4">
        <div className='flex justify-start w-full'>
          <button
            onClick={handleOmitirPanel}
            className="text-sm text-white rounded-xl hover:scale-105"
          >
            <ArrowLeft />
          </button>
        </div>
        <p className='py-2 text-sm sm:py-0 lg:py-8 lg:text-lg'>Selecciona una plataforma</p>
      </div>
      <div className={`flex justify-center gap-2
      ${(platformsList.length > 2) && "grid justify-center gap-2 grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4"}
      ${platformsList.length > 6 && "grid justify-center gap-2 grid-cols-2 sm:grid-cols-5 lg:grid-cols-3"}

      `}>
        {platformsList.map((option) => {
          const formattedOption = option === "Xbox Series X-S" ? "Xbox-Series-X-S" : option.replace(/\s+/g, '-');
          const imageSrc = `/platformImages/${formattedOption}-Logo.webp`;

          return (
            <button
              key={option}
              onClick={() => handlePlatformClick(option)}
              className={`flex flex-col items-center p-3 hover:bg-gray-500 transition duration-300 rounded-2xl text-white border-2 w-28 sm:w-16 lg:w-40 bg-gray-300`}
            >
              <img
                className="object-contain w-16 h-10"
                src={imageSrc}
                alt={`Logo de ${option}`}
                title={`Plataforma: ${option}`}
              />
              {/* <span>{option}</span> */}
            </button>
          );
        })}
      </div>
      {/* <div className='flex flex-col justify-center w-full gap-8 p-2 mt-5 text-xs sm:flex-row sm:gap-0 sm:text-sm lg:mt-10'>
        <div className='flex flex-col items-center justify-center w-full gap-3'>
          <button className='p-2 px-5 transition duration-500 bg-purple-700 border-2 border-purple-500 rounded-xl hover:bg-purple-600' onClick={handleCerrarPanel}>{textoBoton}</button>
          {onOmitir && <button onClick={handleOmitirPanel}><span className='p-1 px-2 text-xs transition duration-500 rounded-xl hover:bg-gray-500'>Omitir</span></button>}
        </div>
      </div> */}
    </div>
  </div>
);
}