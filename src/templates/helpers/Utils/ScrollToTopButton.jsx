import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { ArrowUp } from '../../../assets/Icons'
import { scrollToTop } from '../constants/constants'

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation()

  // Determinar si estás en la página principal
  const isRoot = location.pathname === "/"
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  }, [])



  return (
    <button
      className={`${isVisible ? `visible scroll-to-top ${isRoot ? "bottom-large" : "bottom-small"}` : 'hidden'}`}
      onClick={scrollToTop}
    >
      <div className="circle">
        <ArrowUp/>
      </div>
    </button>
  )
}