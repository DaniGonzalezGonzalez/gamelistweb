import React from 'react';

export const InfoNotaCompleta = ({ estado, notaJuego, juego, GET_COLOR_CLASS }) => (
    <div className={`flex justify-center gap-10 mt-8 ${!estado && 'mb-8'} lg:mt-10 lg:absolute lg:top-[660px] lg:right-10`}>
        <div className="flex items-center justify-center gap-4 sm:gap-4">
            {estado && (
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className={`text-sm text-gray-100 flex justify-center items-center font-bold rounded-full p-5 w-6 h-6 text-end ${GET_COLOR_CLASS(notaJuego)}`}>
                        {notaJuego}
                    </p>
                    <p className="text-[10px] lg:text-xs">Nota personal</p>
                </div>
            )}
            <div className="flex flex-col items-center gap-2">
                <p className={`text-sm text-gray-100 flex justify-center items-center rounded-full font-bold p-5 w-6 h-6 text-end ${GET_COLOR_CLASS(juego?.notaMetacriticUsuarios)}`}>
                    {juego?.notaMetacriticUsuarios !== 0 ? juego?.notaMetacriticUsuarios : ''}
                </p>
                <p className="text-[10px] lg:text-xs">Nota usuarios</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <p className={`text-sm text-gray-100 flex justify-center items-center rounded-lg font-bold p-5 w-6 h-6 text-end ${GET_COLOR_CLASS(juego?.notaMetacriticPrensa)}`}>
                    {juego?.notaMetacriticPrensa !== 0 ? juego?.notaMetacriticPrensa : ''}
                </p>
                <p className="text-[10px] lg:text-xs">Nota prensa</p>
            </div>
        </div>
    </div>
)

