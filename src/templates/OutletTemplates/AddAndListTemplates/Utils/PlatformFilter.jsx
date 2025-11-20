import React, { useState } from "react";
import { FilterIcon } from "../../../../assets/Icons/FilterIcon";
import { platforms } from "../../../helpers/constants/constants";

export const PlatformFilter = ({ filtroPlataforma, setFiltroPlataforma }) => {
  const [open, setOpen] = useState(false);

  const togglePlatform = (platform) => {
    if (filtroPlataforma.includes(platform)) {
      setFiltroPlataforma(filtroPlataforma.filter(p => p !== platform));
    } else {
      setFiltroPlataforma([...filtroPlataforma, platform]);
    }
  };

  return (
    <div className="relative right-[124px] sm:right-0 sm:mr-3 lg:mr-8 text-white mt-[49px]">
      {/* Botón principal */}
      <button
        className="flex items-center gap-2 p-1 px-2 text-xs transition duration-500 bg-gray-900 rounded hover:bg-gray-500"
        onClick={() => setOpen(!open)}
      >
        Filtrar <FilterIcon w={5} h={5}/>
      </button>

      {/* Dropdown flotante */}
      {open && (
        <div className="absolute left-0 z-50 w-48 p-2 mt-2 overflow-auto bg-gray-800 border border-gray-900 rounded-lg shadow-lg lg:max-h-64 max-h-52">
          <p className="pb-2 text-sm">Selecciona plataformas:</p>
          <div className="flex flex-col gap-1">
            {platforms.map((platform) => (
              <label
                key={platform}
                className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-gray-700"
              >
                <input
                  type="checkbox"
                  checked={filtroPlataforma.includes(platform)}
                  onChange={() => togglePlatform(platform)}
                  className="accent-blue-500"
                />
                <span className="text-xs">{platform}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
