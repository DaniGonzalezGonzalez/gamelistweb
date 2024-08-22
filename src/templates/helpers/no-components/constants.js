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
      colorClass = "bg-gray-700";
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
      case 'Xbox 360':
          return 'bg-gradient-to-r from-green-600 to-green-800';
      case 'Xbox One':
          return 'bg-gradient-to-r from-green-800 to-gray-900';
      case 'SEGA Megadrive':
          return 'bg-gradient-to-r from-blue-600 to-blue-800';
      default:
          return 'bg-slate-900'; // Fondo predeterminado
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
  'Xbox One': "GamesBD",
  'Xbox 360': "GamesBD",
  'Steam': "GamesBD",
  'SNES': "GamesBD",
  'NES': "GamesBD",
  'SEGA Mega Drive':"GamesBD",
  '': 'GamesBD'
};



// export const platformCollectionMap = {
//   "PS5": "GamesBDPS5",
//   "PS4": "GamesBDPS4",
//   "PS3": "GamesBDPS3",
//   "PS2": "GamesBDPS2",
//   "PS1": "GamesBDPS1",
//   "PSVita": "GamesBDPSVita",
//   "PSP": "GamesBDPSP",
//   "Nintendo Switch": "GamesBDNintendoSwitch",
//   "WiiU": "GamesBDWiiU",
//   "Wii": "GamesBDWii",
//   "GameCube": "GamesBDGameCube",
//   'Nintendo 64': "GamesBDNintendo64",
//   'Nintendo 3DS': "GamesBDNintendo3DS",
//   'Nintendo DS': "GamesBDNintendoDS",
//   'Game Boy Advance': "GamesBDGameBoyAdvance",
//   'Game Boy Color': "GamesBDGameBoyColor",
//   'Game Boy': "GamesBDGameBoy",
//   'Xbox One': "GamesBDXboxOne",
//   'Xbox 360': "GamesBDXbox360",
//   'Steam': "GamesBDSteam",
//   'SNES': "GamesBDSNES",
//   'NES': "GamesBDNES",
//   'SEGA Mega Drive':"GamesBDSEGAMegaDrive",
//   '': 'GamesBD'
// };


  // Función para limpiar el título
  export const cleanTitle = (title) => {
    const suffixes = ['- PS5', '- PS4', '- PS3', '- PS2', '- PS1', '- PSVita', '- PSP', '- Nintendo Switch','- WiiU', '- Wii', '- GameCube', '- Nintendo 64','- Nintendo 3DS', '- Nintendo DS','- Game Boy Advance', '- Game Boy Color', '- Game Boy', '- Xbox One', '- Xbox 360', '- Steam', '- SNES', '- NES', '- SEGA Mega Drive' ];
    for (const suffix of suffixes) {
      if (title.endsWith(suffix)) {
        return title.slice(0, -suffix.length).trim();
      }
    }
    return title;
  };

  // Sumar el total de tiempoMainStory
  export const totalTiempoMainStory = (games) => {
    return games.reduce((total, game) => total + (game.tiempoMainStory || 0), 0);
  };

    // Sumar el total de notaMetacriticPrensa
    export const totalNotaMetacriticPrensa = (games) => {
      if (games.length === 0) return 0;

      const totalNotaMetacriticPrensa = games.reduce((total, game) => total + (game.notaMetacriticPrensa || 0), 0);
      const mediaNotaMetacriticPrensa = totalNotaMetacriticPrensa / games.length;
    
      return Math.round(mediaNotaMetacriticPrensa) !== 0 ? Math.round(mediaNotaMetacriticPrensa) : 'No hay nota media' ;    
    };