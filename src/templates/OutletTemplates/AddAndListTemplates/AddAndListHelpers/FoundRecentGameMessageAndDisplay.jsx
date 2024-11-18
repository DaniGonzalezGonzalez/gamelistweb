import React from 'react';
import { HomePageSkeleton } from '../../../helpers/Utils/Skeletons/HomePageSkeleton';
import { FoundGames, RecentGames } from '../Utils';

export const FoundRecentGameMessageAndDisplay = ({
  showMessage,
  error,
  success,
  isLoading,
  debouncedSearchTerm,
  filteredGames,
  recentGames,
  handleGameSelect,
  handleOpenEditPlatformPanel,
  setEditEstadoPanelOpen, // Nueva prop opcional para los casos con plataforma
  byPlatform = 'NO', // Prop opcional para indicar si es por plataforma o no
}) => {
  return (
    <div className="flex flex-col justify-center w-full">
      {/* Mensaje de éxito o error */}
      {showMessage && (
        <>
          {error && (
            <p className="font-bold text-red-400 font-montserrat">
              {error === 'duplicate key value violates unique constraint "Juegos_pkey"'
                ? 'Error al añadir juego. Se actualizará automáticamente la página. Inténtalo tras la recarga'
                : error}
            </p>
          )}
          {success && (
            <div className="p-6 mt-6 text-xs font-bold text-center text-gray-100 bg-green-900 border-2 border-gray-100 rounded-lg shadow-lg lg:px-10 lg:pt-10 lg:pb-3 lg:text-sm sm:mt-14 w-60">
              {success}
            </div>
          )}
        </>
      )}

      {/* Cargando... */}
      {isLoading && <HomePageSkeleton />}

      {/* Mostrar mensaje cuando no se encuentren juegos filtrados */}
      {debouncedSearchTerm.trim() !== "" && filteredGames.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full pt-5">
          <img src="/Imagen-no-encontrado.webp" alt="No se encontraron juegos" className="w-20 h-20 mb-4" />
          <p className="mt-4 text-xs text-white sm:text-sm lg:text-lg">¡No se encontraron juegos!</p>
        </div>
      )}

      {/* Juegos Recientes */}
      {debouncedSearchTerm.trim() === "" && recentGames.length > 0 && (
        <RecentGames
          recentGames={recentGames}
          handleGameSelect={handleGameSelect}
          onAvanzar={handleOpenEditPlatformPanel}
          byPlatform={byPlatform} // Pasar la prop opcional
          setEditEstadoPanelOpen={setEditEstadoPanelOpen}
        />
      )}

      {/* Juegos Encontrados */}
      {debouncedSearchTerm.trim() !== "" && filteredGames.length > 0 && (
        <FoundGames
          filteredGames={filteredGames}
          handleGameSelect={handleGameSelect}
          onAvanzar={handleOpenEditPlatformPanel}
          byPlatform={byPlatform} // Pasar la prop opcional
          setEditEstadoPanelOpen={setEditEstadoPanelOpen} // Solo si es necesario para plataforma
        />
      )}
    </div>
  );
}
