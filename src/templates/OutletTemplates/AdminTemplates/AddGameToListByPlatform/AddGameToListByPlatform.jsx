import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useGetData } from "../../../../hooks/useGetData"
import { useAddGameToList } from "../../../../hooks/useAddGameToList"
import { UserContext } from "../../../../context/UserContext"
import { cleanTitle, getPlatformBackground, getPlatformImage, GET_COLOR_CLASS, scrollToTop, totalNotaMetacriticPrensa, totalTiempoMainStory } from "../../../helpers/no-components/constants"
import { ScrollToTopButton } from "../../../helpers/components/Menus&IndexHelpers/ScrollToTopButton"
import { useHandleGameSelect, useHandles } from "../../../../hooks/useHandles"
import { HomePageSkeleton } from "../../../helpers/components/Menus&IndexHelpers/Skeletons/HomePageSkeleton"
import { ArrowDown } from "../../../../assets/Icons/ArrowDown"
import { EditNotaPanel } from "../../../helpers/components/Menus&IndexHelpers/EditsNotaEstadoRejugando/EditNotaPanel"
import { MenuEdits } from "../../../helpers/components/Menus&IndexHelpers/EditsNotaEstadoRejugando/MenuEdits"
import { HiddenInputs } from "../../../helpers/components/Utils/HiddenInputs"
import { FoundGames } from "../../../helpers/components/Utils/FoundGames"
import { RecentGames } from "../../../helpers/components/Utils/RecentGames"
import { useDebounce } from "../../../helpers/no-components/constantsComponents"
import { AbandonadoIcon } from "../../../../assets/Icons"
import { EditEstadoPanelAddGame } from "../../../helpers/components/Menus&IndexHelpers/EditsNotaEstadoRejugando/EditEstadoPanelAddGame"
import { useFetchDataAndSort } from "../../../../hooks/useFetchDataAndSort"
import { EditPlatformPanel } from "../../../helpers/components/Menus&IndexHelpers/EditsNotaEstadoRejugando/EditPlatformPanel"

export function AddGameToListByPlatform() {
  const tituloRef = useRef(null)
  const tipoContenidoRef = useRef(null)
  const formRef = useRef()
  const [filteredGames, setFilteredGames] = useState([])
  const [showMessage, setShowMessage] = useState(false)
  const [gameAdded, setGameAdded] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const { platform } = useParams()
  const filters = [{ field: 'plataforma', value: platform }];
  const { gamesBDByPlatform } = useGetData(platform, filters)
  const { handleSubmit, success, error, isLoading } = useAddGameToList(tituloRef, tipoContenidoRef)
  const { handleGameSelect, searchTerm, setSearchTerm, imageUrl, platformImageUrl, plataforma, descripcion, notaMetacriticPrensa, notaMetacriticUsuarios, tiempoMainStory, tiempoMainAndSides, tiempoCompletionist, linkMetacritic, linkHowLongToBeat, datosExtraJuego, genero, isDropdownOpen, setIsDropdownOpen, isTitleValid, setIsTitleValid, fechaActualizacion, selectedTitle} = useHandleGameSelect()
  const { user } = useContext(UserContext)
  const [notaJuego, setNotaJuego] = useState('');
  const [estado, setEstado] = useState('');
  const [platformSelected, setPlatformSelected] = useState('');
  const { handleOpenEditEstadoPanel, handleOpenEditNotaPanel, handleCloseEditEstadoPanel, handleCloseEditNotaPanel, editNotaPanelOpen, editEstadoPanelOpen, setEditNotaPanelOpen, menuEditPanelOpen, setEditEstadoPanelOpen, editPlatformPanelOpen, setEditPlatformPanelOpen, handleOpenEditPlatformPanel, selectedPlatforms} = useHandles()
  const [plataformaParaTitulo, setPlataformaParaTitulo] = useState(platform);

  const [recentGames, setRecentGames] = useState([]); // Estado para juegos recientemente añadidos

  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Cambia 300 al tiempo que prefieras

    const handleNotaChange = (newNota) => {
    setNotaJuego(newNota)
  }

  const handlePlatformChange = (newPlatform) => {
    setPlatformSelected(newPlatform);
  };


  const handleEstadoChange = (newEstado) => {
    setEstado(newEstado)
  }

  const [selectedPosition, setSelectedPosition] = useState(null);

  const handlePosition = (position) => {
    setSelectedPosition(position); // Actualiza el valor de la posición
  };
  const [newTitulo, setNewTitulo] = useState(null);

  const handleNewTitulo = (newTitulo) => {
    setNewTitulo(newTitulo); // Actualiza el valor de la posición
    setSearchTerm(newTitulo); // Actualiza el valor de la posición
  };


  // useEffect para cargar la imagen solo una vez al montar el componente
  useEffect(() => {
    if (gamesBDByPlatform.length > 0) {
      const randomIndex = Math.floor(Math.random() * gamesBDByPlatform.length);
      const randomImage = gamesBDByPlatform[randomIndex]?.url[0] ?? gamesBDByPlatform[randomIndex]?.imageUrl;

      const sortedById = [...gamesBDByPlatform].sort((a, b) => b.id - a.id); // Ordenar por ID descendente
      const recentGames = sortedById.slice(0, 10)
      setRecentGames(recentGames)
      setSelectedImage(randomImage);
    }
  }, [gamesBDByPlatform]);


  useEffect(() => {
    if (gameAdded) {
      setSearchTerm('');  // Restablece el término de búsqueda
      setPlataformaParaTitulo('')
      setGameAdded(false); // Resetea el estado de juego añadido
    }

    if (debouncedSearchTerm.trim() === "") {
      setFilteredGames([]);
      setIsTitleValid(false);
      return;
    }

    const filtered = gamesBDByPlatform.filter((game) =>
      game.titulo.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    // Cargar imágenes de la plataforma para los juegos filtrados
    const loadPlatformImages = () => {
      const updatedGames = filtered.map((game) => {
        const platformImageUrl = getPlatformImage(game.plataforma); // Obtener la URL de la imagen
        return { ...game, platformImageUrl };
      });
      setFilteredGames(updatedGames); // Actualizar el estado con las imágenes cargadas
    };
    
    loadPlatformImages();

    // Verifica si el título coincide exactamente con selectedTitle
    const exactMatch = filtered.some((game) => game.titulo === debouncedSearchTerm);
    setIsTitleValid(exactMatch);
  }, [debouncedSearchTerm, gamesBDByPlatform, selectedTitle, gameAdded]); 
  
  useEffect(() => {
    if (success || error) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000); // 4 segundos
      setSearchTerm('')
  
      return () => clearTimeout(timer);
    }
  }, [success, error])



  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  }

  const handleAddGame = (searchTerm) => {
    handleCloseEditEstadoPanel()
    setGameAdded(true)
  }

  const reviewEdit = () => {
    setEditNotaPanelOpen(true)
  }

  // Función vacía para manejar cambios en el textarea
  const handleEmptyChange = () => {};
    
  return (
    <>
    {
    user.id &&
    <div className="flex flex-col items-start justify-start min-h-screen bg-slate-950">
        <div className="flex flex-col items-center justify-between w-full">
          <div className={`flex flex-col justify-center w-full text-center ${getPlatformBackground(platform)} pt-14`}>
            <div className="relative flex justify-center mb-5">
              <div className="w-80 sm:w-96">
                <button onClick={() => {tituloRef.current.focus()}} className="relative w-80 sm:w-96">
                    {/* Usar la imagen seleccionada una sola vez */}
                    <img className="object-cover w-full h-32 rounded-lg sm:h-40 lg:h-60" src={selectedImage} alt='Cargando...' />
                  <div className="absolute inset-0 bg-black rounded-lg opacity-60"></div>   
                  <div className="absolute inset-0 flex items-end justify-end p-3 font-semibold text-center text-white">
                    <div className="flex justify-start w-full gap-2 font-thin text-white sm:w-80">
                        <div className="flex items-center justify-center gap-1 pr-2 text-xs border-r"><span className="font-bold">{gamesBDByPlatform.length}</span> <div className="uppercase">JUEGOS</div></div>
                        <div className="flex items-center justify-center gap-1 text-xs"><span className="font-bold">{totalTiempoMainStory(gamesBDByPlatform)}</span> <div className="uppercase">Horas</div></div>                        
                      </div>
                    <div className="text-xs sm:text-sm">{platform === 'Xbox 1' ? 'Xbox' : platform}</div>
                  </div>
                </button>
              </div>
            </div>          
        </div>

          <form className="flex flex-col items-center w-full" ref={formRef} onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center w-full px-10 sm:mt-10">
              <div className="flex flex-col items-center justify-between w-full gap-6 sm:gap-3">
                <div hidden className='flex flex-col gap-2'>
                  <label htmlFor="tipo-contenido" className="text-white" hidden>Tipo de contenido</label>
                  <select hidden ref={tipoContenidoRef} name="tipoContenido" id="tipo-contenido" className="p-2 border rounded">
                    <option value="Juegos">Mis Juegos</option>
                  </select>
                </div>
                <div className="flex items-center justify-center w-full">
                  <div className="relative w-full sm:w-52">
                    <input ref={tituloRef} className="w-full p-2 pl-2 pr-10 text-xs text-white placeholder-white bg-gray-700 border-2 appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" type="text" name="titulo" id="titulo" placeholder="Buscar juego por título" value={searchTerm}  onChange={handleInputChange}/>
                    {searchTerm && (<button type="button" className="absolute flex items-center px-1 py-3.5 text-white transition duration-500 -translate-y-1/2 bg-transparent rounded-xl inset-y-1/2 right-1 hover:bg-red-600" onClick={() => setSearchTerm('')}>
                          <div className="flex items-center gap-2 text-xs"><AbandonadoIcon/></div>
                      </button>
                    )}
                  </div>
                </div>


                <div className="flex justify-center w-full">
                 {showMessage && (
                   <>
                      {error && <p className="font-bold text-red-400 font-montserrat">{error}</p>}
                      {success && <div className="p-6 mt-6 text-xs font-bold text-center text-gray-100 bg-green-900 border-2 border-gray-100 rounded-lg shadow-lg lg:px-10 lg:pt-10 lg:pb-3 lg:text-sm sm:mt-14 w-60">{success}</div>}
                    </>
                  )}
                 {isLoading && <HomePageSkeleton/>}
                </div>


              {/* Mostrar mensaje cuando no se encuentren juegos filtrados */}
              {debouncedSearchTerm.trim() !== "" && filteredGames.length === 0 && (
                  <div className="flex flex-col items-center justify-center w-full pt-5">
                    <img src="/Imagen-no-encontrado.webp" alt="No se encontraron juegos" className="w-20 h-20 mb-4"/>
                    <p className="mt-4 text-xs text-white sm:text-sm lg:text-lg">¡No se encontraron juegos!</p>
                  </div>
              )}

              {/* Juegos Recientes */}
              {debouncedSearchTerm.trim() === "" && recentGames.length > 0 && (
                <RecentGames 
                  recentGames={recentGames} 
                  handleGameSelect={handleGameSelect} 
                  // setEditNotaPanelOpen={setEditNotaPanelOpen} 
                  setEditEstadoPanelOpen={setEditEstadoPanelOpen} byPlatform={'SI'} 
                  // setEditPlatformPanelOpen={handleOpenEditPlatformPanel} 
                />
              )}

              {/* Juegos Encontrados */}
              {debouncedSearchTerm.trim() !== "" && isDropdownOpen && filteredGames.length > 0 && (
                <FoundGames 
                  filteredGames={filteredGames} 
                  handleGameSelect={handleGameSelect} 
                  // setEditNotaPanelOpen={setEditNotaPanelOpen} 
                  setEditEstadoPanelOpen={setEditEstadoPanelOpen} byPlatform={'SI'} 
                  // setEditPlatformPanelOpen={handleOpenEditPlatformPanel} 
                />
              )}

              <HiddenInputs imageUrl={imageUrl} plataforma={platform} platformImageUrl={platformImageUrl} descripcion={descripcion} notaMetacriticPrensa={notaMetacriticPrensa} notaMetacriticUsuarios={notaMetacriticUsuarios} tiempoMainStory={tiempoMainStory} tiempoMainAndSides={tiempoMainAndSides} tiempoCompletionist={tiempoCompletionist} linkMetacritic={linkMetacritic} linkHowLongToBeat={linkHowLongToBeat} datosExtraJuego={datosExtraJuego} genero={genero} fechaActualizacion={fechaActualizacion} estado={estado} notaJuego={notaJuego} user={user} position={selectedPosition} /> 
   
              </div>             
              </div>
          </form>
        </div>    

        {/* {editNotaPanelOpen && <EditNotaPanel onClose={handleOpenEditEstadoPanel} onAvanzar={handleOpenEditEstadoPanel} onNotaChange={handleNotaChange} textoBoton='Avanzar' onOmitir={true} /> }    */}
        {/* {editPlatformPanelOpen && <EditPlatformPanel onClose={handleOpenEditEstadoPanel} textoBoton='Avanzar' onPlatformChange={handlePlatformChange} onAvanzar={handleOpenEditEstadoPanel} onOmitir={true} platformActual={selectedPlatforms} />  }    */}


        {editEstadoPanelOpen && <EditEstadoPanelAddGame onAvanzar={handleAddGame} onEstadoChange={handleEstadoChange} onPosition={handlePosition} textoBoton='Avanzar' onNewTitulo={handleNewTitulo} formRef={formRef} handleSubmit={handleSubmit} titulo={filteredGames[0]?.titulo} platform={platform}/> } 
        {/* {editRejugandoPanelOpen && <EditRejugandoPanel onClose={handleCloseRejugandoPanel} onRejugandoChange={handleRejugandoChange}/> }    */}
        {menuEditPanelOpen && <MenuEdits onGoToNota={handleOpenEditNotaPanel}/> }   

        <ScrollToTopButton/>
    </div>
    }
    </>
  )
}
