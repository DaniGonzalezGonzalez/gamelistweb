import { useState } from "react";

export function useHandleGameSelect() {
    const [searchTerm, setSearchTerm] = useState('')
    const [imageUrl, setImageUrl] = useState("")
    // const [platformImageUrl, setPlatformImageUrl] = useState("")
    const [plataforma, setPlataforma] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [notaMetacriticPrensa, setNotaMetacriticPrensa] = useState(0)
    const [notaMetacriticUsuarios, setNotaMetacriticUsuarios] = useState(0)
    const [tiempoMainStory, setTiempoMainStory] = useState(0)
    const [tiempoMainAndSides, setTiempoMainAndSides] = useState(0)
    const [tiempoCompletionist, setTiempoCompletionist] = useState(0)
    const [linkMetacritic, setLinkMetacritic] = useState("")
    const [linkHowLongToBeat, setLinkHowLongToBeat] = useState("")
    // const [linkVideo, setLinkVideo] = useState("")
    const [datosExtraJuego, setDatosExtraJuego] = useState("")
    const [genero, setGenero] = useState("")
    const [lanzamiento, setLanzamiento] = useState(0)
    const [fechaFinalizacion, setFechaFinalizacion] = useState(0)
    const [horasDuracion, setHorasDuracion] = useState(0)
    const [porcentajeCompletado, setPorcentajeCompletado] = useState(0)
    const [platino, setPlatino] = useState("")
    const [opinionPersonal, setOpinionPersonal] = useState("")

    

    const [selectedTitle, setSelectedTitle] = useState(''); // Nuevo estado para el título exacto

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isTitleValid, setIsTitleValid] = useState(false)
    const [fechaActualizacion, setFechaActualizacion] = useState("") 

    const handleGameSelect = (titulo, imageUrl, plataforma, descripcion, notaMetacriticPrensa, notaMetacriticUsuarios, tiempoMainStory, tiempoMainAndSides, tiempoCompletionist, linkMetacritic, linkHowLongToBeat, datosExtraJuego, genero, lanzamiento, fechaFinalizacion, horasDuracion, porcentajeCompletado, platino, opinionPersonal, imageUrl2, platformImageUrl2 ) => {
        setSearchTerm(titulo)
        setSelectedTitle(titulo); // Almacena el título exacto seleccionado
        setImageUrl(imageUrl)
        // setPlatformImageUrl(platformImageUrl)
        // if (!imageUrl) {
        //   setImageUrl(imageUrl2)
        // }
        setPlataforma(plataforma)
        setDescripcion(descripcion)
        setNotaMetacriticPrensa(notaMetacriticPrensa)
        setNotaMetacriticUsuarios(notaMetacriticUsuarios)
        setTiempoMainStory(tiempoMainStory)
        setTiempoMainAndSides(tiempoMainAndSides)
        setTiempoCompletionist(tiempoCompletionist)
        setLinkMetacritic(linkMetacritic)
        setLinkHowLongToBeat(linkHowLongToBeat)
        // setLinkVideo(linkVideo)
        setDatosExtraJuego(datosExtraJuego)
        setGenero(genero)
        setLanzamiento(lanzamiento)
        setFechaFinalizacion(fechaFinalizacion)
        setHorasDuracion(horasDuracion)
        setPorcentajeCompletado(porcentajeCompletado)
        setPlataforma(platino)
        setOpinionPersonal(opinionPersonal)

    
        setIsDropdownOpen(false) // Cierra el desplegable al seleccionar un juego
        setIsTitleValid(true) // El título seleccionado es válido
    
          // Obtener la fecha y hora actuales
          const currentDate = new Date()
          const formattedDate = currentDate.toISOString() // Formatear la fecha a una cadena ISO
             // Establecer la fecha de actualización en el estado
        setFechaActualizacion(formattedDate)
      };
    
  return {
    handleGameSelect, searchTerm, setSearchTerm, imageUrl, plataforma, descripcion, notaMetacriticPrensa, notaMetacriticUsuarios, tiempoMainStory, tiempoMainAndSides, tiempoCompletionist, linkMetacritic, linkHowLongToBeat, datosExtraJuego, genero, lanzamiento, fechaFinalizacion, horasDuracion, porcentajeCompletado, platino, opinionPersonal, isDropdownOpen, setIsDropdownOpen, isTitleValid, setIsTitleValid, fechaActualizacion, selectedTitle

  }
}
