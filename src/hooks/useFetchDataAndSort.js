import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { getDocumentsWithFilter } from "../api/supabase/cloud-supabase"

export function useFetchDataAndSort(estadoSingularMayusculas) {
  const [dataBD, setDataBD] = useState([])
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('position')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsToShow, setItemsToShow] = useState(10)
  const [noGamesLoaded, setNoGamesLoaded] = useState(false)

  const { user } = useContext(UserContext)

  const fetchData = async () => {
    try {
      const filters = [
        { field: 'estado', value: estadoSingularMayusculas },
        { field: 'infouser', value: user.email },
      ]
      const response = await getDocumentsWithFilter('Juegos', filters)
      const datosPrefiltro = response
      setDataBD(datosPrefiltro)
        if (response.length === 0) {
          setNoGamesLoaded(true)
        } else {
          setNoGamesLoaded(false)
        }
    } catch (error) {
      console.error('Error al cargar los datos: ', error)
      setError("Error al cargar los datos")
    }
  }

  const sortedData = dataBD
  .filter(item => item.notaJuego !== undefined)
  .filter((item) => item.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((b, a) => {
    // Ordenar por el criterio seleccionado
    if (sortBy === 'titulo') {
      return sortDirection === 'asc' ? b.titulo.localeCompare(a.titulo) : a.titulo.localeCompare(b.titulo)
    } else if (sortBy === 'plataforma') {
      return sortDirection === 'asc' ? b.plataforma.localeCompare(a.plataforma) : a.plataforma.localeCompare(b.plataforma)
    } else if (sortBy === 'notaJuego') {
      return sortDirection === 'asc' ? parseFloat(a.notaJuego) - parseFloat(b.notaJuego) : parseFloat(b.notaJuego) - parseFloat(a.notaJuego)
    } else if (sortBy === 'position') {
      // Solo en "En lista" y "Otra vez" se ordena ascendente, en los demás estados es descendente
      if (estadoSingularMayusculas === 'Próximos' || estadoSingularMayusculas === 'Otra vez') {
        return sortDirection === 'asc' ? b.position - a.position : a.position - b.position
      } else {
        // En todos los demás casos, por defecto descendente
        return sortDirection === 'asc' ? a.position - b.position : b.position - a.position
      }
    } else {
      // Criterios alternativos que no sean "position"
      return sortDirection === 'asc' ? b[sortBy].localeCompare(a[sortBy]) : a[sortBy].localeCompare(b[sortBy])
    }
  })
  .filter((item, index) => index < itemsToShow)


  return {     
    fetchData,
    dataBD,
    error,
    user,
    sortedData,
    setSearchTerm,
    setSortBy,
    setSortDirection,
    setItemsToShow,
    itemsToShow,
    searchTerm,
    sortBy,
    noGamesLoaded    
  }
}
