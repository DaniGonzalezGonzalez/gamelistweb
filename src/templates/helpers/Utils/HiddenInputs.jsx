// HiddenInputs.js
export function HiddenInputs({
    imageUrl, 
    plataforma, 
    descripcion, 
    notaMetacriticPrensa, 
    notaMetacriticUsuarios, 
    tiempoMainStory, 
    tiempoMainAndSides, 
    tiempoCompletionist, 
    linkMetacritic, 
    linkHowLongToBeat, 
    datosExtraJuego, 
    genero, 
    lanzamiento,
    fechaFinalizacion, 
    horasDuracion, 
    porcentajeCompletado, 
    platino, 
    opinionPersonal,
    fechaActualizacion, 
    estado, 
    notaJuego, 
    user,
    position
  }) 
  {
    
    return (
      <>
        <input type="hidden" name="imageUrl" value={imageUrl} readOnly />
        <input type="hidden" name="plataforma" value={plataforma} readOnly />
        <input type="hidden" name="descripcion" value={descripcion} readOnly />
        <input type="hidden" name="notaMetacriticPrensa" value={notaMetacriticPrensa} readOnly />
        <input type="hidden" name="notaMetacriticUsuarios" value={notaMetacriticUsuarios} readOnly />
        <input type="hidden" name="tiempoMainStory" value={tiempoMainStory} readOnly />
        <input type="hidden" name="tiempoMainAndSides" value={tiempoMainAndSides} readOnly />
        <input type="hidden" name="tiempoCompletionist" value={tiempoCompletionist} readOnly />
        <input type="hidden" name="linkMetacritic" value={linkMetacritic} readOnly />
        <input type="hidden" name="linkHowLongToBeat" value={linkHowLongToBeat} readOnly />
        <input type="hidden" name="datosExtraJuego" value={datosExtraJuego} readOnly />
        <input type="hidden" name="genero" value={genero} readOnly />
        <input type="hidden" name="lanzamiento" value={lanzamiento} readOnly />
        <input type="hidden" name="fechaFinalizacion" value={fechaFinalizacion} readOnly />
        <input type="hidden" name="horasDuracion" value={horasDuracion} readOnly />
        <input type="hidden" name="porcentajeCompletado" value={porcentajeCompletado} readOnly />
        <input type="hidden" name="platino" value={platino} readOnly />
        <input type="hidden" name="opinionPersonal" value={opinionPersonal} readOnly />
        <input type="hidden" name="fechaActualizacion" value={fechaActualizacion} />
        <input type="hidden" name="estado" value={estado} />
        <input type="hidden" name="notaJuego" value={notaJuego} />
        <input type="hidden" name="position" value={position} />
        <textarea hidden name="infouser" value={user.email} readOnly></textarea>
      </>
    )
  }
  