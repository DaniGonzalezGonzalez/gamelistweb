export const handlePlatformClick = async (
  value,
  platformActual,
  plataformasExistentes,
  setErrorMessage,
  setPlatform,
  tituloJuego,
  limpiarTituloJuego,
  collection,
  juegoId,
  updateDocument,
  onPlatformChange,
  onAvanzar,
  onClose,
  isFromAddFicha,
  onAdded = undefined // Por defecto undefined para distinguir casos
) => {
  const plataformaDuplicada = plataformasExistentes.find(
    (plataforma) => plataforma === value
  );


  if (plataformaDuplicada) {
    setErrorMessage("Este juego ya existe en la plataforma seleccionada.");
    setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
    return;
  }

  setPlatform(value);

  const nuevoTitulo = `${limpiarTituloJuego(tituloJuego)} - ${value}`;

  try {
    if (collection === "Juegos" && tituloJuego !== nuevoTitulo) {
      // Actualizar siempre, excepto si `onAdded` es explícitamente false
      if (onAdded === undefined || onAdded === true) {
        await updateDocument("Juegos", juegoId, {
          plataforma: value,
          titulo: nuevoTitulo,
        });
      }
    }

    // Notificar cambio de plataforma y manejar cierre/avance
    onPlatformChange(value);
    if (isFromAddFicha === undefined) {
      onAvanzar();
    } else {
      onClose();
    }
  } catch (error) {
    console.error("Error al actualizar el documento:", error);
  }
};
