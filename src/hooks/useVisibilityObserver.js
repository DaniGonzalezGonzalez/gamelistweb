import { useEffect, useState } from "react";

export function useVisibilityObserver(classSelector = ".observed-item", threshold = 0.5, sortedData = []) {
  const [visibleItems, setVisibleItems] = useState({})

  useEffect(() => {
    // Función que maneja las entradas que nos da el navegador (IntersectionObserverEntry)
    const handleIntersection = (entries) => {
      setVisibleItems(prev => {
        const newVisibleItems = { ...prev } // copiamos para no mutar el estado directamente
        entries.forEach(entry => {
          if (entry.isIntersecting) { // si el elemento está visible
            newVisibleItems[entry.target.dataset.id] = true // marcamos ese item como visible
          }
        })
        return newVisibleItems; // devolvemos el nuevo estado
      })
    }

    // Creamos el observador que vigila los elementos con el threshold que queremos
    const observer = new IntersectionObserver(handleIntersection, { threshold });

    // Obtenemos todos los elementos que queremos observar con la clase que nos pasen
    const elements = document.querySelectorAll(classSelector);

    // Ponemos a observar cada uno de esos elementos
    elements.forEach(el => observer.observe(el))

    // Cuando el componente se desmonta, quitamos la observación para limpiar recursos
    return () => {
      elements.forEach(el => observer.unobserve(el))
      observer.disconnect()
    }
  }, [sortedData, classSelector, threshold])

  return visibleItems;
}
