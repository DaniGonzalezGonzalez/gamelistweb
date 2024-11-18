import { platforms } from "../../../constants/constants";

// utils.js
export const limpiarTituloJuego = (titulo) => {
    if(titulo) {
      const regex = new RegExp(` - (${platforms.join('|')})$`, 'i'); // Crear una expresión regular con las plataformas importadas
      return titulo.replace(regex, '').trim(); // Limpiar solo si es una plataforma al final
    }
  };
  


  export const calculateNewPosition = (dataBD) => {
    return dataBD.length > 0 
      ? Math.max(...dataBD.map(item => item.position || 0)) + 1 // Encuentra el máximo y suma 1
      : 1; // Si no hay juegos, la posición inicial será 1
  };