import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { updateDocument } from "../../api/supabase/cloud-supabase"
import { supabase } from "../../api/supabase/supabase"
import { scrollToTop } from "../../templates/helpers/constants/constants"

export function useHandles(handleSubmit, setContenido, setFechaActualizacion, setEditingItem, setIsDisabled, isDisabled, setItemsToShow, itemsToShow, contenido, setSearchTerm){
  const [editNotaPanelOpen, setEditNotaPanelOpen] = useState(false)
  const [editPlatformPanelOpen, setEditPlatformPanelOpen] = useState(false)
  const [editEstadoPanelOpen, setEditEstadoPanelOpen] = useState(false)
  const [editEstadoPanelAddOpen, setEditEstadoPanelAddOpen] = useState(false)
  const [panelAddEstadoFichaOpen, setPanelAddEstadoFichaOpen] = useState(false)
  const [editRejugandoPanelOpen, setRejugandoPanelOpen] = useState(false)

  const [menuEditPanelOpen, setMenuEditPanelOpen] = useState(false)
  const [estado, setEstado] = useState("")
  const [notaJuego, setNotaJuego] = useState("")
  const [plataforma, setPlataforma] = useState("")
  const [rejugando, setRejugando] = useState("")
  const [fechaFinalizacion, setFechaFinalizacion] = useState(0)
  const [horasDuracion, setHorasDuracion] = useState(0)
  const [porcentajeCompletado, setPorcentajeCompletado] = useState(0)
  const [platino, setPlatino] = useState("")
  const [opinionPersonal, setOpinionPersonal] = useState("")
  const [platform, setPlatform] = useState('')
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [newTitulo, setNewTitulo] = useState(null)

  const [position, setPosition] = useState(0)
  const [error, setError] = useState(null)
  const { gameId, collection } = useParams()
  const [shouldFetchData, setShouldFetchData] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState('') // Aquí almacenamos el texto de las plataformas del juego

  const navigate = useNavigate() 

  // Handles de Guardar, editar y eliminar contenido
  const handleGuardarContenido = async (e) => {
    e.preventDefault()
    await handleSubmit(e)
    setContenido({}) 
    setFechaActualizacion("")
    setEditingItem(null) 
  }

  const handleEditarContenido = (item) => {
    setMenuEditPanelOpen(true)
    // Verificar si item tiene la propiedad idDoc
    if (!item.idDoc) {
      // Si no tiene la propiedad idDoc, asigna item.id a item.idDoc
      item.idDoc = item.id
    }
    setEditingItem(item) /
    setContenido({ ...item })
  }

  const handleEliminar = () => {
    setIsDisabled(!isDisabled)
  }
 
  // Handles de control de cantidad de juegos mostrados
  const handleShowMore = () => {
    setItemsToShow(prevItemsToShow => prevItemsToShow + 8)
  }

  const handleShowLess = () => {
    if (itemsToShow > 8) {
      setItemsToShow(prevItemsToShow => Math.max(prevItemsToShow - 8, 8)) 
    }  
  }

  const handleShowAll = (dataLength) => {
    setItemsToShow(dataLength) 
  }

  const handleShowInitial = () => {
    setItemsToShow(8) 
  }

  // Handles para mostrar la ficha en función de la tabla a la que accedas
  const handleTitleClick = (gameId) => {
    scrollToTop()
    navigate(`/game/${'Juegos'}/${gameId}`)
  }

  const handleInfoGameBD = (gameId) => {
    scrollToTop()
    navigate(`/game/${'GamesBD'}/${gameId}`)
  }


  // Handles de todos los cambios en los juegos (estado, nota, plataforma, rejugando, position, y resto de cosas de la ficha)
  const handleChange = (e) => {
    const { name, value } = e.target
    setContenido({
        ...contenido,
        [name]: value
    })
    // Si el nombre del campo es "estado", actualiza la fecha de actualización
    if (name === 'estado' || name ==='notaJuego') {
        // Obtener la fecha y hora actuales
        const currentDateTime = new Date()
        // Formatear la fecha a un string legible
        const formattedDateTime = currentDateTime.toISOString()

        // Establecer la fecha de actualización en el estado
        setFechaActualizacion(formattedDateTime)
    }
  }

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


  const handlePlatformChangeNewGame = (newPlatform) => {
    setPlatform(newPlatform)
  }

  const handleEstadoChangeNewGame = (newEstado) => {
    setEstado(newEstado)
  }

  const handleNewTitulo = (newTitulo) => {
    setNewTitulo(newTitulo) 
    setSearchTerm(newTitulo)
  }


  const handleNotaJuegoChange = async (nota) => {
    let nuevaNota = nota
    if (nuevaNota === '' || nuevaNota === '-') {
        nuevaNota = null
    } else {
        nuevaNota = parseFloat(nuevaNota)
        if (isNaN(nuevaNota)) {
            setError('La nota del juego debe ser un número válido')
            return
        }
    }

    setNotaJuego(nuevaNota)

    try {
        await updateDocument('Juegos', gameId, { notaJuego: nuevaNota
        })
    } catch (error) {
        setError(error)
    }
  }

  const handleRejugandoChange = async (rejugando) => {
    const rejugandoActualizado = rejugando
    setRejugando(rejugandoActualizado)
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

  const handlePositionNewGame = (position) => {
    setSelectedPosition(position)
  }

  const handleDownPosition = async (item, sortedData) => {
    const currentIndex = sortedData.findIndex(game => game.id === item.id)
    
    if (currentIndex < sortedData.length - 1) {
      const nextItem = sortedData[currentIndex + 1]
      
      const newPosition = nextItem.position
      const currentPosition = item.position

      await Promise.all([
        // Actualizar el juego actual con la nueva posición
        supabase.from('Juegos').update({ position: newPosition }).match({ id: item.id }),
        // Actualizar el juego siguiente con la posición actual
        supabase.from('Juegos').update({ position: currentPosition }).match({ id: nextItem.id }),
      ])

      handleRecargar()
    }
  }

  const handleUpPosition = async (item, sortedData) => {
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

  const handleFechaFinalizacionChange = async (fechaFinalizacion) => {
    let nuevaFechaFinalizacion = fechaFinalizacion
    if (nuevaFechaFinalizacion === '' || nuevaFechaFinalizacion === '-') {
      nuevaFechaFinalizacion = null // Puedes usar null si eso es adecuado para tu base de datos
    } else {
      nuevaFechaFinalizacion = parseFloat(nuevaFechaFinalizacion)
        if (isNaN(nuevaFechaFinalizacion)) {
            setError('La nota del juego debe ser un número válido')
            return
        }
    }

    setFechaFinalizacion(nuevaFechaFinalizacion)
    try {
        await updateDocument('Juegos', gameId, { fechaFinalizacion: nuevaFechaFinalizacion
        })
    } catch (error) {
        setError(error)
    }
  }


  const handleOpinionPersonalChange = async (opinionPersonal) => {
    const nuevaOpinionPersonal = opinionPersonal
    setOpinionPersonal(nuevaOpinionPersonal)

    try {
        await updateDocument('Juegos', gameId, { opinionPersonal: nuevaOpinionPersonal })
    } catch (error) {
        setError(error)
    }
  }

  const handleHorasDuracionChange = async (horasDuracion) => {
    const nuevaHorasDuracion = horasDuracion
    setHorasDuracion(nuevaHorasDuracion)

    try {
        await updateDocument('Juegos', gameId, { horasDuracion: nuevaHorasDuracion })
    } catch (error) {
        setError(error)
    }
  }

  const handlePorcentajeCompletadoChange = async (porcentajeCompletado) => {
    const nuevoPorcentajeCompletado = porcentajeCompletado
    setPorcentajeCompletado(nuevoPorcentajeCompletado)

    try {
        await updateDocument('Juegos', gameId, { porcentajeCompletado: nuevoPorcentajeCompletado })
    } catch (error) {
        setError(error)
    }
  }


  const handlePlatinoChange = async (platino) => {
    const nuevoPlatino = platino
    setPlatino(nuevoPlatino)

    try {
        await updateDocument('Juegos', gameId, { platino: nuevoPlatino })
    } catch (error) {
        setError(error)
    }
  }


  const handleScrollIndex = (idIndice) => {
    const editContentElement = document.getElementById(idIndice)
    if (editContentElement) {
      editContentElement.scrollIntoView({ behavior: "smooth" })
    }
  }


    // Handles de paneles de edición
    const handleOpenEditNotaPanel = () => {
      setEditNotaPanelOpen(true)
      setEditPlatformPanelOpen(false)
      setEditEstadoPanelOpen(false)
      setMenuEditPanelOpen(false)
    }
    
    const handleCloseEditNotaPanel = () => {
      setEditNotaPanelOpen(false)
    }   

    const handleOpenEditPlatformPanel = (plataformas) => {
        setSelectedPlatforms(plataformas) // Guardamos las plataformas del juego seleccionado
        setEditPlatformPanelOpen(true)
        setEditNotaPanelOpen(false)
        setEditEstadoPanelOpen(false)
        setMenuEditPanelOpen(false)
    }
    
    const handleCloseEditPlatformPanel = () => {
        setEditPlatformPanelOpen(false)
    }
     
  
  const handleOpenEditEstadoPanel = () => {
      setEditEstadoPanelOpen(true)
      setEditNotaPanelOpen(false)
      setEditPlatformPanelOpen(false)
      setMenuEditPanelOpen(false)
      setRejugandoPanelOpen(false)
    }
    
    const handleCloseEditEstadoPanel = () => {
      setEditEstadoPanelOpen(false)
    }
    
    const handleOpenRejugandoPanel = () => {
      setRejugandoPanelOpen(true)
      setEditNotaPanelOpen(false)
      setEditEstadoPanelOpen(false)
      setMenuEditPanelOpen(false)
      setEditPlatformPanelOpen(false)
    
    }
    
    const handleCloseRejugandoPanel = () => {
      setRejugandoPanelOpen(false)
    }
    
    const handleOpenMenuEditPanel = () => {
      setMenuEditPanelOpen(true)
      setEditNotaPanelOpen(false)
      setEditEstadoPanelOpen(false)
      setRejugandoPanelOpen(false)
      setEditPlatformPanelOpen(false)
    }
    
    const handleCloseMenuEditPanel = () => {
      setMenuEditPanelOpen(false)
    }

    return {
      // Handlers relacionados con acciones generales
      handleChange, handleDownPosition, handleEliminar, handleGuardarContenido, handleInfoGameBD, handleNewTitulo, handleNotaJuegoChange, handleOpenEditPlatformPanel, handleOpenEditEstadoPanel, handleOpenMenuEditPanel, handleOpenRejugandoPanel, handlePlatformChangeNewGame,
      handlePlatinoChange, handlePosition, handlePositionNewGame, handleScrollIndex, handleShowAll, handleShowInitial, handleShowLess, handleShowMore, handleTitleClick, handleUpPosition,
  
      // Handlers relacionados con cambios de propiedades específicas
      handleEditarContenido, handleEstadoChange, handleEstadoChangeNewGame, handleFechaFinalizacionChange, handleHorasDuracionChange, handleOpinionPersonalChange, handlePorcentajeCompletadoChange, handleRejugandoChange,
  
      // Handlers relacionados con el cierre de paneles
      handleCloseEditEstadoPanel, handleCloseEditNotaPanel, handleCloseEditPlatformPanel, handleCloseMenuEditPanel, handleCloseRejugandoPanel,
  
      // Propiedades de estado
      editEstadoPanelAddOpen, editEstadoPanelOpen, editNotaPanelOpen, editPlatformPanelOpen, editRejugandoPanelOpen, error, estado, fechaFinalizacion, horasDuracion, menuEditPanelOpen, notaJuego, opinionPersonal, panelAddEstadoFichaOpen, platform, platino, plataforma,
      porcentajeCompletado, position, rejugando, selectedPlatforms, shouldFetchData,
  
      // Métodos para actualizar estados
      setEditEstadoPanelAddOpen, setEditEstadoPanelOpen, setEditNotaPanelOpen, setEditPlatformPanelOpen, setError, setEstado, setFechaFinalizacion, setHorasDuracion, setMenuEditPanelOpen, setNotaJuego, setOpinionPersonal, setPanelAddEstadoFichaOpen,
      setPlatform, setPlataforma, setPlatino, setPorcentajeCompletado, setPosition, setRejugando, setRejugandoPanelOpen, setSelectedPlatforms, setShouldFetchData,
  };
  

    // return {        
    //     handleGuardarContenido, handleEliminar, handleShowMore, handleShowLess, handleShowAll, handleShowInitial, handleTitleClick, handleChange, handleEditarContenido, menuEditPanelOpen,  

    //     editNotaPanelOpen, editEstadoPanelOpen, editRejugandoPanelOpen, editEstadoPanelOpen, editEstadoPanelAddOpen, editPlatformPanelOpen,

    //     setEditPlatformPanelOpen, setEditEstadoPanelAddOpen, setEditEstadoPanelOpen, setEditNotaPanelOpen, setError, setEstado, setFechaFinalizacion, setHorasDuracion, setMenuEditPanelOpen, setNotaJuego, setOpinionPersonal,  setPanelAddEstadoFichaOpen, setPlataforma, setPlatform, setPlatino,setPorcentajeCompletado, setPosition, setRejugando, setRejugandoPanelOpen, setSelectedPlatforms, setShouldFetchData, 

    //     handleEstadoChange, handleNotaJuegoChange, handlePosition, handleRejugandoChange, estado, notaJuego, rejugando, position, error, 

    //     handleUpPosition, handleDownPosition, shouldFetchData, handleInfoGameBD,  panelAddEstadoFichaOpen, 
    //     selectedPlatforms,  plataforma, 

    //     handleFechaFinalizacionChange, fechaFinalizacion,
    //     handleOpinionPersonalChange, opinionPersonal,
    //     handleHorasDuracionChange, horasDuracion,
    //     handlePorcentajeCompletadoChange, porcentajeCompletado,
    //     handlePlatinoChange, platino,
    //     handleScrollIndex,

    //     handleOpenEditPlatformPanel, handleCloseMenuEditPanel, handleOpenMenuEditPanel, handleCloseRejugandoPanel, handleOpenRejugandoPanel, handleCloseEditEstadoPanel, handleOpenEditEstadoPanel, handleCloseEditPlatformPanel, handleOpenEditNotaPanel, handleCloseEditNotaPanel,

    //     handlePositionNewGame, handlePlatformChangeNewGame, platform,  handleEstadoChangeNewGame,

    //     handleNewTitulo
    // }
}