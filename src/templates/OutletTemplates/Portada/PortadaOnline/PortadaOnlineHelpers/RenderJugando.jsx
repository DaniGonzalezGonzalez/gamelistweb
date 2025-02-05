import { UpdateIcon } from "../../../../../assets/Icons"
// import { useHeadHomePageShowingInfo } from "../../../../../context/HeadHomePageShowingInfoContext";
import { cleanTitle } from "../../../../helpers/constants/constants"

export const RenderJugando = (juegos, handleTitleClick) => {
    return juegos.map((item, index) => (
        <div key={index}>
            <div className={`px-2 flex items-center justify-center gap-3 duration-500 sm:flex hover:scale-102 hover:shadow-white opacity-95 hover:opacity-100`}
            >
                <div className="w-full h-full">
                <button onClick={() => handleTitleClick(item.id)} className="relative flex items-center justify-center w-full gap-3 shadow-md sm:flex hover:rounded-lg">
                    {/* Imagen del juego */}
                    {/* <div className="relative w-full h-40 img-container lg:h-60">  */}
                        {/* <img className="object-cover w-full h-full transition duration-500 ease-in-out border-2 border-transparent rounded-lg lg:h-60 hover:rounded-lg hover:border-gray-200" src={item.imageUrl ?? item.url[0]} alt="No hay imagen"/> */}
                         <img className="object-cover w-full h-40 transition duration-500 ease-in-out border-2 border-transparent rounded-lg lg:h-60 hover:rounded-lg hover:border-gray-200" src={item.imageUrl ?? item.url[0]} alt="No hay imagen" />
                    {/* </div> */}
                    
                    {/* Imagen de la plataforma */}
                    <img className={`absolute object-contain w-8 h-8 p-1 bg-gray-200 rounded-lg shadow right-3 bottom-3 shadow-black`}
                    src={`/platformImages/${item.plataforma.replace(/\s+/g, '-').trim()}-Logo.webp`} alt="No hay imagen" title={`Plataforma: ${item?.plataforma || 'Sin plataforma especificada'}`} />

                    {/* Icono de Rejugando en caso de marcar o no la opción */}
                    {item.rejugando === 'SI' && (
                    <div title="Rejugando" className="absolute flex items-center justify-center object-contain w-6 h-6 py-1 text-xs bg-green-600 rounded-lg shadow left-3 bottom-3 shadow-black">
                        <UpdateIcon w={4} h={4}/>
                    </div>
                    )}
                </button>
                {/* Título del juego */}
                <div className="sm:w-2/3">
                    <div className="flex justify-between gap-8 py-3 text-justify">
                    <p className="text-xs text-gray-200 text-start">{cleanTitle(item?.titulo)}</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    ))
}