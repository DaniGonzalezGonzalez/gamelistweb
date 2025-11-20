import React from "react";

export const SortControl = ({ 
  sortBy, 
  setSortBy, 
  setSortDirection, 
  sortType = "default",  // Prop que controla qué opciones usar
}) => {
  // Opciones predeterminadas
  const defaultOptions = [
    { value: "position", label: "Personalizado" },
    { value: "titulo", label: "Título" },
    { value: "plataforma", label: "Plataforma" },
    { value: "notaJuego", label: "Nota" },
  ];

  // Opciones para el listado completo
  const listadoOptions = [
    { value: "titulo", label: "Título" },
    { value: "estado", label: "Estado" },
    { value: "plataforma", label: "Plataforma" },
  ];

  // Elegir las opciones según el `sortType` recibido
  const selectOptions = sortType === "estado" ? defaultOptions : listadoOptions;

  return (
    <div className="flex flex-col items-end gap-4 text-xs">
      {/* Select para ordenar */}
      <select 
        className="w-32 bg-gray-300 rounded sm:w-32" 
        value={sortBy} 
        onChange={(e) => setSortBy(e.target.value)}
      >
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Botones para dirección del orden */}
      <div className="flex flex-col gap-1">
        <div className="text-white">
          <p className="pb-1">Orden:</p>
          <div className="flex gap-2">
            <button 
              className="w-16 max-w-xs p-1 overflow-hidden text-white bg-gray-700 rounded sm:w-24 text-ellipsis md:max-w-none hover:bg-gray-400" 
              onClick={() => setSortDirection("asc")}
            >
              Ascendente
            </button>
            <button 
              className="w-16 max-w-xs p-1 overflow-hidden text-white bg-gray-700 rounded sm:w-24 text-ellipsis md:max-w-none hover:bg-gray-400" 
              onClick={() => setSortDirection("desc")}
            >
              Descendente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

