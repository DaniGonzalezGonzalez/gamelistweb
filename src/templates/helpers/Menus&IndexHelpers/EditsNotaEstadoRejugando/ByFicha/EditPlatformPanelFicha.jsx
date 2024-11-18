/* eslint-disable react/prop-types */
import { useContext, useRef, useState } from 'react'
import { updateDocument } from '../../../../../api/supabase/cloud-supabase'
import { ArrowLeft } from '../../../../../assets/Icons'
import { UserContext } from '../../../../../context/UserContext'
import { platforms } from '../../../constants/constants'
import { handlePlatformClick, useCheckDuplicatePlatforms, useEffectFetchDataPlatform, useSplitPlatform } from '../Helpers/UseEffects'
import { limpiarTituloJuego } from '../Helpers/utils'

export function EditPlatformPanelFicha({ onClose, onPlatformChange, onAvanzar, textoBoton, onOmitir, platformActual, onAdded, tituloJuego, juegoId, isFromAddFicha, collection }) {
  const panelRef = useRef(null)
  const [platform, setPlatform] = useState(platformActual || '')
  const [platformsList, setPlatformsList] = useState([])
  const [plataformasExistentes, setPlataformasExistentes] = useState([])
  const [errorMessage, setErrorMessage] = useState('') 
  const [loading, setLoading] = useState(true)

  const { user } = useContext(UserContext)
  // Llamamos a los useEffect del fetchData, de checkear la plataforma del juego
  useEffectFetchDataPlatform(tituloJuego, setPlatform, setPlatformsList, setLoading, limpiarTituloJuego )
  useCheckDuplicatePlatforms({ tituloJuego, platform, user, loading, plataformasExistentes, errorMessage, setPlataformasExistentes,  setErrorMessage, limpiarTituloJuego })
  useSplitPlatform(platform, setPlatformsList)

  const handleOmitirPanel = () => {
    onClose()
  }

 return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div ref={panelRef} className="flex flex-col items-center w-5/6 px-3 pt-5 pb-10 text-gray-100 border-2 border-gray-100 shadow-lg sm:w-4/6 lg:px-3 lg:pt-5 lg:pb-20 lg:w-1/2 rounded-2xl bg-slate-950" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col items-center justify-center w-full mb-4">
          <div className='flex justify-start w-full'>
            <button onClick={handleOmitirPanel} className="text-sm text-white rounded-xl hover:scale-105">
              <ArrowLeft />
            </button>
          </div>
          <p className='py-2 text-sm sm:py-0 lg:py-8 lg:text-lg'>Selecciona una plataforma</p>
        </div>
        {platformsList.length >1 && errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Mostrar mensaje de error */}
        {errorMessage === 'Este juego ya está en la plataforma seleccionada.' && <p className="text-red-500">{platformsList.length >1 ? 'Este juego ya existe en tus colecciones en la plataforma seleccionada' : 'Este juego ya existe en tus colecciones en la plataforma disponible'}</p>} {/* Mostrar mensaje de error */}
      
        <div className={`flex justify-center gap-2
        ${(platformsList.length > 2) && "grid justify-center gap-2 grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4"}
        ${platformsList.length > 6 && "grid justify-center gap-2 grid-cols-2 sm:grid-cols-5 lg:grid-cols-3"}

        `}>
          {platformsList.map((option) => {
            const formattedOption = option === "Xbox Series X-S" ? "Xbox-Series-X-S" : option.replace(/\s+/g, '-')
            const imageSrc = `/platformImages/${formattedOption}-Logo.webp`
            return (
              <button key={option}
                onClick={() => handlePlatformClick(option, platformsList, plataformasExistentes, setErrorMessage, setPlatform, tituloJuego, limpiarTituloJuego, collection, juegoId, updateDocument, onPlatformChange, onAvanzar, onClose, isFromAddFicha)}
                className={`flex flex-col items-center p-3 hover:bg-gray-500 transition duration-300 rounded-2xl text-white border-2 w-28 sm:w-16 lg:w-40 bg-gray-300`}>
                  <img className="object-contain w-16 h-10" src={imageSrc} alt={`Logo de ${option}`} title={`Plataforma: ${option}`}/>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}