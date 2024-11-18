import React from 'react';
import { AbandonadoIcon, SearchIcon } from '../../../../assets/Icons'

export const SearchGamesBar = ({ 
    searchTerm, 
    platform, 
    tituloRef, 
    handleInputChange, 
    setSearchTerm, 
    isPlatformSearch = false // Nueva prop para determinar el tipo de búsqueda
}) => (
    <div className="flex items-center justify-start w-full mt-24 lg:w-5/6 sm:mt-6 lg:mt-16">
        <div className="relative w-full sm:w-52">
            {!searchTerm && (
                <div className="absolute inset-y-0 left-0 flex items-center gap-1 pl-2 text-xs text-gray-200 pointer-events-none">
                    <SearchIcon w={4} h={4} />
                    <span>Buscar por título</span>
                </div>
            )}

            <input
                ref={tituloRef}
                className="w-full p-3 pl-2 pr-10 text-xs text-white placeholder-transparent bg-gray-700 border-2 appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                type="text"
                name="titulo"
                id="titulo"
                placeholder="Buscar juego por título"
                value={isPlatformSearch ? searchTerm : `${searchTerm}${platform ? ' - ' + platform : ''}`} // Condicional para tipo de búsqueda
                onChange={handleInputChange}
            />
            {searchTerm && (
                <button
                    type="button"
                    className="absolute flex items-center px-1 py-3.5 text-white transition duration-500 -translate-y-1/2 bg-transparent rounded-xl inset-y-1/2 right-1 hover:bg-red-600"
                    onClick={() => setSearchTerm('')}
                >
                    <div className="flex items-center gap-2 text-xs">
                        <AbandonadoIcon />
                    </div>
                </button>
            )}
        </div>
    </div>
);
