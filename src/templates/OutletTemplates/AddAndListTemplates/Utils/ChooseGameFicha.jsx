import React from "react";
import { limpiarTituloJuego } from "../../../helpers/Menus&IndexHelpers/EditsNotaEstadoRejugando/Helpers/utils";

export function ChooseGameFicha({ game, onSelect, onClose }) {

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
              <div className="w-full p-4 transition-transform duration-300 transform scale-95 shadow-2xl bg-dark-800 rounded-xl">
                <h2 className="mb-4 text-lg font-semibold text-center text-white">
                  Selecciona una ficha de juego
                </h2>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:w-full overflow-y-auto h-[65vh] sm:h-[50vh] place-items-center custom-scrollbar">
                  {game.map((gameData) => (
                    <li key={gameData.id} className="relative p-3 transition-all duration-300 rounded-lg sm:w-[90%] hover:bg-gray-700">
                      {/* Imagen y contenido encima de la imagen */}
                      <div className="relative w-full h-28 lg:h-60">
                        <img
                          src={gameData.imageUrl ?? gameData.url[0]}
                          alt={gameData.titulo}
                          className="object-cover w-full h-full rounded-xl"
                        />
                      {/* Contenido sobre la imagen */}
                      <div className="absolute inset-0 p-3 bg-black bg-opacity-50 rounded-xl">
                        {/* Título y Descripción a la izquierda, en la parte inferior */}
                        <div className="absolute flex flex-col sm:w-1/2 lg:w-full bottom-3 left-3">
                            <p className="text-xs font-semibold text-white lg:text-sm">
                            {limpiarTituloJuego(gameData.titulo)}
                            </p>
                            <p className="mt-1 text-xs text-gray-300 lg:text-sm line-clamp-2">
                            {gameData.descripcion || "Sin descripción disponible"}
                            </p>
                        </div>
                        
                        {/* Logo de la plataforma abajo a la derecha */}
                        <img
                            src={`/platformImages/${gameData.plataforma.replace(/\s+/g, '-').trim()}-Logo.webp`}
                            alt={gameData.plataforma}
                            className="absolute object-contain p-1 bg-gray-200 shadow-lg bottom-3 right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-xl"
                        />
                      </div>
                    </div>
    
                    <div className="mt-4 text-center">
                    <button
                        className="px-4 py-1 text-sm text-white transition-all duration-200 transform shadow-md bg-slate-700 rounded-xl hover:bg-slate-800"
                        onClick={() => onSelect(gameData.id)}
                    >
                        Seleccionar
                    </button>
                    </div>
                </li>
                ))}
            </ul>
            <div className="mt-6 text-center">
                <button
                className="px-4 py-1 text-sm text-white transition-all duration-200 bg-purple-700 shadow-md rounded-xl hover:bg-purple-800"
                onClick={onClose}
                >
                Cancelar
                </button>
            </div>
            </div>
        </div>
        );
    }