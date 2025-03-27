/* eslint-disable react/prop-types */
import React from 'react';
import { ButtonAddOrAdded } from '../../../../AddAndListTemplates/Utils';

export const GameCard = ({
  juego,
  juegosCoincidentes,
  setChooseGameFicha,
  setShowChooseGameFicha,
  handleTitleClick,
  handleInfoGameBD,
  onGameClick,
  dataBD,
  plataformas,
  estaAñadido
}) => {
  return (
    <div className="relative w-full h-40 lg:h-40">
      <button className='w-full'
        type="button"
        onClick={() => {
          if (juegosCoincidentes.length > 1) {
            setChooseGameFicha(juegosCoincidentes);
            setShowChooseGameFicha(true);
          } else if (juegosCoincidentes.length === 1) {
            handleTitleClick(juegosCoincidentes[0].id);
          } else {
            handleInfoGameBD(juego.id);
          }
        }}
      >
        <img
          className="object-cover w-full h-40 transition duration-500 ease-in-out border-2 border-transparent rounded-lg lg:h-40 hover:rounded-lg hover:border-gray-200 hover:scale-102"
          src={juego.url[0]}
          alt={`Fondo de ${juego.titulo}`}
          title={`Juego: ${juego.titulo}`}
        />
      </button>

      <div>
        <ButtonAddOrAdded
          handleGameClick={() => onGameClick(juego)}
          game={juego}
          dataBD={dataBD}
          juegosCoincidentes={juegosCoincidentes}
          plataformas={plataformas}
          estaAñadido={estaAñadido}
          onPortada={true}
        />
      </div>
    </div>
  );
};

