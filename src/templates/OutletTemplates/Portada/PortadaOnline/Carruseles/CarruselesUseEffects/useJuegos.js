import { useEffect } from 'react';

export const useFetchJuegos = (isJuegosLoaded, fetchJuegos) => {
  useEffect(() => {
    if (!isJuegosLoaded) {
      fetchJuegos();
    }
  }, [isJuegosLoaded, fetchJuegos]);
};

export const useFiltrarJuegos = ({isJuegosLoaded, juegos, filtrarMayor, añoFiltro, añoInicio, añoFin, notaMetacriticPrensaMin,notaMetacriticPrensaMax, notaMetacriticUsuariosMin, notaMetacriticUsuariosMax, descripcion, genero, titulo, tiempoMainStoryMin, tiempoMainStoryMax, gameAdded, setJuegosFiltrados}) => {
  useEffect(() => {
    if (isJuegosLoaded) {
      let filteredGames = juegos;

      // Filtrar por rango de años si se pasan añoInicio y añoFin
      if (añoInicio && añoFin) {
        filteredGames = filteredGames.filter((juego) => 
          juego.lanzamiento >= añoInicio && juego.lanzamiento <= añoFin
        );
      } 
      // Si solo se pasa un añoFiltro, filtrar por antes o después de ese año
      else if (añoFiltro) {
        filteredGames = filteredGames.filter((juego) =>
          filtrarMayor ? juego.lanzamiento >= añoFiltro : juego.lanzamiento <= añoFiltro
        );
      }

      // Filtrar por genero solo si se pasa genero
      if (genero) {
        filteredGames = filteredGames.filter((juego) => juego.genero === genero);
      }

      // Filtrar por notaMetacriticPrensa, si se pasa un rango
      if (notaMetacriticPrensaMin !== undefined && notaMetacriticPrensaMax !== undefined) {
        filteredGames = filteredGames.filter((juego) => 
          juego.notaMetacriticPrensa >= notaMetacriticPrensaMin && juego.notaMetacriticPrensa <= notaMetacriticPrensaMax
        );
      } else if (notaMetacriticPrensaMin !== undefined) {
        filteredGames = filteredGames.filter((juego) => juego.notaMetacriticPrensa >= notaMetacriticPrensaMin);
      } else if (notaMetacriticPrensaMax !== undefined) {
        filteredGames = filteredGames.filter((juego) => juego.notaMetacriticPrensa <= notaMetacriticPrensaMax);
      }

      // Filtrar por notaMetacriticUsuarios, si se pasa un rango
      if (notaMetacriticUsuariosMin !== undefined && notaMetacriticUsuariosMax !== undefined) {
        filteredGames = filteredGames.filter((juego) => 
          juego.notaMetacriticUsuarios >= notaMetacriticUsuariosMin && juego.notaMetacriticUsuarios <= notaMetacriticUsuariosMax
        );
      } else if (notaMetacriticUsuariosMin !== undefined) {
        filteredGames = filteredGames.filter((juego) => juego.notaMetacriticUsuarios >= notaMetacriticUsuariosMin);
      } else if (notaMetacriticUsuariosMax !== undefined) {
        filteredGames = filteredGames.filter((juego) => juego.notaMetacriticUsuarios <= notaMetacriticUsuariosMax);
      }

      // Filtrar por descripcion (nombre de la desarrolladora)
      if (descripcion) {
        filteredGames = filteredGames.filter((juego) => 
          juego.descripcion.toLowerCase().includes(descripcion.toLowerCase())
        );
      }

      // Filtrar por título (por ejemplo, busca títulos que contengan una palabra)
      if (titulo) {
        filteredGames = filteredGames.filter((juego) => 
          juego.titulo.toLowerCase().includes(titulo.toLowerCase())
        );
      }

      // Filtrar por tiempo de la historia (tiempoMainStory)
      if (tiempoMainStoryMin !== undefined && tiempoMainStoryMax !== undefined) {
        filteredGames = filteredGames.filter((juego) => 
          juego.tiempoMainStory >= tiempoMainStoryMin && juego.tiempoMainStory <= tiempoMainStoryMax
        );
      } else if (tiempoMainStoryMin !== undefined) {
        filteredGames = filteredGames.filter((juego) => juego.tiempoMainStory >= tiempoMainStoryMin);
      } else if (tiempoMainStoryMax !== undefined) {
        filteredGames = filteredGames.filter((juego) => juego.tiempoMainStory <= tiempoMainStoryMax);
      }

      // Actualizar los juegos filtrados
      setJuegosFiltrados(filteredGames);
    }
  }, [
    isJuegosLoaded,
    juegos,
    filtrarMayor,
    añoFiltro,
    añoInicio,
    añoFin,
    genero,
    notaMetacriticPrensaMin,
    notaMetacriticPrensaMax,
    notaMetacriticUsuariosMin,
    notaMetacriticUsuariosMax,
    descripcion,
    titulo,
    tiempoMainStoryMin,  // Asegúrate de agregar el nuevo parámetro aquí
    tiempoMainStoryMax,  // Y este también
    gameAdded,
    setJuegosFiltrados,
  ]);
};


export const useFetchJuegosOnGameAdded = (gameAdded, fetchJuegos) => {
  useEffect(() => {
    fetchJuegos();
  }, [gameAdded, fetchJuegos]);
};
