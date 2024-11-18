import { useEffect } from 'react';
import { getDocumentsWithFilter } from '../../../../../../api/supabase/cloud-supabase';

export const useFetchInitialData = (user, setRegisteredGames, setNoGamesLoaded, setError) => {
    const fetchInitialData = async () => {
        try {
            const filters = [
                { field: 'infouser', value: user.email },
            ];
            const datos = await getDocumentsWithFilter('Juegos', filters);
            setRegisteredGames(datos);
            setNoGamesLoaded(datos.length === 0);
        } catch (error) {
            setError("Error al cargar los datos");
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []); // Ejecuta la carga inicial al montar el componente
};

