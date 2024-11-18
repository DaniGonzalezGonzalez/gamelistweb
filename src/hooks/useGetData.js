import { useEffect, useState } from "react"
import { platformCollectionMap } from "../templates/helpers/constants/constants"
import { getDocuments, getDocumentsWithFilter } from "../api/supabase/cloud-supabase"

export function useGetData(platform, filters) {
  const targetCollection = platformCollectionMap[platform]
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [gamesBDComplete, setGamesBDComplete] = useState([])
  const [gamesBDByPlatform, setGamesBDByPlatform] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar una sola solicitud para obtener datos de las colecciones GamesBD y Juegos
        const datosGamesBDComplete = await getDocuments(targetCollection)
        const datosGamesBDByPlatform = await getDocumentsWithFilter(targetCollection, filters)
        
        if (!datosGamesBDComplete.length) throw new Error('No hay juegos en la base de datos')
        if (!datosGamesBDByPlatform.length) throw new Error('No hay juegos en la base de datos')
        
        // Actualizar los estados con los datos obtenidos
        setGamesBDComplete(datosGamesBDComplete)
        setGamesBDByPlatform(datosGamesBDByPlatform)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [targetCollection])

  return {
    gamesBDComplete,
    gamesBDByPlatform,
    error,
    isLoading
  }
}
