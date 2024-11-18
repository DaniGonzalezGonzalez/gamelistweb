import { getPlatformImage } from "../templates/helpers/constants/constants"

export const fetchPlatformImagesJugandoYCompletando = async (juegosJugando, juegosCompletando, platformImages, setPlatformImages) => {
    const imageUrls = {}
    const allJuegos = [...juegosJugando, ...juegosCompletando]
  
    for (const juego of allJuegos) {
      if (juego.plataforma && !platformImages[juego.plataforma]) {
        const url = await getPlatformImage(juego.plataforma)
        imageUrls[juego.plataforma] = url
      }
    }
    
    setPlatformImages(prev => {
      // Solo actualiza el estado si hay nuevas imágenes para evitar renders innecesarios
      const updatedImages = { ...prev, ...imageUrls }
      return Object.keys(updatedImages).length === Object.keys(prev).length
        ? prev // Retorna el estado previo si no hay cambios
        : updatedImages
    })
  }
  

  export const fetchPlatformImagesPortada = async (juegosPortada, platformImages, setPlatformImages) => {
    const imageUrls = {}
    const allJuegos = [...juegosPortada]
    for (const juego of allJuegos) {
      if (juego.plataforma && !platformImages[juego.plataforma]) {
        const url = await getPlatformImage(juego.plataforma)
        imageUrls[juego.plataforma] = url
      }
    }
    
    setPlatformImages(prev => {
      // Solo actualiza el estado si hay nuevas imágenes para evitar renders innecesarios
      const updatedImages = { ...prev, ...imageUrls }
      return Object.keys(updatedImages).length === Object.keys(prev).length
        ? prev // Retorna el estado previo si no hay cambios
        : updatedImages
    })
  }
  
  export const fetchPlatformImages = async (coleccion, setPlatformImages) => {
    const imageUrls = {}
    const allJuegos = [...coleccion]
    for (const juego of allJuegos) {
      const plataforma = juego.plataforma  
      if (plataforma) {
        const url = await getPlatformImage(plataforma)
        imageUrls[plataforma] = url
      }
    }
    setPlatformImages(prev => {
      // Solo actualiza el estado si hay nuevas imágenes para evitar renders innecesarios
      const updatedImages = { ...prev, ...imageUrls }
      return Object.keys(updatedImages).length === Object.keys(prev).length
        ? prev // Retorna el estado previo si no hay cambios
        : updatedImages
    })
  }
  