import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocumentsWithFilter } from '../../../../api/supabase/cloud-supabase';
import { scrollToTop } from '../../../helpers/constants/constants';

export const useDataGameListComplete = ({dataBD, setDataBD, setError, setNoGamesLoaded, sortBy, sortDirection, user, itemsToShow, setItemsToShow, searchTerm }) => {
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const filters = [
        { field: 'infouser', value: user.email },
      ];
      const datos = await getDocumentsWithFilter('Juegos', filters)
      setDataBD(datos)
      if (datos.length === 0) {
        setNoGamesLoaded(true)
      } else {
        setNoGamesLoaded(false)
      }
    } catch (error) {
      setError("Error al cargar los datos")
    }
  }  

  const preSortedData = useMemo(() => {
    return dataBD
      .sort((a, b) => {
        if (sortBy === 'fechaActualizacion') {
          return sortDirection === 'asc'
            ? b.fechaActualizacion.localeCompare(a.fechaActualizacion)
            : a.fechaActualizacion.localeCompare(b.fechaActualizacion);
        } else if (sortBy === 'plataforma') {
          return sortDirection === 'asc'
            ? a.plataforma.localeCompare(b.plataforma)
            : b.plataforma.localeCompare(a.plataforma);
        } else if (sortBy === 'notaJuego') {
          return sortDirection === 'asc'
            ? parseFloat(a.notaJuego) - parseFloat(b.notaJuego)
            : parseFloat(b.notaJuego) - parseFloat(a.notaJuego);
        } else {
          return sortDirection === 'asc'
            ? a[sortBy].localeCompare(b[sortBy])
            : b[sortBy].localeCompare(a[sortBy]);
        }
      })
      .filter(
        (item) =>
          (item.estado === 'Jugando' ||
            item.estado === 'Proximo' ||
            item.estado === 'Recién terminado' ||
            item.estado === 'Próximos' ||
            item.estado === 'Terminado' ||
            item.estado === 'Completando' ||
            item.estado === 'Lista de deseos' ||
            item.estado === 'Otra vez' ||
            item.estado === 'Pausado' ||
            item.estado === 'Abandonado') &&
          item.infouser === user.email // Usando directamente user.email
      );
  }, [dataBD, sortBy, sortDirection, user]);

  const sortedData = useMemo(() => {
    return preSortedData
      .filter((item, index) => index < itemsToShow) // Controlar cuántos elementos mostrar
      .filter((item) => item.titulo.toLowerCase().includes(searchTerm.toLowerCase())); // Filtrar por término de búsqueda
  }, [preSortedData, itemsToShow, searchTerm]);

  const handleShowMore = () => {
    setItemsToShow(prevItemsToShow => prevItemsToShow + 8) // Añadir 2 elementos adicionales cada vez que se presiona
  }

  const handleShowLess = () => {
    if (itemsToShow > 8) {
      setItemsToShow(prevItemsToShow => Math.max(prevItemsToShow - 8, 8)) // Quitar 8 elementos adicionales o dejar al menos 1
    }  
  }

  const handleTitleClick = (gameId) => {
    scrollToTop()
    navigate(`/game/${'Juegos'}/${gameId}`)
  }

  return { preSortedData, sortedData, handleShowMore, handleShowLess, handleTitleClick, fetchData } // Retornamos solo los datos ordenados y filtrados
}