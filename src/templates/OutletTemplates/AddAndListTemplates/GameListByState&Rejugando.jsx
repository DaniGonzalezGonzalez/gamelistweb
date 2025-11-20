/* eslint-disable react/prop-types */
import { useState } from "react";
import { useHandlePlatformMenus, useHandles } from "../../../hooks/useHandles"
import { useEditGameToList } from "../../../hooks/useEditGameToList"
import { GET_STATE_BACKGROUND, totalTiempoMainStory } from "../../helpers/constants/constants"
import { useFetchDataAndSort } from "../../../hooks/useFetchDataAndSort"
import { useDebounce } from "../../helpers/constants/constantsComponents"
import { ChooseAddGamesMenuFlotante } from "../../helpers/Utils/ChooseAddGamesMenuFlotante"
import { useDataChangedListener, useFetchDataOnCondition, useRandomImageEffect } from "./UseEffects";
import { GameListHeader, GameListCardByState, NoGamesInListPrompt, PaginationButtons, SearchGamesInList, SortControl } from "./AddAndListHelpers"
import { ScrollToTopButton } from "../../helpers/Utils/ScrollToTopButton";
import { PlatformFilter } from "./Utils/PlatformFilter";

export function GameListByStateRejugando({estadoPluralMinusculas, estadoSingularMayusculas, nombreColeccion}) {
  const [contenido, setContenido] = useState({})
  const [option, setOption] = useState('Juegos')
  const [fechaActualizacion, setFechaActualizacion] = useState("")
  const [visibleItemId, setVisibleItemId] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [isDisabled, setIsDisabled] = useState(true)
  const [filtroPlataforma, setFiltroPlataforma] = useState([])

  const { fetchData, dataBD, error, user, sortedData, setItemsToShow, setSearchTerm, setSortBy, setSortDirection, itemsToShow, searchTerm, sortBy, noGamesLoaded  } = useFetchDataAndSort(estadoSingularMayusculas, filtroPlataforma)
  const { handleSubmit } = useEditGameToList(contenido.idDoc, option, estadoPluralMinusculas)
  const { handleShowMore, handleShowAll, handleShowInitial, handleShowLess, handleTitleClick, handleUpPosition, handleDownPosition, shouldFetchData, setShouldFetchData } = useHandles(handleSubmit, setContenido, setFechaActualizacion, setEditingItem, setIsDisabled, isDisabled, setItemsToShow, itemsToShow, contenido)
  const { chooseAddGamesMenuOpen, handleAddGameMenu } = useHandlePlatformMenus()
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
 
  const { selectedImage } = useRandomImageEffect(dataBD)
  useDataChangedListener(fetchData, filtroPlataforma)
  useFetchDataOnCondition(shouldFetchData, fetchData, setShouldFetchData)

  const toggleVisibility = (id) => {
    setVisibleItemId((prevId) => (prevId === id ? null : id))
  }
  return (
    <> 
      { user.id && 
          <div>
            {error && (<div className="items-center justify-center h-screen"><span className="text-xl text-gray-900 font-montserrat">{error.message}</span></div>)}
            <div className="min-h-screen pb-10 bg-gray-950">
            <GameListHeader dataBD={dataBD} selectedImage={selectedImage} nombreColeccion={nombreColeccion} GET_STATE_BACKGROUND={GET_STATE_BACKGROUND} estadoSingularMayusculas={estadoSingularMayusculas} totalTiempoMainStory={totalTiempoMainStory}/>
                
              {/* Barra de búsqueda y botones de orden */}
              <div className="container px-4 pt-8 pb-8 mx-auto sm:px-8">             
                <div className="flex justify-between h-6 my-14">
                  <SearchGamesInList searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Buscar por título" width="w-40 sm:w-52"/>
                  <div className="flex">                    
                    <PlatformFilter filtroPlataforma={filtroPlataforma} setFiltroPlataforma={setFiltroPlataforma} />
                      { sortedData.length >= 1 &&
                          <SortControl sortType="estado" sortBy={sortBy} setSortBy={setSortBy} setSortDirection={setSortDirection} filtroPlataforma={filtroPlataforma} setFiltroPlataforma={setFiltroPlataforma}/>
                      }
                  </div>
                </div>

                {/* Mensaje cuando no se encuentren juegos filtrados */}
                {debouncedSearchTerm.trim() !== "" && sortedData.length === 0 && (
                    <div className="flex flex-col items-center justify-center w-full pt-5">
                      <img src="/Imagen-no-encontrado.webp" alt="No se encontraron juegos" className="w-20 h-20 mb-4"/>
                      <p className="mt-4 text-sm font-semibold text-white lg:text-lg">¡No se encontraron juegos!</p>
                    </div>
                  )
                }

                {/* Recuadro cuando todavía NO se han añadido juegos */}
                <NoGamesInListPrompt noGamesLoaded={noGamesLoaded} handleAddGameMenu={handleAddGameMenu} estadoPluralMinusculas={estadoPluralMinusculas} estadoSingularMayusculas={estadoSingularMayusculas}/>

                {/* Panel oculto de Elección de catálogo cuando NO hay juegos en la colección */}
                {chooseAddGamesMenuOpen && <ChooseAddGamesMenuFlotante chooseAddGamesMenuOpen={chooseAddGamesMenuOpen} handleAddGameMenu={handleAddGameMenu}/>}

                {/* Mostrar juegos encontrados */}
                <GameListCardByState sortedData={sortedData} visibleItemId={visibleItemId} sortBy={sortBy} handleTitleClick={handleTitleClick} handleUpPosition={handleUpPosition} handleDownPosition={handleDownPosition} toggleVisibility={toggleVisibility} setSortBy={setSortBy} estadoSingularMayusculas={estadoSingularMayusculas} user={user} searchTerm={searchTerm} filtroPlataforma={filtroPlataforma}/>
              
                {/* Botones de mostrar más, menos y todo */}
                <PaginationButtons dataBD={dataBD} sortedData={sortedData} itemsToShow={itemsToShow} handleShowMore={handleShowMore} handleShowLess={handleShowLess} handleShowInitial={handleShowInitial} handleShowAll={handleShowAll} setItemsToShow={setItemsToShow}/>

            </div>
          </div>
        </div>
      }   
      <ScrollToTopButton/>
    </>
  )
}
