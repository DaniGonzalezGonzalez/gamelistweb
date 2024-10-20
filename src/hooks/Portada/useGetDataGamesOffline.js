import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getGamesOffline } from "../../api/supabase/cloud-supabase";

export function useGetDataGamesOffline(plataforma, limit) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [juegosPortada, setJuegosPortada] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                 {
                    const juegosCompletos = await getGamesOffline('GamesBD', plataforma, limit);
                    setJuegosPortada(juegosCompletos);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [plataforma, user.email]);

    return {
        juegosPortada,
        error,
        isLoading,
    };
}
