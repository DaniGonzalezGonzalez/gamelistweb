import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useHandles } from "../../../../hooks/useHandles/useHandles"

export function useHandlesGameDetail(gameId){
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('')
    const [platformSelected, setPlatformSelected] = useState('')
    const savedPreviousUrl = sessionStorage.getItem('previousUrl')
    const cleanedPlatform = decodeURIComponent(savedPreviousUrl)

    const navigate = useNavigate()

    const { panelAddEstadoFichaOpen, setPanelAddEstadoFichaOpen, editPlatformPanelOpen, setEditPlatformPanelOpen, setFechaFinalizacion, setOpinionPersonal, setHorasDuracion, setPorcentajeCompletado, setPlatino, setSelectedPlatforms, setEditNotaPanelOpen, setEditEstadoPanelOpen, setMenuEditPanelOpen, setRejugandoPanelOpen, editEstadoPanelOpen, editRejugandoPanelOpen, editNotaPanelOpen } = useHandles(gameId)
    
    const handleAvanzar = () => {
        setPanelAddEstadoFichaOpen(false)
        navigate(-1)
    }

    const handleHorasDuracion = (nuevaHorasDuracion) => {
        setHorasDuracion(nuevaHorasDuracion)
    }
        
    const handleEditEstado = () => {
        setPanelAddEstadoFichaOpen(true)
        setEditPlatformPanelOpen(false)
    }

    const handleEstadoSeleccionado = (newEstado) => {
        setEstadoSeleccionado(newEstado)
    }

    const handleFechaGuardada = (nuevaFecha) => {
        setFechaFinalizacion(nuevaFecha)
    }
    
    const handleOpenPanel = () => {
        if (cleanedPlatform==='null') {
            setEditPlatformPanelOpen(true);
        } else {
            setPanelAddEstadoFichaOpen(true)
            setEditPlatformPanelOpen(false)
        }
    }

    const handleOpinionPersonal = (nuevaOpinionPersonal) => {
        setOpinionPersonal(nuevaOpinionPersonal)
    }

    const handlePlatformChange = (newPlatform) => {
        setPlatformSelected(newPlatform)
    }

    const handlePlatino = (nuevoPlatino) => {
        setPlatino(nuevoPlatino)
    }

    const handlePorcentajeCompletado = (nuevoPorcentajeCompletado) => {
        setPorcentajeCompletado(nuevoPorcentajeCompletado)
    }

    // Handles de paneles de edición de nota, estado y rejugando
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
      
      


      return {        
        handleAvanzar, handleEditEstado, handleEstadoSeleccionado, handleFechaGuardada, handleHorasDuracion, handleOpenPanel, handleOpinionPersonal, handlePlatformChange, handlePlatino, handlePorcentajeCompletado, 
        
        platformSelected, editPlatformPanelOpen, panelAddEstadoFichaOpen, editEstadoPanelOpen, editRejugandoPanelOpen, editNotaPanelOpen,

        handleOpenEditPlatformPanel, handleCloseMenuEditPanel, handleOpenMenuEditPanel, handleCloseRejugandoPanel, handleOpenRejugandoPanel, handleCloseEditEstadoPanel, handleOpenEditEstadoPanel, handleCloseEditPlatformPanel, handleOpenEditNotaPanel, handleCloseEditNotaPanel
      }
  }