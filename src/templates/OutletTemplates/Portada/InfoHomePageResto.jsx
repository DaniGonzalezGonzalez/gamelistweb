import { Link } from "react-router-dom";
import { ListIcon } from "../../../assets/Icons/ListIcon";
import { scrollToTop } from "../../helpers/no-components/constants";
import { ArrowRight } from "../../../assets/Icons/ArrowRight";
import { CheckIcon2 } from "../../../assets/Icons/CheckIcon2";
import { UpdateIcon } from "../../../assets/Icons/UpdateIcon";
import { StartIcon } from "../../../assets/Icons/StarIcon";
import { PauseIcon } from "../../../assets/Icons/PauseIcon";
import { AbandonadoIcon } from "../../../assets/Icons/AbandonadoIcon";


export function InfoHomePageResto() {
       
    return (
        <>
            {/* Fondo oscuro */}
            <div className="relative p-8 bg-gray-950" >
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(2, 6, 23, 1), rgba(3, 7, 18, 1))', backgroundSize: 'cover', backgroundPosition: 'center center', height: '10%' }}/>
                {/* <div className="absolute bottom-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))', backgroundSize: 'cover', backgroundPosition: 'center center', height: '40%' }}/>
                 */}

                {/* <h2 className="relative z-20 pb-8 mb-12 text-xl font-bold uppercase my-36">Resto</h2> */}

                <div className="grid gap-10 border border-gray-500 mt-14 sm:mt-14 p-9 rounded-xl sm:grid-cols-2 sm:justify-evenly">

                        {/* <div className="flex items-center justify-between gap-5 px-3 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="p-1 bg-blue-800 rounded"><ListIcon/></div>
                                <div>
                                    <h3 className="uppercase">En lista</h3>
                                    <p className="pt-1 text-xs">Juegos pendientes</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <Link onClick={scrollToTop} className="px-3 py-1 text-white" to="/admin-edit-game-to-list-en-lista">
                                <div><ArrowRight/></div>
                                </Link>
                            </div>
                        </div> */}

                        {/* <div className="flex items-center justify-between gap-5 px-3 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="p-1 bg-green-800 rounded"><CheckIcon2/></div>
                                <div>
                                    <h3 className="uppercase">Hº Terminados</h3>
                                    <p className="pt-1 text-xs">Pasados hace tiempo</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <Link onClick={scrollToTop} className="px-3 py-1 text-white" to="/admin-edit-game-to-list-terminados">
                                <div><ArrowRight/></div>
                                </Link>
                            </div>
                        </div> */}

                    <Link onClick={scrollToTop} to="/admin-edit-game-to-list-rejugar">
                        <div className="flex items-center justify-between gap-5 px-3 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="p-1 bg-purple-700 rounded"><UpdateIcon/></div>
                                <div>
                                    <h3 className="uppercase">Rejugar</h3>
                                    <p className="pt-1 text-xs">¡Quiero repetir!</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="px-3 py-1 text-white"><ArrowRight/></div>
                            </div>
                        </div> 
                    </Link>

                    <Link onClick={scrollToTop} to="/admin-edit-game-to-list-lista-de-deseos">
                        <div className="flex items-center justify-between gap-5 px-3 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="p-1 bg-orange-700 rounded"><StartIcon/></div>
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

                    <Link onClick={scrollToTop} to="/admin-edit-game-to-list-pausados">
                        <div className="flex items-center justify-between gap-5 px-3 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="p-1 bg-yellow-600 rounded"><PauseIcon/></div>
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

                    <Link onClick={scrollToTop}  to="/admin-edit-game-to-list-abandonados">
                        <div className="flex items-center justify-between gap-5 px-3 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="p-1 bg-red-700 rounded"><AbandonadoIcon/></div>
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
