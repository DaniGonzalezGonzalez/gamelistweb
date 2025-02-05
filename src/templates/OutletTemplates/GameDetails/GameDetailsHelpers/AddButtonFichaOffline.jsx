// BotonAgregar.js
import React from 'react';
import { PlusIcon } from '../../../../assets/Icons';
import { GET_STATE_BACKGROUND } from '../../../helpers/constants/constants';

export const AddButtonFichaOffline = ({ handleOpenPanel, isLoading, juego, estado, estados, estadoIconos }) => {
    return (
        <button 
            type="button"  
            onClick={handleOpenPanel} 
            disabled={isLoading || !juego?.titulo} 
            className="flex flex-col items-center justify-center gap-3 mt-6 text-[9px] lg:text-[11px] absolute bottom-2 right-2 lg:absolute lg:top-[500px] lg:right-10 text-white"
        >
            <div className={`${GET_STATE_BACKGROUND(estado)} px-1.5 py-1 lg:px-2 lg:py-1 lg:rounded-lg rounded-lg flex items-center hover:bg-green-700 transition duration-500`}>
                <p className="lg:mr-1.5 mr-1 flex items-center gap-1">
                    <PlusIcon w={4} h={4} /> Añadir
                </p>
                {estados.map(option => (
                    <div key={option}>{option === estado && estadoIconos[option]}</div>                                  
                ))}
            </div>
        </button>
    );
};

