import React from 'react';
import { Pie } from 'react-chartjs-2';
import { EditIcon } from '../../../../assets/Icons';

export const PorcentajeCompletado = ({ porcentajeCompletado, dataGraficaCircular, crearChartOptionsCircular, setEditModePorcentajeCompletado }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 transition-colors duration-200 rounded-lg shadow-lg cursor-pointer" onClick={() => setEditModePorcentajeCompletado(true)}>
      <p className="text-xs font-bold text-white lg:text-base">Porcentaje del juego:</p>
      {porcentajeCompletado > 0 && (
        <div className="h-36 lg:h-60">
          <Pie data={dataGraficaCircular} options={crearChartOptionsCircular(porcentajeCompletado)} />
        </div>
      )}
      {!porcentajeCompletado && (
        <div className="flex flex-col items-center gap-1 px-2 py-1 text-xs transition duration-300 border-2 border-gray-600 border-dashed hover:bg-green-800">
          <p>¿Qué porcentaje llevas?</p>
          <EditIcon w={4} h={4} />
        </div>
      )}
    </div>
  );
};

