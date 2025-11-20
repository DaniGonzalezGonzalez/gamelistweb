// src/api/rawgApi.js

// src/api/rawgApiService.js
export const fetchGamesFromRawg = async (search = '', dates = '', platforms = '', exactMatch = true) => {
  let url = `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}`;

  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  if (dates) {
    url += `&dates=${dates}`;
  }

  if (platforms) {
    url += `&platforms=${platforms}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  const cleanString = (str) => {
    return str
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
  };

  if (search) {
    const cleanedSearch = cleanString(search);

    if (exactMatch) {
      return data.results.filter(game =>
        cleanString(game.name) === cleanedSearch
      );
    } else {
      return data.results.filter(game =>
        cleanString(game.name).includes(cleanedSearch)
      );
    }
  }

  return data.results;
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
  