import { useState, useEffect } from 'react';

export const useRandomImageEffect = (games) => {
  const [recentGames, setRecentGames] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (games.length > 0) {
      // Selección de imagen aleatoria
      const randomIndex = Math.floor(Math.random() * games.length);
      const randomImage = (games[randomIndex]?.url && games[randomIndex]?.url[0]) || games[randomIndex]?.imageUrl;
      setSelectedImage(randomImage);

      // Juegos recientes (ordenados por ID descendente)
      const sortedById = [...games].sort((a, b) => b.id - a.id);
      const recentGamesList = sortedById.slice(0, 10);
      setRecentGames(recentGamesList);
    }
  }, [games]);

  return { recentGames, selectedImage };
};
