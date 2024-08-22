import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../templates/helpers/no-components/constants";

export function useHandles(handleSubmit, setContenido, setFechaActualizacion, setEditingItem, setIsDisabled, isDisabled, setItemsToShow, itemsToShow, contenido){
  const navigate = useNavigate() 

  const handleGuardarContenido = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    setContenido({}) // Esto podría necesitar ser ajustado dependiendo de la lógica de tu aplicación
    setFechaActualizacion("")
    setEditingItem(null) // Establecer el elemento en edición
  }

  const handleEliminar = () => {
    setIsDisabled(!isDisabled)
  }
 
  const handleShowMore = () => {
    setItemsToShow(prevItemsToShow => prevItemsToShow + 8) // Añadir 2 elementos adicionales cada vez que se presiona
  }
  const handleShowLess = () => {
    if (itemsToShow > 8) {
      setItemsToShow(prevItemsToShow => Math.max(prevItemsToShow - 8, 8)) // Quitar 8 elementos adicionales o dejar al menos 1
    }  
  }

  const handleShowAll = (dataLength) => {
    setItemsToShow(dataLength); // Mostrar todos los elementos
  };

  const handleShowInitial = () => {
    setItemsToShow(8); // Mostrar solo los primeros 8 elementos
  };

  const handleTitleClick = (gameId) => {
    scrollToTop()
    navigate(`/game/${'Juegos'}/${gameId}`)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContenido({
        ...contenido,
        [name]: value
    });
    // Si el nombre del campo es "estado", actualiza la fecha de actualización
    if (name === 'estado' || name ==='notaJuego') {
        // Obtener la fecha y hora actuales
        const currentDateTime = new Date();
        // Formatear la fecha a un string legible
        const formattedDateTime = currentDateTime.toISOString();

        // Establecer la fecha de actualización en el estado
        setFechaActualizacion(formattedDateTime);
    }
}

const handleEditarContenido = (item) => {
  // Verificar si item tiene la propiedad idDoc
  if (!item.idDoc) {
    // Si no tiene la propiedad idDoc, asigna item.id a item.idDoc
    item.idDoc = item.id;
  }
  setEditingItem(item); // Establecer el elemento en edición
  setContenido({ ...item });
}


    return {        
        handleGuardarContenido, handleEliminar, handleShowMore, handleShowLess, handleShowAll, handleShowInitial, handleTitleClick, handleChange, handleEditarContenido
    }
}