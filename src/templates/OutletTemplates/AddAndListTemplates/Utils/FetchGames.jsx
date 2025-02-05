import { useCallback } from 'react';
import { getDocuments } from '../../../../api/supabase/cloud-supabase';

export const fetchGames = (setJuegos, setIsJuegosLoaded, collection) => {
  return useCallback(async () => {
    try {
      const datosJuegos = await getDocuments(collection);
      setJuegos(datosJuegos);
      setIsJuegosLoaded(true);
    } catch (error) {
      console.error("Error al obtener juegos:", error);
    }
  }, [getDocuments, setJuegos, setIsJuegosLoaded]);
};
