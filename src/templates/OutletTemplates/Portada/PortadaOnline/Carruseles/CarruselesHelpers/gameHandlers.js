export const handleGameClick = (
    setSelectedGame, 
    handleGameSelect, 
    setEditPlatformPanelOpen, 
    game
  ) => {
    setSelectedGame(game);
    handleGameSelect(
      game.titulo,
      game.url[0],
      game.plataforma,
      game.descripcion,
      game.notaMetacriticPrensa,
      game.notaMetacriticUsuarios,
      game.tiempoMainStory,
      game.tiempoMainAndSides,
      game.tiempoCompletionist,
      game.linkMetacritic,
      game.linkHowLongToBeat,
      game.datosExtraJuego,
      game.genero,
      game.lanzamiento
    );
  
    if (setEditPlatformPanelOpen) {
      setEditPlatformPanelOpen(true);
    }
  };
  