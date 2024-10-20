import { Link } from "react-router-dom"
import { AbandonadoIcon, ArrowRight, PauseIcon, StartIcon, UpdateIcon } from "../../../assets/Icons"
import { GET_STATE_BACKGROUND, scrollToTop } from "../../helpers/no-components/constants"

export function InfoHomePageResto() {       
    return (
        <>
            <div className="relative p-8 sm:px-12" >
                {/* <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 1), rgba(3, 7, 18, 1))', backgroundSize: 'cover', backgroundPosition: 'center center', height: '10%' }}/> */}
                <div className="grid gap-10 mt-8 border border-gray-500 sm:mt-14 p-9 rounded-xl sm:grid-cols-2 sm:justify-evenly">
                    <Link onClick={scrollToTop} to="/edit-game-to-list-otra-vez">
                        <div className="flex items-center justify-between gap-5 px-3 sm:px-6">
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
                        <div className="flex items-center justify-between gap-5 px-3">
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
                        <div className="flex items-center justify-between gap-5 px-3 sm:px-6">
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
                        <div className="flex items-center justify-between gap-5 px-3">
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
