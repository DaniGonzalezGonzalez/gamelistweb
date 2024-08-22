import { useState } from "react"


export function useHandlePlatformMenus(){
  const [menuAddGamesByPlatformOpen, setMenuAddGamesByPlatformOpen] = useState(false)
  const [menuAddGamesPS, setMenuAddGamesPS] = useState(false)
  const [menuAddGamesNintendo, setMenuAddGamesNintendo] = useState(false)
  const [menuAddGamesPortatiles, setMenuAddGamesPortatiles] = useState(false)
  const [menuAddGamesXbox, setMenuAddGamesXbox] = useState(false)
  const [menuAddGamesRetro, setMenuAddGamesRetro] = useState(false)
  const [menuAddGamesPC, setMenuAddGamesPC] = useState(false)

  const [configAddGamesByPlatformOpen, setConfigAddGamesByPlatformOpen] = useState(false)
  const [configAddGamesPS, setConfigAddGamesPS] = useState(false)
  const [configAddGamesNintendo, setConfigAddGamesNintendo] = useState(false)
  const [configAddGamesXbox, setConfigAddGamesXbox] = useState(false)
  const [configAddGamesPortatiles, setConfigAddGamesPortatiles] = useState(false)
  const [configAddGamesRetro, setConfigAddGamesRetro] = useState(false)
  const [configAddGamesPC, setConfigAddGamesPC] = useState(false)


  const handleAddGameMenu = () => {
    setMenuAddGamesByPlatformOpen(!menuAddGamesByPlatformOpen)
    setMenuAddGamesPS(false)
    setMenuAddGamesNintendo(false)
    setConfigAddGamesByPlatformOpen(false)
  }

  const handlePSMenu = () => {
    setMenuAddGamesPS(!menuAddGamesPS)
    setMenuAddGamesNintendo(false)
    setMenuAddGamesXbox(false)
    setMenuAddGamesPortatiles(false)
    setMenuAddGamesRetro(false)
    setMenuAddGamesPC(false)

    setConfigAddGamesPS(false)
  }
  
  const handleNintendoMenu = () => {
    setMenuAddGamesNintendo(!menuAddGamesNintendo)
    setMenuAddGamesPS(false)
    setMenuAddGamesXbox(false)
    setMenuAddGamesPortatiles(false)
    setMenuAddGamesRetro(false)
    setMenuAddGamesPC(false)

    setConfigAddGamesNintendo(false)
  }

  const handleXboxMenu = () => {
    setMenuAddGamesXbox(!menuAddGamesXbox)
    setMenuAddGamesPS(false)
    setMenuAddGamesNintendo(false)
    setMenuAddGamesPortatiles(false)
    setMenuAddGamesRetro(false)
    setMenuAddGamesPC(false)

    setConfigAddGamesXbox(false)
  }

  const handlePortatilesMenu = () => {
    setMenuAddGamesPortatiles(!menuAddGamesPortatiles)
    setMenuAddGamesPS(false)
    setMenuAddGamesNintendo(false)
    setMenuAddGamesXbox(false)
    setMenuAddGamesRetro(false)
    setMenuAddGamesPC(false)

    setConfigAddGamesPortatiles(false)
  }

  const handleRetroMenu = () => {
    setMenuAddGamesRetro(!menuAddGamesRetro)
    setMenuAddGamesPS(false)
    setMenuAddGamesNintendo(false)
    setMenuAddGamesXbox(false)
    setMenuAddGamesPortatiles(false)
    setMenuAddGamesPC(false)

    setConfigAddGamesRetro(false)
  }

  const handlePCMenu = () => {
    setMenuAddGamesPC(!menuAddGamesPC)
    setMenuAddGamesPS(false)
    setMenuAddGamesNintendo(false)
    setMenuAddGamesXbox(false)
    setMenuAddGamesPortatiles(false)
    setMenuAddGamesRetro(false)

    setConfigAddGamesPC(false)
  }
    return {        
      handleAddGameMenu,
      handlePSMenu,
      handleNintendoMenu,
      handleXboxMenu,
      handlePortatilesMenu,
      handleRetroMenu,
      handlePCMenu,
      menuAddGamesByPlatformOpen,
      menuAddGamesPS,
      menuAddGamesNintendo,
      menuAddGamesXbox,
      menuAddGamesPortatiles,
      menuAddGamesRetro,
      menuAddGamesPC,
      setMenuAddGamesByPlatformOpen
    }
}