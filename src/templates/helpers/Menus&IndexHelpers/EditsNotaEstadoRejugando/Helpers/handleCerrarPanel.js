export const handleCerrarPanel = async (
    estadoSeleccionado, estadoActual, onEstadoChange, 
    addGameFicha, juego, user, platformDefault, platform, 
    registeredGames, newPosition, setIsLoading, setError, setSuccess, onAvanzar
  ) => {
    // Solo llamamos a la función de cambio si el estado es diferente
    if (estadoSeleccionado !== estadoActual) {
      onEstadoChange(estadoSeleccionado); // Estado ha cambiado, hacemos el cambio
    }
  
    // Ejecuta la función para añadir el juego
    await addGameFicha(juego, user, platformDefault, platform, estadoSeleccionado, registeredGames, newPosition, setIsLoading, setError, setSuccess);
    
    // Establecer success temporalmente después de añadir el juego
    setSuccess(`El juego ${juego.titulo} ha sido añadido correctamente`);
    
    // Restablecer el mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setSuccess(null);
      onAvanzar(); // Cerramos el panel
    }, 3000);
  };
  
