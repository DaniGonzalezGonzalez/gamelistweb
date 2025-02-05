import { limpiarTituloJuego } from "../Menus&IndexHelpers/EditsNotaEstadoRejugando/Helpers/utils";

// utils.js
export const obtenerJuegosCoincidentes = (game, dataBD) => {
    const juegosCoincidentes = Array.isArray(dataBD)
      ? dataBD.filter((item) => limpiarTituloJuego(item.titulo) === limpiarTituloJuego(game.titulo))
      : [];
    return juegosCoincidentes;
  }
  
  export const getPlataformas = (juegosCoincidentes) => juegosCoincidentes.map((item) => item.plataforma);
  