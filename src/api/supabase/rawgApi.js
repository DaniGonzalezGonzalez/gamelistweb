// src/api/rawgApi.js

const API_KEY = '9d000f7ff34747739d0c9c3c347e5a8f';  // Aquí va tu API Key


// src/api/rawgApiService.js
export const fetchGamesFromRawg = async (search = '', dates = '', platforms = '') => {
    // Construimos la URL dinámica según los parámetros que tengamos
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
  
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;  // Añadimos el parámetro de búsqueda por nombre de juego
    }
  
    if (dates) {
      url += `&dates=${dates}`;  // Si tenemos fechas, las añadimos
    }
  
    if (platforms) {
      url += `&platforms=${platforms}`;  // Si tenemos plataformas, las añadimos
    }
  
    const response = await fetch(url);
    const data = await response.json();

    const cleanString = (str) => {
      return str
        .toLowerCase()                           // Ignora mayúsculas y minúsculas
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Elimina tildes (á -> a, é -> e, etc.)
        .replace(/[^a-z0-9]/g, "")             // Elimina cualquier carácter que no sea letra o número
    };
     // Filtramos los resultados para asegurarnos de que el nombre de cada juego coincida exactamente
     if (search) {
      const cleanedSearch = cleanString(search)
    
      return data.results.filter(game => 
        cleanString(game.name) === cleanedSearch
      );
    }
    
    return data.results;  // Devolvemos los juegos encontrados
  };









// // Función para obtener las plataformas de juegos de RAWG
// export const fetchPlatformsFromRawg = async () => {
//   try {
//     const response = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
//     const data = await response.json();
//     return data.results;  // Devuelves los resultados de la API (las plataformas)
//   } catch (error) {
//     console.error('Error fetching platforms:', error);
//     return [];  // Si ocurre un error, devuelves un array vacío
//   }
// };


// // Función para obtener juegos de RAWG con filtros de fecha y plataforma
// export const fetchGamesFromRawg = async (dates, platforms) => {
//     try {
//       const url = `https://api.rawg.io/api/games?key=${API_KEY}&dates=${dates}&platforms=${platforms}`;
//       const response = await fetch(url);
//       const data = await response.json();
//       return data.results;  // Devuelves los juegos obtenidos
//     } catch (error) {
//       console.error('Error fetching games:', error);
//       return [];  // Si ocurre un error, devuelves un array vacío
//     }
//   };

//   // src/api/rawgApiService.js

// // Función para obtener los IDs de las plataformas por nombre
// export const fetchPlatformIds = async () => {
//     const response = await fetch('https://api.rawg.io/api/platforms?key=9d000f7ff34747739d0c9c3c347e5a8f');
//     const data = await response.json();
//     return data.results;  // Devuelve todas las plataformas
//   };
  