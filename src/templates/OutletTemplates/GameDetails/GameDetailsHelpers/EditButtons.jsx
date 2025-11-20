import React from 'react'
import { EditIcon, PlusIcon, UpdateIcon } from '../../../../assets/Icons'

export const EditButtons = ({ estado, handleOpenEditEstadoPanel, handleOpenEditNotaPanel, handleOpenRejugandoPanel }) => (
    <div className="flex items-center justify-center gap-5 py-4 mb-6 sm:py-6 lg:gap-3 lg:absolute lg:top-[740px] lg:right-10">
        <div>
            <button className={`px-2 sm:px-3 py-1 mt-2 text-[11px] sm:text-xs font-regular text-white transition duration-500 bg-gray-800 rounded-2xl sm:mt-8 hover:bg-blue-700 h-20 ${(estado === 'Jugando' || estado === 'Completando' ? 'w-20' : 'w-32')} sm:w-32 lg:w-36`} onClick={handleOpenEditEstadoPanel}>
                <div className="flex flex-col items-center justify-center p-1">
                    <EditIcon />
                    <p>Editar estado</p>
                </div>
            </button>
        </div>
        <div>
            <button className={`px-2 sm:px-3 py-1 mt-2 text-[11px] sm:text-xs font-regular text-white transition duration-500 bg-gray-800 rounded-2xl sm:mt-8 hover:bg-green-700 hover:opacity-100 h-20 ${(estado === 'Jugando' || estado === 'Completando' ? 'w-20' : 'w-32')} sm:w-32 lg:w-36`} onClick={handleOpenEditNotaPanel}>
                <div className="flex flex-col items-center justify-center p-1">
                    <PlusIcon />
                    <p>Editar nota</p>
                </div>
            </button>
        </div>
        {(estado === 'Jugando' || estado === 'Completando') && (
            <div>
                <button className="px-2 sm:px-3 py-1 mt-2 text-[11px] sm:text-xs font-regular text-white transition duration-500 bg-gray-800 rounded-2xl sm:mt-8 hover:bg-purple-700 w-20 sm:w-32 lg:w-36 h-20"  onClick={handleOpenRejugandoPanel}>
                    <div className="flex flex-col items-center justify-center p-1">
                        <UpdateIcon />
                        <p>Rejugando?</p>
                    </div>
                </button>
            </div>
        )}
    </div>
)

