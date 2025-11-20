import { addDocument } from "../../../../../../api/supabase/cloud-supabase";
import { getLastId } from "../../Helpers/getLastId";

export const addGameFicha = async (juego, user, platformDefault, platform, estadoSeleccionado, registeredGames, newPosition, setIsLoading, setError, setSuccess) => {
  const idGameBD = juego.id

  if (!estadoSeleccionado) {
    return;
  }

  setIsLoading(true);

  try {
    // Verifica que el juego tenga título
    if (!juego.titulo) throw new Error('El campo título no puede estar vacío');

    const juegoCompleto = (juego.titulo + ' - ' + platformDefault).trim();

    const juegoExistente = registeredGames.find(item => {
      if (!item || !item.titulo) {
        console.error("Error: item o item.titulo son undefined", { item });
        return false;
      }    
      return item.titulo === juegoCompleto && item.infouser === user.email;
    });

    if (juegoExistente) {            
      if (juegoExistente.titulo === juegoCompleto) {
        throw new Error(`${juego.titulo} ya existe en tu colección de juegos`);
      }
    }

    // Obtenemos el último id y asignamos id + 1
    const lastId = await getLastId();
    juego.id = lastId + 1;   

    if (platformDefault && platformDefault !== 'null'){
      juego.titulo = juego.titulo + ' - ' + platformDefault;
    } else {
      juego.titulo = juego.titulo + ' - ' + platform;   
    }

    juego.infouser = user.email;
    juego.estado = estadoSeleccionado;     
    juego.position = newPosition; 
    juego.gamebd_id = idGameBD

    if (platformDefault && platformDefault !== 'null'){
      juego.plataforma = platformDefault;
    } else {
      juego.plataforma = platform;
    }

    juego.tipoContenido = 'Juegos';

    // Lógica para añadir el juego a la base de datos (Supabase o lo que uses)
    await addDocument('Juegos', juego);
    setSuccess(`El juego ${juego.titulo} ha sido añadido correctamente`);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};
