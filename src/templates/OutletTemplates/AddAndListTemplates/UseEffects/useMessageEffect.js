import { useState, useEffect } from 'react';

export const useMessageEffect = (success, error, setSearchTerm) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (success || error) {
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
        if (error) {
          window.location.reload()  // Recarga la página
        }
      }, 2000) // 2 segundos

      setSearchTerm('')

      return () => clearTimeout(timer)
    }
  }, [success, error, setSearchTerm])

  return showMessage
}
