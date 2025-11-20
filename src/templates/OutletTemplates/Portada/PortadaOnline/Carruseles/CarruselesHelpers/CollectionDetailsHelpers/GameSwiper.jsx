// /* eslint-disable react/prop-types */
// import React from 'react';
// import { ButtonAddOrAdded } from '../../../../../AddAndListTemplates/Utils';

// export const GameSwiper = ({
//     filteredGames,
//     obtenerJuegosCoincidentes,
//     dataBD,
//     getPlataformas,
//     setChooseGameFicha,
//     setShowChooseGameFicha,
//     handleTitleClick,
//     handleInfoGameBD,
//     onGameClick,
//     cleanTitle,
//   }) => {
//     return (
//       <div className="flex flex-col w-full lg:flex-row lg:justify-start">
//         {/* Swiper carrusel */}
//         <div className="max-w-full h-full pt-2 pb-0 sm:px-0 overflow-hidden swiper-container lg:pb-8 lg:pt-0 lg:mr-[35%] swiper-initialized swiper-horizontal swiper-backface-hidden lg:pl-8 sm:pb-10">
//           <div className="swiper-wrapper">
//             {filteredGames
//             .slice()
//             .sort((a, b) => a.titulo.localeCompare(b.titulo))
//             .map((game) => {
//               const juegosCoincidentes = obtenerJuegosCoincidentes(game, dataBD);
//               const plataformas = getPlataformas(juegosCoincidentes);
//               const estaAñadido = juegosCoincidentes.length > 0;
  
//               return (
//                 <div className="swiper-slide" key={game.titulo}>
//                   <div className="flex flex-col items-start justify-center gap-1 mb-2 duration-500 sm:flex opacity-95 hover:opacity-100">
//                     <div className="relative flex items-center justify-center w-full gap-3 border-2 border-transparent sm:flex hover:rounded-lg hover:border-2 hover:border-gradient">
//                       <button
//                         type="button"
//                         className="w-full"
//                         onClick={() => {
//                           if (juegosCoincidentes.length > 1) {
//                             setChooseGameFicha(juegosCoincidentes);
//                             setShowChooseGameFicha(true);
//                           } else if (juegosCoincidentes.length === 1) {
//                             handleTitleClick(juegosCoincidentes[0].id);
//                           } else {
//                             handleInfoGameBD(game.id);
//                           }
//                         }}
//                       >
//                         <img
//                           className="object-cover w-full h-56 rounded-lg sm:h-32 lg:h-28"
//                           src={game?.imageUrl ?? game?.url[0]}
//                           alt="No hay imagen"
//                           loading='lazy'
//                         />
//                       </button>
//                       <ButtonAddOrAdded
//                         handleGameClick={onGameClick}
//                         game={game}
//                         dataBD={dataBD}
//                         juegosCoincidentes={juegosCoincidentes}
//                         plataformas={plataformas}
//                         estaAñadido={estaAñadido}
//                       />
//                     </div>
//                     <p className="pt-3 pl-1 text-xs lg:text-xs text-start">{cleanTitle(game?.titulo)}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     );
//   };


/* eslint-disable react/prop-types */
import React from 'react';
import { ButtonAddOrAdded } from '../../../../../AddAndListTemplates/Utils';

export const GameSwiper = ({
  filteredGames,
  obtenerJuegosCoincidentes,
  dataBD,
  getPlataformas,
  setChooseGameFicha,
  setShowChooseGameFicha,
  handleTitleClick,
  handleInfoGameBD,
  onGameClick,
  cleanTitle,
}) => {

  return (
    <div className="w-full pt-2 pb-0 pl-4 pr-2 lg:pt-4 sm:px-12">
      <div className='pt-10'>
        <ul className="grid w-full grid-cols-2 gap-4 pt-4 mb-6 text-xs text-white lg:mt-2 sm:mb-10 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3">
          {filteredGames
            .slice()
            .sort((a, b) => a.titulo.localeCompare(b.titulo))
            .map((game) => {
              const juegosCoincidentes = obtenerJuegosCoincidentes(game, dataBD);
              const plataformas = getPlataformas(juegosCoincidentes);
              const estaAñadido = juegosCoincidentes.length > 0;

              return (
                <li key={game.titulo}>
                  <div className="flex flex-col items-start justify-center gap-1 mb-2 duration-500 xl:px-2 sm:flex opacity-95 hover:opacity-100">
                    <div className="relative flex items-center justify-center gap-3 border-2 border-transparent rounded-lg shadow-md sm:flex hover:rounded-lg hover:border-2 hover:border-gradient">
                      <button
                        type="button"
                        onClick={() => {
                          if (juegosCoincidentes.length > 1) {
                            setChooseGameFicha(juegosCoincidentes);
                            setShowChooseGameFicha(true);
                          } else if (juegosCoincidentes.length === 1) {
                            handleTitleClick(juegosCoincidentes[0].id);
                          } else {
                            handleInfoGameBD(game.id);
                          }
                        }}
                      >
                        <img
                          className="object-cover w-full rounded-lg h-36 lg:h-60"
                          src={game?.url[0] ?? game?.imageUrl}
                          alt="No hay imagen"
                        />
                      </button>
                      <ButtonAddOrAdded
                        handleGameClick={onGameClick}
                        game={game}
                        dataBD={dataBD}
                        juegosCoincidentes={juegosCoincidentes}
                        plataformas={plataformas}
                        estaAñadido={estaAñadido}
                      />
                    </div>
                    <p className="pt-3 text-start">{cleanTitle(game?.titulo)}</p>
                    {/* <p className="pt-2 font-bold text-start">{game.descripcion}</p> */}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};