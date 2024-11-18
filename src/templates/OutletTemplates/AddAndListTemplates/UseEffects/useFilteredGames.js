import { useEffect } from "react";

export const useFilteredGames = ({
  gameAdded,
  setSearchTerm,
  setPlatform,
  setGameAdded,
  debouncedSearchTerm,
  games,
  selectedTitle,
  setFilteredGames,
  setIsTitleValid,
  getPlatformImage
}) => {
  useEffect(() => {
    if (gameAdded) {
      setSearchTerm('')  // Restablece el término de búsqueda
      setPlatform('')
      setGameAdded(false) // Resetea el estado de juego añadido
    }

    if (debouncedSearchTerm.trim() === "") {
      setFilteredGames([])
      setIsTitleValid(false)
      return
    }

    const filtered = games.filter((game) =>
      game.titulo.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )

    // Cargar imágenes de la plataforma para los juegos filtrados
    const loadPlatformImages = () => {
      const updatedGames = filtered.map((game) => {
        const platformImageUrl = getPlatformImage(game.plataforma); // Obtener la URL de la imagen
        return { ...game, platformImageUrl };
      });
      setFilteredGames(updatedGames) // Actualizar el estado con las imágenes cargadas
    }
    
    loadPlatformImages()

    // Verifica si el título coincide exactamente con selectedTitle
    const exactMatch = filtered.some((game) => game.titulo === debouncedSearchTerm);
    setIsTitleValid(exactMatch);
  }, [debouncedSearchTerm, games, selectedTitle, gameAdded, setSearchTerm, setPlatform, setGameAdded, setFilteredGames, setIsTitleValid, getPlatformImage]);
};

