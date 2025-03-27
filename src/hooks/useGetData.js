import { useEffect, useState } from "react";
import { platformCollectionMap } from "../templates/helpers/constants/constants";
import { getDocuments, getDocumentsWithFilter } from "../api/supabase/cloud-supabase";

export function useGetData(platform, filters) {
  const targetCollection = platformCollectionMap[platform];
  const [gamesBDComplete, setGamesBDComplete] = useState([]);
  const [gamesBDByPlatform, setGamesBDByPlatform] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let datosGamesBDComplete = [];

        // ⚡ Solo consultar la API si no hay datos en localStorage
        if (targetCollection === "GamesBD") {
          const storedData = localStorage.getItem("gamesBD");
          if (storedData) {
            datosGamesBDComplete = JSON.parse(storedData);
          } else {
            datosGamesBDComplete = await getDocuments(targetCollection);
            localStorage.setItem("gamesBD", JSON.stringify(datosGamesBDComplete));
          }
          setGamesBDComplete(datosGamesBDComplete);
        }
  
        // Si hay filtros, obtener los datos filtrados
        if (filters && Object.keys(filters).length > 0) {
          const datosGamesBDByPlatform = await getDocumentsWithFilter(targetCollection, filters);
          setGamesBDByPlatform(datosGamesBDByPlatform);
        } else {
          setGamesBDByPlatform([]); // Si no hay filtros, resetea la lista filtrada
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [targetCollection]);
  
  
  return { gamesBDComplete, gamesBDByPlatform, error, isLoading };
}
