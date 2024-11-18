import { ArrowRight } from "../../../../assets/Icons"
import { cleanTitle } from "../../../helpers/constants/constants"

export const GameInfo = ({ juego }) => {
    return (
        <div className="p-4 mt-4 border border-gray-500 lg:p-6 lg:mt-10 rounded-xl">
            <h3 className="text-base font-bold lg:text-2xl text-start">Información</h3>
            <p className="mt-5 text-xs text-justify">Género: {juego.genero}</p>
            <p className="mt-5 text-xs text-justify">Año de lanzamiento: {juego.lanzamiento}</p>
            <p className="mt-5 text-xs text-justify">Plataformas: {juego.plataforma}</p>
            <div className="flex items-center justify-start gap-5 mt-5 text-xs">
                <p className="flex items-center gap-2 text-start">
                    {cleanTitle(juego?.titulo)} 
                    <ArrowRight w={4} h={4} />
                </p>
                <div className="w-6 h-6">
                    <a href={juego.linkMetacritic}>
                        <img src="/Metacritic-logo.png" alt="Logo metacritic" />
                    </a>
                </div>
            </div>
        </div>
    )
}
