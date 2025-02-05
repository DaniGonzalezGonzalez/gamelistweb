import { Link } from "react-router-dom"
import { ArrowRight } from "../../../../../assets/Icons"
import { scrollToTop } from "../../../../helpers/constants/constants"

export const TitleCollection = (titleCollection, linkTo) => {
    // Antes el h2 era text-xl
    return (
        <>
            <div className="flex items-center gap-1 pb-1">
                <div className="p-0 transition duration-500 ease-in-out border-2 border-transparent rounded hover:border-gradient">
                    <div className="flex items-center gap-3 px-2 py-1 rounded-md sm:px-2 bg-slate-950">     
                    <Link onClick={scrollToTop} className="flex items-center justify-end gap-1 text-xs font-thin" to={linkTo}>
                        <h2 className="relative z-20 flex gap-4 text-[15px] font-normal capitalize lg:text-xl sm:text-base">{titleCollection}</h2>
                        <div className="flex items-center gap-2 text-xs"><ArrowRight /></div>
                    </Link>
                    </div>
                </div>
                </div>
        </>
    )
}