import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getRecentGamesByState } from "../../api/supabase/cloud-supabase";

export function useGetDataPortadaPorEstadoOffline(estado) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [juegosPortada, setJuegosPortada] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                 {
                    const juegosCompletos = await getRecentGamesByState('Juegos', estado, import.meta.env.VITE_ADMIN_EMAIL);
                    setJuegosPortada(juegosCompletos);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [estado, user.email]);

    return {
        juegosPortada,
        error,
        isLoading,
    };
}
