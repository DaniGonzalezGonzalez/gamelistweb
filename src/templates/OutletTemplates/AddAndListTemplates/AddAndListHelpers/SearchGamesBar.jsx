import React from 'react';
import { Link } from 'react-router-dom';
import { AbandonadoIcon, SearchIcon } from '../../../../assets/Icons'

export const SearchGamesBar = ({ 
    searchTerm, 
    platform, 
    tituloRef, 
    handleInputChange, 
    setSearchTerm, 
    isPlatformSearch = false // Nueva prop para determinar el tipo de búsqueda
}) => (
    <div className="flex flex-col items-center justify-between w-full gap-4 mt-24 sm:gap-0 sm:flex-row lg:w-5/6 sm:mt-6 lg:mt-16">
        <div className="relative w-full sm:w-52">
            {!searchTerm && (
                <div className="absolute inset-y-0 left-0 flex items-center gap-1 pl-2 text-xs text-gray-200 pointer-events-none">
                    <SearchIcon w={4} h={4} />
                    <span>Buscar por título</span>
                </div>
            )}

            <input
                ref={tituloRef}
                className="w-full p-3 pl-[26px] pr-10 text-xs text-white placeholder-transparent bg-gray-700 border-2 appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
        <button className='p-2 text-xs text-white transition duration-500 bg-red-900 rounded-xl hover:bg-red-700'>
            <Link to={'/add-random-game-to-list'}>¿No te decides? ¡Escoge uno al azar! 🎲</Link>
        </button>
    </div>
);
