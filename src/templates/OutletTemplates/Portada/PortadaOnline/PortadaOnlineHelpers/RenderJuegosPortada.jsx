import { cleanTitle } from "../../../../helpers/constants/constants"

export const RenderJuegosPortada = (juegos, platformImages, handleTitleClick) => {
    return juegos.map((item, index) => (
        <div key={index}>
            <div className="flex items-center justify-center gap-1 duration-500 sm:flex hover:scale-105 hover:shadow-white opacity-95 hover:opacity-100">
                <div className="w-full h-full">
                    <button onClick={() => handleTitleClick(item.id)} className="relative flex items-center justify-center w-full gap-3 shadow-md sm:flex hover:rounded">
                        <img className="object-cover w-full h-40 transition duration-500 ease-in-out border-2 border-transparent rounded-lg hover:border-2 hover:rounded-lg hover:border-gray-300" src={item.imageUrl ?? item.url[0]} alt="No hay imagen" />
                        <img className="absolute object-contain w-8 h-8 p-1 bg-gray-200 rounded-lg shadow right-2 bottom-2 shadow-black" src={`/platformImages/${item.plataforma.replace(/\s+/g, '-').trim()}-Logo.webp`} alt="No hay imagen" title={`Plataforma: ${item?.plataforma || 'Sin plataforma especificada'}`} />
                    </button>
                    <div className="sm:w-2/3">
                        <div className="flex flex-col gap-8 py-3 text-start">
                            <p className="text-xs text-gray-200">{cleanTitle(item?.titulo)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))
}