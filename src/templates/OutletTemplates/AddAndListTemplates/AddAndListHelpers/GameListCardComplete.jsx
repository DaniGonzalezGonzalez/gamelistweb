import React from "react";

export const GameListCardComplete = ({ sortedData, user, handleTitleClick, GET_STATE_BACKGROUND, GET_STATE_ICON, GET_COLOR_CLASS, cleanTitle }) => {
  return (
    <div className="grid grid-cols-2 gap-6 px-3 py-5 mx-auto lg:px-5 xs:px-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {sortedData.map((item, index) => (
        <div key={index} className="flex justify-center rounded">
          {/* Si el usuario es el propietario del juego, lo mostramos */}
          {item?.infouser === user.email && (
            <div className="w-full">
              <div className="flex justify-center w-full gap-10 mb-10 text-lg font-bold text-gray-800 rounded">
                <div className="h-full w-80 sm:w-56 xl:w-48 2xl:w-60">
                  {/* Imagen del juego y plataforma */}
                  <button onClick={() => handleTitleClick(item.id)} className="relative flex items-center justify-center w-full gap-3 shadow-md sm:flex hover:rounded-lg">
                    <img
                      className="object-cover w-full h-40 transition duration-500 ease-in-out border-2 border-transparent rounded-lg xl:h-48 2xl:h-52 hover:border-2 hover:rounded-lg hover:border-gradient"
                      src={item.imageUrl ?? item.url[0]}
                      alt="No hay imagen"
                    />
                    <img
                      className="absolute object-contain w-8 h-8 p-1 bg-gray-200 rounded-lg shadow right-2 bottom-2 shadow-black"
                      src={`/platformImages/${item.plataforma.replace(/\s+/g, '-').trim()}-Logo.webp`}
                      alt="No hay imagen"
                      title={`Plataforma: ${item?.plataforma || "Sin plataforma especificada"}`}
                    />
                  </button>

                  <div className="w-full">
                    {/* Información del título del juego */}
                    <div className="flex justify-between gap-8 pt-3 pb-1 text-justify">
                      <p className="text-xs text-white text-start">{cleanTitle(item?.titulo)}</p>
                    </div>

                    {/* Información del estudio creador del juego */}
                    <div className="pb-3">
                      <p className="text-xs text-white uppercase descripcion text-start">{item?.descripcion}</p>
                    </div>

                    <div className="flex flex-col justify-between w-full gap-2">
                      {/* Información del estado del juego */}
                      <div className="flex items-center justify-between gap-2 pb-1">
                        <div className={`text-xs rounded flex items-center gap-1 text-gray-100 text-start`}>
                          <div className={`${GET_STATE_BACKGROUND(item.estado)} p-0.5 rounded mr-1`}>
                            {GET_STATE_ICON(item.estado, "4", "4")}
                          </div>
                          <span className="text-[10px] lg:text-[11px] py-1 font-semibold">{item?.estado}</span>
                        </div>

                        {/* Nota del juego */}
                        <div className="pr-2">
                          {item?.notaJuego !== undefined && item?.notaJuego !== null && item.notaJuego !== "" && (
                            <p className={`text-xs text-gray-100 flex justify-center items-center rounded px-2 w-6 h-6 py-1 text-end ${GET_COLOR_CLASS(item?.notaJuego)}`}>
                              {item?.notaJuego}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

