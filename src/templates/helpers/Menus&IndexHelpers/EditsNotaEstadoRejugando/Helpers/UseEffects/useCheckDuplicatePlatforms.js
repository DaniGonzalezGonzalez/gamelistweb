import { useEffect } from 'react'
import { getDocumentsWithFilter } from '../../../../../../api/supabase/cloud-supabase';

export const useCheckDuplicatePlatforms = ({ tituloJuego, platform, user, loading, plataformasExistentes, setPlataformasExistentes, errorMessage, setErrorMessage, limpiarTituloJuego, platformsList }) => {

  useEffect(() => {
    const checkDuplicatePlatform = async () => {
      const tituloLimpio = limpiarTituloJuego(tituloJuego).trim()
      try {
        // Cambia el filtro para buscar títulos que contengan el título limpio
        const filters = [
          { field: 'titulo', value: `%${tituloLimpio}%` }, // Utiliza % para incluir coincidencias
          { field: 'infouser', value: user.email },
        ];
        const response = await getDocumentsWithFilter('Juegos', filters)

        // Verificar si hay juegos con el mismo título y usuario
        const plataformasExistentes = response.map((game) => game.plataforma)
        setPlataformasExistentes(plataformasExistentes)

        // Comprobar si la plataforma que se está añadiendo ya existe
        if (plataformasExistentes.includes(platform)) {
          setErrorMessage('Este juego ya está en la plataforma seleccionada.')
        } else {
          setErrorMessage('') // Limpiar el mensaje de error si no hay duplicado
        }
      } catch (error) {
        console.error('Error al verificar la plataforma duplicada:', error)
      }
    };

    if (platform && !loading) {
      checkDuplicatePlatform()
    }
  }, [platform, tituloJuego, loading, user, platformsList])

  return { plataformasExistentes, errorMessage }
}