import { useState, useEffect } from 'react';
import { scrollToTop } from '../../no-components/constants';
import { ArrowUp } from '../../../../assets/Icons/ArrowUp';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   })
  // }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
  );
};