import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'

export const useFunctionsNavBar = (isScrolled) => {
  const { user, _signOut } = useContext(UserContext)  // Aquí se obtiene el user
  const [menuOpen, setMenuOpen] = useState(false)
  const [configOpen, setConfigOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    setConfigOpen(false) // Reseteamos el estado de config
  };

  const toggleConfig = () => {
    setConfigOpen(!configOpen)
    setMenuOpen(false) // Reseteamos el estado de menú
  };

  const handleLogout = () => {
    setMenuOpen(false)
    setConfigOpen(false)
    _signOut()
    navigate('/')
  }

  const linkToContent = () => {
    setConfigOpen(false)
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return {
    user,         
    menuOpen,    
    setMenuOpen,  
    configOpen,   
    setConfigOpen,
    toggleMenu,
    toggleConfig,
    handleLogout,
    linkToContent,
    handleGoBack,
    isScrolledIndex: isScrolled
  };
};
