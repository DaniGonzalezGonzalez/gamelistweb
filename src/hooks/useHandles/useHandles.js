import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateDocument } from "../../api/supabase/cloud-supabase";
import { supabase } from "../../api/supabase/supabase";
import { scrollToTop } from "../../templates/helpers/no-components/constants";

export function useHandles(handleSubmit, setContenido, setFechaActualizacion, setEditingItem, setIsDisabled, isDisabled, setItemsToShow, itemsToShow, contenido){
  const [editNotaPanelOpen, setEditNotaPanelOpen] = useState(false);
  const [editPlatformPanelOpen, setEditPlatformPanelOpen] = useState(false);
  const [editEstadoPanelOpen, setEditEstadoPanelOpen] = useState(false);
  const [editEstadoPanelAddOpen, setEditEstadoPanelAddOpen] = useState(false)
  const [panelAddEstadoFichaOpen, setPanelAddEstadoFichaOpen] = useState(false);
  const [editRejugandoPanelOpen, setRejugandoPanelOpen] = useState(false);

  const [menuEditPanelOpen, setMenuEditPanelOpen] = useState(false);
  const [estado, setEstado] = useState("")
  const [notaJuego, setNotaJuego] = useState("")
  const [plataforma, setPlataforma] = useState("")
  const [rejugando, setRejugando] = useState("")
  const [position, setPosition] = useState(0)
  const [error, setError] = useState(null)
  const { gameId, collection } = useParams()
  const [shouldFetchData, setShouldFetchData] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState(''); // Aquí almacenamos el texto de las plataformas del juego

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

  const handleInfoGameBD = (gameId) => {
    scrollToTop()
    navigate(`/game/${'GamesBD'}/${gameId}`)
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
  setMenuEditPanelOpen(true);
  // Verificar si item tiene la propiedad idDoc
  if (!item.idDoc) {
    // Si no tiene la propiedad idDoc, asigna item.id a item.idDoc
    item.idDoc = item.id;
  }
  setEditingItem(item); // Establecer el elemento en edición
  setContenido({ ...item });
}

const handleOpenEditNotaPanel = () => {
  setEditNotaPanelOpen(true);
  setEditPlatformPanelOpen(false)
  setEditEstadoPanelOpen(false);
  setMenuEditPanelOpen(false);
};

const handleCloseEditNotaPanel = () => {
  setEditNotaPanelOpen(false);
};


const handleOpenEditPlatformPanel = (plataformas) => {
  setSelectedPlatforms(plataformas); // Guardamos las plataformas del juego seleccionado
  setEditPlatformPanelOpen(true)
  setEditNotaPanelOpen(false);
  setEditEstadoPanelOpen(false);
  setMenuEditPanelOpen(false);
};

const handleCloseEditPlatformPanel = () => {
  setEditPlatformPanelOpen(false);
};



const handleOpenEditEstadoPanel = () => {
  setEditEstadoPanelOpen(true);
  setEditNotaPanelOpen(false);
  setEditPlatformPanelOpen(false)
  setMenuEditPanelOpen(false);
  setRejugandoPanelOpen(false);
};

const handleCloseEditEstadoPanel = () => {
  setEditEstadoPanelOpen(false);
};

const handleOpenRejugandoPanel = () => {
  setRejugandoPanelOpen(true);
  setEditNotaPanelOpen(false);
  setEditEstadoPanelOpen(false);
  setMenuEditPanelOpen(false);
  setEditPlatformPanelOpen(false)

};

const handleCloseRejugandoPanel = () => {
  setRejugandoPanelOpen(false);
};

const handleOpenMenuEditPanel = () => {
  setMenuEditPanelOpen(true);
  setEditNotaPanelOpen(false);
  setEditEstadoPanelOpen(false);
  setRejugandoPanelOpen(false);
  setEditPlatformPanelOpen(false)
};

const handleCloseMenuEditPanel = () => {
  setMenuEditPanelOpen(false);
};




const handleEstadoChange = async (estado) => {
  const nuevoEstado = estado
  setEstado(nuevoEstado)

  const currentDate = new Date()
  const formattedDate = currentDate.toISOString() 

  try {
      await updateDocument('Juegos', gameId, { estado: nuevoEstado, fechaActualizacion: formattedDate })
  } catch (error) {
      setError(error)
  }
}

const handlePosition = async (position) => {
 const nuevaPosition = position
  setPosition(nuevaPosition)

  const currentDate = new Date()
  const formattedDate = currentDate.toISOString() 

  try {
      await updateDocument('Juegos', gameId, { position: nuevaPosition, fechaActualizacion: formattedDate })
  } catch (error) {
      setError(error)
  }
}


const handleNotaJuegoChange = async (nota) => {
  let nuevaNota = nota
  // Validar y convertir notaJuego
  if (nuevaNota === '' || nuevaNota === '-') {
      nuevaNota = null // Puedes usar null si eso es adecuado para tu base de datos
  } else {
      nuevaNota = parseFloat(nuevaNota)
      if (isNaN(nuevaNota)) {
          setError('La nota del juego debe ser un número válido')
          return
      }
  }

  setNotaJuego(nuevaNota)
  const currentDate = new Date()
  const formattedDate = currentDate.toISOString()

  try {
      await updateDocument('Juegos', gameId, { notaJuego: nuevaNota, fechaActualizacion: formattedDate })
  } catch (error) {
      setError(error)
  }
}

const handleRejugandoChange = async (rejugando) => {
  const rejugandoActualizado = rejugando;
  setRejugando(rejugandoActualizado);
  const currentDate = new Date()
  const formattedDate = currentDate.toISOString() 

  try {
      await updateDocument('Juegos', gameId, { rejugando: rejugandoActualizado, fechaActualizacion: formattedDate })
  } catch (error) {
      setError(error)
  }
}

const handleRecargar = (fechaGuardada, fechaActualizacion) => {
  setShouldFetchData(true)
  if (fechaActualizacion==='') {
    setFechaActualizacion(fechaGuardada)
  }
}

const handleDownPosition = async (item, sortedData) => {
  // Encuentra el índice del juego en el array sortedData
  const currentIndex = sortedData.findIndex(game => game.id === item.id);
  
  // Asegúrate de que no estás en la última posición
  if (currentIndex < sortedData.length - 1) {
    const nextItem = sortedData[currentIndex + 1]
    
    // Intercambiar las posiciones
    const newPosition = nextItem.position;
    const currentPosition = item.position

    // Actualizar las posiciones
    await Promise.all([
      // Actualizar el juego actual con la nueva posición
      supabase.from('Juegos').update({ position: newPosition }).match({ id: item.id }),

      // Actualizar el juego siguiente con la posición actual
      supabase.from('Juegos').update({ position: currentPosition }).match({ id: nextItem.id }),
    ])

    handleRecargar()
  }
};

const handleUpPosition = async (item, sortedData) => {
  // Encuentra el índice del juego en el array sortedData
  const currentIndex = sortedData.findIndex(game => game.id === item.id)
  
  // Asegúrate de que no estás en la primera posición
  if (currentIndex > 0) {
    const previousItem = sortedData[currentIndex - 1]
    
    // Intercambiar las posiciones
    const newPosition = previousItem.position
    const currentPosition = item.position

    // Actualizar las posiciones
    await Promise.all([
      // Actualizar el juego actual con la nueva posición
      supabase.from('Juegos').update({ position: newPosition }).match({ id: item.id }),  
      // Actualizar el juego anterior con la posición actual
      supabase.from('Juegos').update({ position: currentPosition }).match({ id: previousItem.id }),
    ])

    handleRecargar()
  }
}










    return {        
        handleGuardarContenido, handleEliminar, handleShowMore, handleShowLess, handleShowAll, handleShowInitial, handleTitleClick, handleChange, handleEditarContenido, handleOpenEditNotaPanel, handleOpenEditEstadoPanel, handleCloseEditNotaPanel, handleCloseEditEstadoPanel, editNotaPanelOpen, editEstadoPanelOpen, setEditNotaPanelOpen, menuEditPanelOpen, handleOpenRejugandoPanel, editRejugandoPanelOpen, handleCloseRejugandoPanel, editEstadoPanelOpen, setEditEstadoPanelOpen,
        
        handleEstadoChange, handleNotaJuegoChange, handlePosition, handleRejugandoChange, estado, notaJuego, rejugando, position, setEstado, setNotaJuego, setPosition, setRejugando, error, setError,

        handleUpPosition, handleDownPosition, shouldFetchData, setShouldFetchData, handleInfoGameBD, editEstadoPanelAddOpen, setEditEstadoPanelAddOpen, panelAddEstadoFichaOpen, setPanelAddEstadoFichaOpen, editPlatformPanelOpen, setEditPlatformPanelOpen, 
        handleOpenEditPlatformPanel, handleCloseEditPlatformPanel, selectedPlatforms, setSelectedPlatforms, plataforma, setPlataforma
    }
}