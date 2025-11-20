import { Link } from "react-router-dom"
import { AbandonadoIcon, ArchiveIcon, ArrowRight, PauseIcon, StartIcon, UpdateIcon } from "../../../../assets/Icons"
import { useVisibilityObserver } from "../../../../hooks/useVisibilityObserver";
import { GET_STATE_BACKGROUND, scrollToTop } from "../../../helpers/constants/constants"

export function InfoHomePageResto() {    
    const threshold = window.innerWidth < 768 ? 0.2 : 0.4;
    const visibleItems = useVisibilityObserver(".observed-item", threshold, ["otros-block"]);
   
    return (
        <>
            <div data-id="otros-block" className={`observed-item relative px-4 pb-4 pt-1 sm:px-8 sm:pl-20 lg:pt-4 lg:px-12 lg:pr-8 lg:pl-24 transition duration-1000 ease-out ${visibleItems["otros-block"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} >
                <h2 className="relative z-20 pb-2 mt-0 mb-2 sm:mb-0 text-[15px] font-medium capitalize sm:pb-3 lg:pb-3 sm:mt-0 lg:mt-0 lg:text-xl sm:text-base">Otros</h2>
                {/* Acceso a otras colecciones */}
                <div className="grid gap-2 p-5 border border-gray-500 lg:gap-6 py-7 sm:p-2 lg:p-9 rounded-xl sm:grid-cols-2 lg:grid-cols-5 sm:justify-evenly lg:items-center">
                    <Link onClick={scrollToTop} to="/edit-game-to-list-otra-vez">
                        <div className="flex items-center justify-between gap-5 p-2 transition duration-300 rounded sm:gap-1 xl:gap-5 xl:px-3 hover:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <div className={`p-1 ${GET_STATE_BACKGROUND('Otra vez')} rounded`}><UpdateIcon/></div>
                                <div>
                                    <h3 className="font-bold capitalize">Otra Vez</h3>
                                    <p className="pt-1 text-[11px] lg:text-xs">¡Quiero repetir!</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="px-3 py-1 text-white"><ArrowRight/></div>
                            </div>
                        </div> 
                    </Link>

                    <Link onClick={scrollToTop} to="/edit-game-to-list-lista-de-deseos">
                        <div className="flex items-center justify-between gap-5 p-2 transition duration-300 rounded sm:gap-1 xl:gap-5 xl:px-3 hover:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <div className={`p-1 ${GET_STATE_BACKGROUND('Lista de deseos')} rounded`}><StartIcon/></div>
                                <div>
                                    <h3 className="font-bold capitalize">Lista de deseos</h3>
                                    <p className="pt-1 text-[11px] lg:text-xs">¡Lo quiero!</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="px-3 py-1 text-white"><ArrowRight/></div>
                            </div>
                        </div>
                    </Link>

                    <Link onClick={scrollToTop} to="/edit-game-to-list-pausados">
                        <div className="flex items-center justify-between gap-5 p-2 transition duration-300 rounded sm:gap-1 xl:gap-5 xl:px-3 hover:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <div className={`p-1 ${GET_STATE_BACKGROUND('Pausado')} rounded`}><PauseIcon/></div>
                                <div>
                                    <h3 className="font-bold capitalize">Pausados</h3>
                                    <p className="pt-1 text-[11px] lg:text-xs">Dándole una vuelta</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="px-3 py-1 text-white"><ArrowRight/></div>
                            </div>
                        </div>
                    </Link>

                    <Link onClick={scrollToTop} to="/edit-game-to-list-abandonados">
                        <div className="flex items-center justify-between gap-5 p-2 transition duration-300 rounded sm:gap-1 xl:gap-5 xl:px-3 hover:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <div className={`p-1 ${GET_STATE_BACKGROUND('Abandonado')} rounded`}><AbandonadoIcon/></div>
                                <div>
                                    <h3 className="font-bold capitalize">Abandonados</h3>
                                    <p className="pt-1 text-[11px] lg:text-xs">No pienso volver</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="px-3 py-1 text-white"><ArrowRight/></div>
                            </div>
                        </div>
                    </Link>

                    <Link onClick={scrollToTop} to="/edit-game-to-list-completa">
                        <div className="flex items-center justify-between gap-5 p-2 transition duration-300 rounded sm:gap-1 xl:gap-5 xl:px-3 hover:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <div className={`p-1 bg-blue-600 rounded`}><ArchiveIcon/></div>
                                <div>
                                    <h3 className="font-bold capitalize">Todos mis juegos</h3>
                                    <p className="pt-1 text-[11px] lg:text-xs">Mi biblioteca completa</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="px-3 py-1 text-white"><ArrowRight/></div>
                            </div>
                        </div>
                    </Link>
                </div>           
            </div>
        </>
    )
}
