import React from 'react';

export const NoGamesInListPrompt = ({ noGamesLoaded, handleAddGameMenu, estadoPluralMinusculas, estadoSingularMayusculas }) => {
  if (!noGamesLoaded) return null;

  const renderMessage = () => {
    if (estadoPluralMinusculas) {
      // Caso listado por estado de juego
      return (
        <h3 className="mb-4 text-lg font-semibold text-gray-300">
          ¡No tienes juegos en <span className="capitalize">{estadoPluralMinusculas === 'lista-de-deseos' ? estadoSingularMayusculas : estadoPluralMinusculas}</span>!
        </h3>
      );
    }
    
    // Caso listado completo
    return (
      <h3 className="mb-4 text-lg font-semibold text-gray-300">
        ¡No tienes juegos en tus colecciones!
      </h3>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 mt-20 mb-6 bg-gray-800 border-2 border-gray-600 border-dashed rounded-lg">
      <img src="/Imagen-no-encontrado.webp" alt="No hay juegos" className="w-20 h-20 mb-4" />
      {renderMessage()}
      <p className="mb-4 text-gray-400">Agrega tus juegos y empieza tu colección.</p>
      <button
        onClick={handleAddGameMenu}
        className="flex items-center px-4 py-2 text-sm font-medium text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700"
      >
        Agregar Juegos
        <span className="ml-2">➕</span>
      </button>
    </div>
  );
};

