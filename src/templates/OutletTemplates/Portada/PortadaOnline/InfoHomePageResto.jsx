import { Link } from "react-router-dom"
import { AbandonadoIcon, ArrowRight, PauseIcon, StartIcon, UpdateIcon } from "../../../../assets/Icons"
import { GET_STATE_BACKGROUND, scrollToTop } from "../../../helpers/constants/constants"

export function InfoHomePageResto() {       
    return (
        <>
            <div className="relative p-8 sm:px-12 lg:pr-14 lg:pl-16" >
                <h2 className="relative z-20 pb-4 mt-8 mb-2 text-xl font-bold uppercase lg:pb-8 sm:mt-0 lg:mt-12 lg:text-xl sm:text-base">Otras colecciones</h2>
                {/* Acceso a otras colecciones */}
                <div className="grid gap-10 border border-gray-500 p-9 rounded-xl sm:grid-cols-2 lg:grid-cols-4 sm:justify-evenly lg:items-center">
                    <Link onClick={scrollToTop} to="/edit-game-to-list-otra-vez">
                        <div className="flex items-center justify-between gap-5 px-1 sm:gap-1 xl:gap-5 xl:px-3">
                            <div className="flex items-center gap-3">
                                <div className={`p-1 ${GET_STATE_BACKGROUND('Otra vez')} rounded`}><UpdateIcon/></div>
                                <div>
                                    <h3 className="uppercase">Otra Vez</h3>
                                    <p className="pt-1 text-xs">¡Quiero repetir!</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="px-3 py-1 text-white"><ArrowRight/></div>
                            </div>
                        </div> 
                    </Link>

                    <Link onClick={scrollToTop} to="/edit-game-to-list-lista-de-deseos">
                        <div className="flex items-center justify-between gap-5 px-1 sm:gap-1 xl:gap-5 xl:px-3">
                            <div className="flex items-center gap-3">
                                <div className={`p-1 ${GET_STATE_BACKGROUND('Lista de deseos')} rounded`}><StartIcon/></div>
                                <div>
                                    <h3 className="uppercase">Lista de deseos</h3>
                                    <p className="pt-1 text-xs">¡Lo quiero!</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="px-3 py-1 text-white"><ArrowRight/></div>
                            </div>
                        </div>
                    </Link>

                    <Link onClick={scrollToTop} to="/edit-game-to-list-pausados">
                        <div className="flex items-center justify-between gap-5 px-1 sm:gap-1 xl:gap-5 xl:px-3">
                            <div className="flex items-center gap-3">
                                <div className={`p-1 ${GET_STATE_BACKGROUND('Pausado')} rounded`}><PauseIcon/></div>
                                <div>
                                    <h3 className="uppercase">Pausados</h3>
                                    <p className="pt-1 text-xs">Dándole una vuelta</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="px-3 py-1 text-white"><ArrowRight/></div>
                            </div>
                        </div>
                    </Link>

                    <Link onClick={scrollToTop}  to="/edit-game-to-list-abandonados">
                        <div className="flex items-center justify-between gap-5 px-1 sm:gap-1 xl:gap-5 xl:px-3">
                            <div className="flex items-center gap-3">
                                <div className={`p-1 ${GET_STATE_BACKGROUND('Abandonado')} rounded`}><AbandonadoIcon/></div>
                                <div>
                                    <h3 className="uppercase">Abandonados</h3>
                                    <p className="pt-1 text-xs">No pienso volver</p>
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
