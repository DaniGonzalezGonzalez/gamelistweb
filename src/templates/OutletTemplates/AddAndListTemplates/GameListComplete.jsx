import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"
import { useHandlePlatformMenus, useHandles } from "../../../hooks/useHandles"
import { cleanTitle, GET_COLOR_CLASS, GET_STATE_BACKGROUND, totalTiempoMainStory } from "../../helpers/constants/constants"
import { GET_STATE_ICON, useDebounce } from "../../helpers/constants/constantsComponents"
import { ChooseAddGamesMenuFlotante } from "../../helpers/Utils/ChooseAddGamesMenuFlotante"
import { ScrollToTopButton } from "../../helpers/Utils/ScrollToTopButton"
import { GameListHeader, GameListCardComplete, NoGamesInListPrompt, PaginationButtons, SearchGamesInList, SortControl } from "./AddAndListHelpers"
import { useDataChangedListener, useFetchDataOnCondition, useRandomImageEffect } from "./UseEffects"
import { useDataGameListComplete } from "./Utils/useDataGameListComplete"

export function GameListComplete() {
  const [dataBD, setDataBD] = useState([])
  const [error, setError] = useState(null)
  const [shouldFetchData, setShouldFetchData] = useState(false)
  const [noGamesLoaded, setNoGamesLoaded] = useState(false)
  const [sortBy, setSortBy] = useState('titulo')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsToShow, setItemsToShow] = useState(10)
  
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const { chooseAddGamesMenuOpen, handleAddGameMenu } = useHandlePlatformMenus()
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { handleShowAll, handleShowInitial } = useHandles(itemsToShow, setItemsToShow)
  const { preSortedData, sortedData, handleShowMore, handleShowLess, handleTitleClick, fetchData } = useDataGameListComplete({dataBD, setDataBD, setError, setNoGamesLoaded, sortBy, sortDirection, user, itemsToShow, setItemsToShow, searchTerm, navigate})
  const { selectedImage } = useRandomImageEffect(preSortedData)
    
  useDataChangedListener(fetchData)
  useFetchDataOnCondition(shouldFetchData, fetchData, setShouldFetchData);


  return (
    <> 
      { user.id && 
        <div>
          {error && (<div className="items-center justify-center h-screen"><span className="text-xl text-gray-900 font-montserrat">{error.message}</span></div>)}
          <div className="min-h-screen pb-10 bg-gray-950">
            <GameListHeader dataBD={preSortedData} selectedImage={selectedImage} nombreColeccion={'Todos mis juegos'} backgroundClass="animate-bg-animation" totalTiempoMainStory={totalTiempoMainStory}/>
            
            {/* Barra de búsqueda y botones de orden */}
            <div className="container px-4 pt-8 pb-8 mx-auto">
              <div className="flex justify-between h-6 mx-3 lg:mx-6 my-14">
                <SearchGamesInList searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Buscar" width="w-40 sm:w-52"/>         
                <SortControl sortType="default" sortBy={sortBy} setSortBy={setSortBy} setSortDirection={setSortDirection}/>             
              </div>

              {/* Mostrar juegos encontrados */}
              <GameListCardComplete sortedData={sortedData} user={user} handleTitleClick={handleTitleClick} GET_STATE_BACKGROUND={GET_STATE_BACKGROUND} GET_STATE_ICON={GET_STATE_ICON} GET_COLOR_CLASS={GET_COLOR_CLASS} cleanTitle={cleanTitle}/>


              {/* Mensaje cuando no se encuentren juegos filtrados */}
              {debouncedSearchTerm.trim() !== "" && sortedData.length === 0 && (
                  <div className="flex flex-col items-center justify-center w-full pt-5">
                    <img src="/Imagen-no-encontrado.webp" alt="No se encontraron juegos" className="w-20 h-20 mb-4"/>
                    <p className="mt-4 text-sm font-semibold text-white lg:text-lg">¡No se encontraron juegos!</p>
                  </div>
                )
              }

              {/* Recuadro cuando todavía NO se han añadido juegos */}
              <NoGamesInListPrompt noGamesLoaded={noGamesLoaded} handleAddGameMenu={handleAddGameMenu}/>

              {/* Panel oculto de Elección de catálogo cuando NO hay juegos en la colección */}
              {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}
              
              
              {/* Botones de Mostrar más y mostrar menos */}              
              <PaginationButtons dataBD={preSortedData} sortedData={sortedData} itemsToShow={itemsToShow} handleShowMore={handleShowMore} handleShowLess={handleShowLess} handleShowInitial={handleShowInitial} handleShowAll={handleShowAll} setItemsToShow={setItemsToShow}/>        
            
            </div>
          </div>
        </div>
      }      
      <ScrollToTopButton/>
    </>
  )
}