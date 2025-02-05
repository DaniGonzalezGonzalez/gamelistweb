// Función para filtrar juegos basada en un tipo de filtro y un valor
export const filterGames = (games, filterType, filterValue) => {
  return games.filter((game) => {
    if (filterType && game[filterType]) {
      const gameValue = game[filterType];
  
      // Verificar si el filterValue puede ser un rango numérico, e.g., "8.5-9.5"
      if (typeof filterValue === "string" && filterValue.includes("-")) {
        // Verificar si ambos lados del guion son números válidos
        const [left, right] = filterValue.split("-").map(Number);
        if (Number.isFinite(left) && Number.isFinite(right)) {
          // Es un rango numérico, realizar comparación
          if (typeof gameValue === "number") {
            return gameValue <= left && gameValue >= right;
          }
        } else {
          // Si no es un rango numérico, lo tratamos como texto
          return gameValue.toLowerCase().includes(filterValue.toLowerCase());
        }
      }
  
      // Comparaciones exactas (e.g., "8.5", ">8.5", "<=9.0")
      if (typeof filterValue === "string" && typeof gameValue === "number") {
        const match = filterValue.match(/(>=|<=|>|<)?\s*(\d+(\.\d+)?)/);
        if (match) {
          const operator = match[1] || "==";
          const value = parseFloat(match[2]);
          if (Number.isFinite(value)) {
            switch (operator) {
              case ">":
                return gameValue > value;
              case "<":
                return gameValue < value;
              case ">=":
                return gameValue >= value;
              case "<=":
                return gameValue <= value;
              case "==":
              default:
                return gameValue === value;
            }
          }
        }
      }
  
      // Manejo de texto (búsqueda de coincidencia parcial)
      if (typeof gameValue === "string" && typeof filterValue === "string") {
        return gameValue.toLowerCase().includes(filterValue.toLowerCase());
      }
    }
    return false; // Si no hay un filtro válido
  });
}
