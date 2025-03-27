import { useState, useEffect } from "react";
import { getDocument } from "../../../../api/supabase/cloud-supabase";
import { fetchGamesFromRawg } from "../../../../api/supabase/rawgApi";
import { cleanTitle } from "../../../helpers/constants/constants";

export const useFetchDataGameDetail = (collection, gameId, platformSelected, notaJuego, setNotaJuego, estado, setEstado, opinionPersonal, setOpinionPersonal, rejugando, setRejugando, fechaFinalizacion, setFechaFinalizacion, horasDuracion, setHorasDuracion, porcentajeCompletado, setPorcentajeCompletado, platino, setPlatino, plataforma, setPlataforma ) => {
    const [juego, setJuego] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [gameFromRAWG, setGameFromRAWG] = useState([]);
    useEffect(() => {
        if (gameId) {
            const fetchData = async () => {
                try {
                    const datosJuego = await getDocument(collection, gameId)
                    setJuego(datosJuego)
                    setEstado(datosJuego.estado)
                    setNotaJuego(datosJuego.notaJuego)
                    setRejugando(datosJuego.rejugando)
                    setFechaFinalizacion(datosJuego.fechaFinalizacion)
                    setOpinionPersonal(datosJuego.opinionPersonal)
                    setHorasDuracion(datosJuego.horasDuracion)
                    setPorcentajeCompletado(datosJuego.porcentajeCompletado)
                    setPlatino(datosJuego.platino)
                    setPlataforma(datosJuego.plataforma) 
                } catch (error) {
                    setError(error)
                } finally {
                    setIsLoading(false)
                }
            };
            fetchData()
        }
    }, [gameId, platformSelected, collection])



    // Efecto para obtener datos de RAWG solo cuando el título del juego se haya actualizado
    useEffect(() => {
        if (juego?.titulo) {
            const fetchGameFromRAWG = async () => {
                try {
                    const gameFromRAWGData = await fetchGamesFromRawg(cleanTitle(juego?.titulo));
                    setGameFromRAWG(gameFromRAWGData);
                } catch (error) {
                    console.error('Error al obtener datos de RAWG:', error);
                    setError(error);
                }
            };
            fetchGameFromRAWG();
        }
    }, [juego?.titulo]); // Solo depende del título del juego


    return {
        juego,
        estado,
        notaJuego,
        rejugando,
        fechaFinalizacion,
        opinionPersonal,
        horasDuracion,
        porcentajeCompletado,
        platino,
        plataforma,
        error,
        isLoading,
        gameFromRAWG
    }
}