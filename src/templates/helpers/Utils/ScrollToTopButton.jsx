import { useState, useEffect } from 'react'
import { ArrowUp } from '../../../assets/Icons'
import { scrollToTop } from '../constants/constants'

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      className={`${isVisible ? 'visible scroll-to-top' : 'hidden'}`}
      onClick={scrollToTop}
    >
      <div className="circle">
        <ArrowUp/>
      </div>
    </button>
  )
}