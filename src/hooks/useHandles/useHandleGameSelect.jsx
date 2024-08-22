import { useState } from "react";

export function useHandleGameSelect() {
    const [searchTerm, setSearchTerm] = useState('')
    const [imageUrl, setImageUrl] = useState("")
    const [platformImageUrl, setPlatformImageUrl] = useState("")
    const [plataforma, setPlataforma] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [notaMetacriticPrensa, setNotaMetacriticPrensa] = useState(0)
    const [notaMetacriticUsuarios, setNotaMetacriticUsuarios] = useState(0)
    const [tiempoMainStory, setTiempoMainStory] = useState(0)
    const [tiempoMainAndSides, setTiempoMainAndSides] = useState(0)
    const [tiempoCompletionist, setTiempoCompletionist] = useState(0)
    const [linkMetacritic, setLinkMetacritic] = useState("")
    const [linkHowLongToBeat, setLinkHowLongToBeat] = useState("")
    const [datosExtraJuego, setDatosExtraJuego] = useState("")
    const [genero, setGenero] = useState("")
    const [selectedTitle, setSelectedTitle] = useState(''); // Nuevo estado para el título exacto

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isTitleValid, setIsTitleValid] = useState(false)
    const [fechaActualizacion, setFechaActualizacion] = useState("") 

    const handleGameSelect = (titulo, imageUrl, platformImageUrl, plataforma, descripcion, notaMetacriticPrensa, notaMetacriticUsuarios, tiempoMainStory, tiempoMainAndSides, tiempoCompletionist, linkMetacritic, linkHowLongToBeat, datosExtraJuego, genero, imageUrl2, platformImageUrl2 ) => {
        setSearchTerm(titulo)
        setSelectedTitle(titulo); // Almacena el título exacto seleccionado
        setImageUrl(imageUrl)
        setPlatformImageUrl(platformImageUrl)
        if (!imageUrl || !platformImageUrl) {
          setImageUrl(imageUrl2)
          setPlatformImageUrl(platformImageUrl2)
        }
        setPlataforma(plataforma)
        setDescripcion(descripcion)
        setNotaMetacriticPrensa(notaMetacriticPrensa)
        setNotaMetacriticUsuarios(notaMetacriticUsuarios)
        setTiempoMainStory(tiempoMainStory)
        setTiempoMainAndSides(tiempoMainAndSides)
        setTiempoCompletionist(tiempoCompletionist)
        setLinkMetacritic(linkMetacritic)
        setLinkHowLongToBeat(linkHowLongToBeat)
        setDatosExtraJuego(datosExtraJuego)
        setGenero(genero)
    
        setIsDropdownOpen(false) // Cierra el desplegable al seleccionar un juego
        setIsTitleValid(true) // El título seleccionado es válido
    
          // Obtener la fecha y hora actuales
          const currentDate = new Date()
          const formattedDate = currentDate.toISOString() // Formatear la fecha a una cadena ISO
             // Establecer la fecha de actualización en el estado
        setFechaActualizacion(formattedDate)
      };
    
  return {
    handleGameSelect, searchTerm, setSearchTerm, imageUrl, platformImageUrl, plataforma, descripcion, notaMetacriticPrensa, notaMetacriticUsuarios, tiempoMainStory, tiempoMainAndSides, tiempoCompletionist, linkMetacritic, linkHowLongToBeat, datosExtraJuego, genero, isDropdownOpen, setIsDropdownOpen, isTitleValid, setIsTitleValid, fechaActualizacion, selectedTitle

  }
}
