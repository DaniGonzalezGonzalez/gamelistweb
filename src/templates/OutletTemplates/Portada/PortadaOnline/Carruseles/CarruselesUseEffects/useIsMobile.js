import { useState, useEffect } from 'react'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 666)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 666)
    };

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile
}

