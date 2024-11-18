import React from 'react';
import { SearchIcon } from '../../../../assets/Icons';

export const SearchGamesInList = ({ 
  searchTerm, 
  setSearchTerm, 
  placeholder = "Buscar", 
  width = "w-32 sm:w-52" 
}) => {
  return (
    <div className={`relative ${width}`}>
      {!searchTerm && (
        <div className="absolute inset-y-0 left-0 flex items-center gap-1 pl-4 text-xs text-gray-200 pointer-events-none top-3">
          <SearchIcon w={4} h={4} />
          <span>{placeholder}</span>
        </div>
      )}

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-1 py-2 pl-4 text-xs text-white placeholder-transparent bg-gray-700 border-2 appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        placeholder={placeholder}
      />
    </div>
  );
};
