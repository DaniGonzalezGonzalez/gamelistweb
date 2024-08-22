import { Link, useNavigate } from "react-router-dom";
import { useGetDataPortadaPorEstado } from "../../../hooks/Portada/useGetDataPortadaPorEstado";
import { cleanTitle, scrollToTop } from "../../helpers/no-components/constants";
import { CheckIcon } from "../../../assets/Icons/CheckIcon";
import { ArrowRight } from "../../../assets/Icons/ArrowRight";
import { useEffect, useState } from "react";
import { fetchPlatformImagesPortada } from "../../../hooks/useFetchsPlatforms";

// import { HomePageSkeleton } from "../../../helpers/components/Skeletons/HomePageSkeleton";

export function InfoHomePageTerminados() {
    const { juegosPortada, error, isLoading } = useGetDataPortadaPorEstado('Terminado');
    const navigate = useNavigate() // Usa useNavigate
    const [platformImages, setPlatformImages] = useState({});

    useEffect(() => {
        fetchPlatformImagesPortada(juegosPortada, platformImages, setPlatformImages)
      }, [juegosPortada]);

    
    if (isLoading) {
        return 
        // <HomePageSkeleton/>
        
      }
    
      if (error) {
        return <div>
            {/* Error: {error} */}
            </div>;
      }

                // Ordenar juegos por fecha de actualización
    const juegosOrdenados = juegosPortada.sort((a, b) => new Date(b.fechaActualizacion) - new Date(a.fechaActualizacion));

    // Limitar la cantidad de juegos mostrados a 2
    const juegosLimitados = juegosOrdenados.slice(0, 4);

    const handleTitleClick = (gameId) => {
        scrollToTop()
        navigate(`/game/${'Juegos'}/${gameId}`)
    }

    return (
        <>
            <div className="relative p-8 sm:px-16 bg-zinc-950">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(3, 7, 18, 1), rgba(9, 9, 11, 1))', backgroundSize: 'cover', backgroundPosition: 'center center', height: '20%' }}/>
                <h2 className="relative z-20 pb-8 mt-12 mb-2 text-xl font-bold uppercase">Terminados</h2>
                <div className="relative z-10 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {juegosLimitados.map((item, index) => (
                        <div key={index}>
                            <div className="flex items-center justify-center gap-1 duration-500 xl:px-2 sm:flex hover:scale-105 hover:shadow-white opacity-95 hover:opacity-100">
                                <div className="w-full h-full">
                                    <button onClick={() => handleTitleClick(item.id)} className="relative flex items-center justify-center w-full gap-3 shadow-md sm:flex hover:rounded">
                                        <img className="object-cover w-full h-40 transition duration-500 ease-in-out border-2 border-transparent rounded-lg hover:border-2 hover:rounded-lg hover:border-gray-300" src={item?.imageUrl} alt="No hay imagen" />
                                        <img className="absolute object-contain w-8 h-8 p-1 bg-gray-200 rounded-lg shadow right-2 bottom-2 shadow-black" src={platformImages[item.plataforma]} alt="No hay imagen" title={`Plataforma: ${item?.plataforma || 'Sin plataforma especificada'}`} />
                                    </button>
                                    <div className="sm:w-2/3">
                                        <div className="flex flex-col gap-8 py-3 text-start">
                                            <p className="text-xs text-gray-200">{cleanTitle(item?.titulo)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center p-1 bg-green-600 rounded"><CheckIcon /></div>
                    <Link onClick={scrollToTop} className="flex items-center justify-end gap-3 text-xs font-thin" to="/admin-edit-game-to-list-terminados">
                        Ver todos<div className="flex items-center gap-2 text-xs">
                            {/* {juegosOrdenados.length} */}
                            <ArrowRight /></div>
                    </Link>
                </div>
            </div>
        </>
    )
}
