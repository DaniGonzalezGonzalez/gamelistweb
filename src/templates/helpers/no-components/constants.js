import { supabase } from "../../../api/supabase/supabase";


export const INITIAL_VALUE = {
    uid:'', 
    email:'', 
    displatName:''
}

  // Función para obtener la clase de color según la nota del juego
export const GET_COLOR_CLASS = (nota) => {
  let colorClass = "";
  switch (parseInt(nota)) {
    case 0:
      colorClass = "bg-red-700";
      break;
    case 1:
    case 2:
    case 3:
    case 4:
      colorClass = "bg-red-600";
      break;
    case 5:
    case 6:
      colorClass = "bg-yellow-600";
      break;
    case 7:
      colorClass = "bg-green-600";
      break;
    case 8:
      colorClass = "bg-green-700";
      break;
    case 9:
      colorClass = "bg-green-800";
      break;
    case 10:
      colorClass = "bg-green-900";
      break;
    default:
      colorClass = "bg-gray-600";
  }
  return colorClass;
}



// export const GET_COLOR_CLASS_RGBA = (nota) => {
//   let rgbaColor = "";
//   switch (parseInt(nota)) {
//     case 0:
//       rgbaColor = "rgba(185, 28, 28, 0.8)"; // Rojo oscuro
//       break;
//     case 1:
//     case 2:
//     case 3:
//     case 4:
//       rgbaColor = "rgba(220, 38, 38, 0.8)"; // Rojo
//       break;
//     case 5:
//     case 6:
//       rgbaColor = "rgba(220, 179, 34, 0.8)"; // Amarillo
//       break;
//     case 7:
//       rgbaColor = "rgba(22, 163, 74, 0.8)"; // Verde
//       break;
//     case 8:
//       rgbaColor = "rgba(6, 95, 70, 0.8)"; // Verde oscuro
//       break;
//     case 9:
//       rgbaColor = "rgba(4, 120, 87, 0.8)"; // Verde más oscuro
//       break;
//     case 10:
//       rgbaColor = "rgba(0, 128, 0, 0.8)"; // Verde muy oscuro
//       break;
//     default:
//       rgbaColor = "rgba(75, 75, 75, 0.8)"; // Gris
//   }
//   return rgbaColor;
// };


export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  })
}

// src/utils/platformBackgrounds.js

export function getPlatformBackground(platform) {
  switch (platform) {
      case 'PS1':
          return 'bg-gradient-to-r from-purple-600 to-purple-800';
      case 'PS2':
          return 'bg-gradient-to-r from-blue-600 to-blue-800';
      case 'PS3':
          return 'bg-gradient-to-r from-gray-600 to-gray-800';
      case 'PS4':
          return 'bg-gradient-to-r from-blue-800 to-blue-950';
      case 'PS5':
          return 'bg-gradient-to-r from-gray-200 to-gray-400';
      case 'Nintendo 64':
          return 'bg-gradient-to-r from-red-700 to-blue-800';
      case 'Game Boy Color':
          return 'bg-gradient-to-r from-green-800 to-green-950';
      case 'Game Boy':
          return 'bg-gradient-to-r from-green-300 to-green-500';
      case 'NES':
          return 'bg-gradient-to-r from-red-600 to-red-800';
      case 'SNES':
          return 'bg-gradient-to-r from-purple-600 to-purple-800';
      case 'Game Boy Advance':
          return 'bg-gradient-to-r from-violet-400 to-violet-600';
      case 'PSP':
          return 'bg-gradient-to-r from-black to-gray-800';
      case 'PS Vita':
          return 'bg-gradient-to-r from-blue-400 to-blue-600';
      case 'Wii':
          return 'bg-gradient-to-r from-gray-100 to-blue-400';
      case 'WiiU':
        return 'bg-gradient-to-r from-blue-500 to-blue-800';
      case 'GameCube':
          return 'bg-gradient-to-r from-purple-500 to-purple-900';
      case 'Nintendo Switch':
          return 'bg-gradient-to-r from-red-600 to-red-800';
      case 'Nintendo 3DS':
        return 'bg-gradient-to-r from-red-900 to-slate-900';
      case 'Nintendo DS':
        return 'bg-gradient-to-r from-gray-400 to-slate-700';
      case 'Xbox 1':
        return 'bg-gradient-to-r from-green-600 to-green-800';
      case 'Xbox 360':
          return 'bg-gradient-to-r from-green-600 to-green-800';
      case 'Xbox One':
          return 'bg-gradient-to-r from-green-800 to-gray-900';
      case 'Xbox Series X-S':
        return 'bg-gradient-to-r from-green-800 to-gray-900';
      case 'SEGA MegaDrive':
          return 'bg-gradient-to-r from-blue-600 to-blue-800';
      default:
          return 'bg-slate-900'; // Fondo predeterminado
  }
}



export function GET_STATE_BACKGROUND(state) {
  switch (state) {
      case 'Jugando':
          return 'bg-blue-500'; // Un azul más vibrante para "Jugando"
      case 'Completando':
          return 'bg-gray-600'; // Un tono moderno y fresco para "Completando"
      case 'Terminado':
          return 'bg-green-600'; // Verde brillante para reflejar logro en "Terminado"
      case 'En lista':
          return 'bg-indigo-400'; // Un índigo más suave pero moderno para "En lista"
      case 'Otra vez':
          return 'bg-purple-700'; // Un púrpura vibrante para "Otra vez"
      case 'Abandonado':
          return 'bg-red-600'; // Rojo fuerte pero menos agresivo para "Abandonado"
      case 'Pausado':
          return 'bg-yellow-500'; // Amarillo brillante y cálido para "Pausado"
      case 'Lista de deseos':
          return 'bg-orange-500'; // Naranja atractivo y vibrante para "Lista de deseos"
      default:
          return 'bg-slate-800'; // Un gris oscuro elegante para el estado predeterminado
  }
}


export const platformCollectionMap = {
  "PS5": "GamesBD",
  "PS4": "GamesBD",
  "PS3": "GamesBD",
  "PS2": "GamesBD",
  "PS1": "GamesBD",
  "PSVita": "GamesBD",
  "PSP": "GamesBD",
  "Nintendo Switch": "GamesBD",
  "WiiU": "GamesBD",
  "Wii": "GamesBD",
  "GameCube": "GamesBD",
  'Nintendo 64': "GamesBD",
  'Nintendo 3DS': "GamesBD",
  'Nintendo DS': "GamesBD",
  'Game Boy Advance': "GamesBD",
  'Game Boy Color': "GamesBD",
  'Game Boy': "GamesBD",
  'Xbox Series X-S': "GamesBD",
  'Xbox One': "GamesBD",
  'Xbox 360': "GamesBD",
  'Xbox 1': "GamesBD",
  'PC': "GamesBD",
  'SNES': "GamesBD",
  'NES': "GamesBD",
  'SEGA MegaDrive':"GamesBD",
  '': 'GamesBD'
}


  // Función para limpiar el título
  export const cleanTitle = (title) => {
    const suffixes = ['- PS5', '- PS4', '- PS3', '- PS2', '- PS1', '- PSVita', '- PSP', '- Nintendo Switch','- WiiU', '- Wii', '- GameCube', '- Nintendo 64','- Nintendo 3DS', '- Nintendo DS','- Game Boy Advance', '- Game Boy Color', '- Game Boy', '- Xbox Series X-S', '- Xbox One', '- Xbox 360', '- Xbox 1', '- PC', '- SNES', '- NES', '- SEGA MegaDrive' ]
    for (const suffix of suffixes) {
      if (title.endsWith(suffix)) {
        return title.slice(0, -suffix.length).trim()
      }
    }
    return title
  }

  // Sumar el total de tiempoMainStory
  export const totalTiempoMainStory = (games) => {
    return games.reduce((total, game) => total + (game.tiempoMainStory || 0), 0);
  };

// Sumar el total de notaMetacriticPrensa
export const totalNotaMetacriticPrensa = (games) => {
  if (games.length === 0) return 'No hay nota media';

  const totalNotaMetacriticPrensa = games.reduce((total, game) => total + (game.notaMetacriticPrensa || 0), 0);
  const mediaNotaMetacriticPrensa = totalNotaMetacriticPrensa / games.length;
  
  return mediaNotaMetacriticPrensa !== 0 
    ? parseFloat(mediaNotaMetacriticPrensa.toFixed(1)) 
    : 'No hay nota media';
};


    
export function ordenarYLimitarJuegos(juegos, limite, ascendente = false) {
  // Ordenar juegos por fecha de actualización
  const juegosOrdenados = juegos.sort((a, b) => {
      return ascendente 
          ? new Date(a.position) - new Date(b.position)
          : new Date(b.position) - new Date(a.position)
  });

  // Limitar la cantidad de juegos mostrados al número especificado
  return juegosOrdenados.slice(0, limite)
}


// keywordStyles
export const getKeywordStyles = (titulo, plataforma, genero) => ({
  title: {
      keywords: [titulo],
      color: 'orange', // Color para el título del juego
      fontWeight: 'bold',
      fontStyle: 'italic'
  },
  platform: {
      keywords: [plataforma],
      color: 'red', // Cambia el color como desees
      fontWeight: 'normal',
  },
  genre: {
      keywords: [genero.toLowerCase()],
      color: 'green', // Cambia el color como desees
      fontWeight: 'italic',
      textDecoration: 'underline'
  }
});



export const platforms = [
  'PS5',
  'Nintendo Switch',
  'PC',
  'Xbox Series X-S',
  'PS4',
  'WiiU',
  'Xbox One',
  'PS3',
  'Xbox 360',
  'PSVita',
  'Nintendo 3DS',
  'PS2',
  'GameCube',
  'Nintendo DS',
  'PS1',
  'Nintendo 64',
  'Xbox 1',
  'PSP',
  'Game Boy Advance',
  'SNES',
  'SEGA MegaDrive',
  'NES',
  'Game Boy Color',
  'Game Boy',
];



// Para obtener la imagen de la plataforma personalizada
export const getPlatformImage = async (platform) => {
  const plataforma = platform.replace(/\s+/g, '-').trim()
  const imageName = `${plataforma}-Logo.webp`; // Construir el nombre de la imagen
  const imageUrl = `/platformImages/${imageName}`; // Construir la URL de la imagen
  return imageUrl; // Retornar la URL
};


