/* eslint-disable react/prop-types */
import React from 'react';
import { ArrowLeft, ArrowRight, Dots, EyeSlash } from '../../../../assets/Icons'
import { cleanTitle, GET_COLOR_CLASS } from '../../../helpers/constants/constants'
import { GET_STATE_ICON } from '../../../helpers/constants/constantsComponents'

export const GameListCardByState = ({
  sortedData, 
  visibleItemId, 
  sortBy, 
  handleTitleClick, 
  handleUpPosition, 
  handleDownPosition, 
  toggleVisibility, 
  setSortBy, 
  estadoSingularMayusculas, 
  user,
  searchTerm
}) => {
  
  return (
    sortedData.length >= 1 && 
      <div className="grid grid-cols-2 gap-4 px-0 py-5 mx-auto sm:gap-6 lg:px-0 xs:px-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {sortedData.map((item, index) => (
          <div key={index} className="flex justify-center rounded">
            <div className="w-full">
              {(item?.infouser === user.email && item?.estado === estadoSingularMayusculas) &&                     
                <div className="flex justify-center w-full gap-10 mb-10 text-lg font-bold text-gray-800 rounded">
                  <div className="h-full w-80 sm:w-56 xl:w-48 2xl:w-60">
                    <button onClick={() => handleTitleClick(item.id)} className="relative flex items-center justify-center w-full gap-3 shadow-md sm:flex hover:rounded-lg">
                      <img className="object-cover w-full h-40 transition duration-500 ease-in-out border-2 border-transparent rounded-lg xl:h-48 2xl:h-52 hover:border-2 hover:rounded-lg hover:border-gradient" src={item.imageUrl ?? item.url[0]} alt="No hay imagen" />
                      <img className="absolute object-contain w-8 h-8 p-1 bg-gray-200 rounded-lg shadow right-2 bottom-2 shadow-black" src={`/platformImages/${item.plataforma.replace(/\s+/g, '-').trim()}-Logo.webp`} alt="No hay imagen" title={`Plataforma: ${item?.plataforma || 'Sin plataforma especificada'}`} />
                      <div className="absolute flex items-center justify-center object-contain rounded-lg shadow left-2 bottom-2 shadow-black" title="Nota personal">
                        { item?.notaJuego !== undefined && item?.notaJuego !== null && item.notaJuego !== '' && 
                          <p className={`text-xs text-gray-100 flex justify-center items-center rounded px-2 w-6 h-6 py-1 text-end ${GET_COLOR_CLASS(item?.notaJuego)}`}>
                            {item?.notaJuego}
                          </p>
                        }
                      </div>
                      { visibleItemId === item.id && sortBy === 'position' && 
                          <div className="absolute object-contain w-full h-40 p-1 rounded-lg shadow xl:h-48 2xl:h-52 shadow-black" onClick={(e) => e.stopPropagation()}>
                            <div className="relative z-10 flex items-center justify-center h-full">
                              <div className="text-white transition duration-300 hover:scale-150" onClick={() => handleUpPosition(item, sortedData)}>
                                <ArrowLeft w={12} h={12}/>
                              </div>
                              <p className="text-xs text-white lg:text-sm">Mover juego</p>
                              <div className="text-white transition duration-300 hover:scale-150" onClick={() => handleDownPosition(item, sortedData)}>
                                <ArrowRight w={12} h={12}/>
                              </div>
                            </div>
                            <div className="absolute inset-0 z-0 bg-gray-800 rounded-lg bg-opacity-80"></div> 
                          </div>
                        }
                    </button>                       
                    {/* Solo muestra o habilita los botones si la opción seleccionada es "Personalizado" */}
                    <div className="w-full">
                      <div className="flex justify-between gap-8 pt-3 pb-1 text-justify">
                        <p className="text-xs text-white text-start">{cleanTitle(item?.titulo)}</p>
                      </div>
                      <div className="pb-2 lg:pb-2">
                        <p className="text-xs text-white uppercase descripcion text-start">{item?.descripcion}</p>
                      </div>
                      <div className="flex flex-col justify-between w-full">
                        <div className="flex items-center justify-between">
                          <div className={`text-xs rounded flex items-center gap-1 text-gray-100 text-start`}>
                            <div className={`rounded`}>{GET_STATE_ICON(item.estado, '4', '4')}</div>
                            <span className="text-[10px] lg:text-[11px] py-1 font-semibold">{item?.estado}</span>
                          </div>    
                          {sortBy === 'position' && !searchTerm && 
                            <button className="text-white" onClick={() => toggleVisibility(item.id)}>
                              {visibleItemId === item.id ? <div className="p-1">
                                <EyeSlash w={4} h={4}/>
                              </div> : <Dots w={6} h={6}/>}
                            </button> 
                          } 
                        </div>                                
                      </div>
                    </div>                                             
                  </div>
                </div>
              }
            </div>
          </div>                
        ))}
      </div>
  );
};

