import { useEffect, useState } from "react";
import { getGameByTitle } from "../../../../../../api/supabase/cloud-supabase";

export const useEffectFetchDataPlatform = (tituloJuego, setPlatform, setPlatformsList, setLoading, limpiarTituloJuego)  => {
    useEffect(() => {
      const fetchGameData = async () => {
        const tituloLimpio = limpiarTituloJuego(tituloJuego);
        if (tituloLimpio) {  
              try {
                const result = await getGameByTitle(tituloLimpio, 'GamesBD', 1);
                if (result && result.length > 0) {
                  const textoPlano = result[0].plataforma; // Obtén la plataforma del resultado
                  setPlatform(textoPlano); // Establece la plataforma
                  setPlatformsList(textoPlano.split(' - ')); // Establece la lista de plataformas en el estado
                } else {
                  console.log('No se encontró el juego en GamesBD');
                }
              } catch (error) {
                console.error('Error al obtener el juego:', error);
              } finally {
                setLoading(false); // Termina la carga después de intentar obtener datos
              }
            } else {
              setLoading(false); // Termina la carga si tituloLimpio está vacío
            }
          }

        fetchGameData();
    }, [tituloJuego, setPlatform, setPlatformsList, setLoading]);
  };