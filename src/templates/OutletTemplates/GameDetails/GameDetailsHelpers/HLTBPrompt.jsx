import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Asegúrate de tener instalada la librería 'react-chartjs-2'
import { ArrowRight } from '../../../../assets/Icons';

export const HLTBPrompt = ({ juego, estado, horasDuracion, platino, graficaComparativaData, graficaHLTBData, crearChartOptions, mostrarHLTB, setMostrarHLTB }) => {
  return (
    <div className="px-6 pt-4 pb-12 mt-4 border border-gray-500 h-96 sm:h-80 rounded-xl">
        <div className="flex justify-between">
            <a className="flex items-center" href={juego.linkHowLongToBeat}>
                <h3 className="flex items-center justify-center gap-1 text-base font-bold lg:text-2xl text-start">
                    How Long To Beat <ArrowRight w={4} h={4} />
                </h3>
            </a>
            {  estado &&                                        
                <div className="flex justify-center gap-2 text-xs">
                    { horasDuracion !== null && platino && 
                        <button
                            onClick={() => setMostrarHLTB(true)}
                            className={`p-1 rounded-lg ${mostrarHLTB ? 'bg-gray-500 text-white border' : 'bg-gray-800 border border-transparent'}`}>Yo
                        </button>
                    }
                    <button onClick={() => setMostrarHLTB(false)}
                        className={`p-1 rounded-lg ${!mostrarHLTB ? 'bg-gray-500 text-white border' : 'bg-gray-800 border border-transparent'}`}>HTLB
                    </button>
                </div>
            }
        </div>

        {estado && mostrarHLTB && horasDuracion!==null && platino 
            ? 
            <Bar data={graficaComparativaData} options={crearChartOptions(platino)} />
                : 
            <Bar data={graficaHLTBData} options={crearChartOptions("Datos de otros usuarios")} />
        }
    </div>
  );
}

