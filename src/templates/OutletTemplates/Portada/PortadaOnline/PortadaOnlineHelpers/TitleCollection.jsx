import { Link } from "react-router-dom"
import { ArrowRight } from "../../../../../assets/Icons"
import { scrollToTop } from "../../../../helpers/constants/constants"

export const TitleCollection = (titleCollection, linkTo) => {
    return (
        <>
            <div className="flex items-center gap-1 pb-1 mt-4 lg:pb-5">
                <div className="p-0 transition duration-500 ease-in-out border-2 border-transparent rounded hover:border-gradient">
                    <div className="flex items-center gap-3 px-2 py-1 rounded-md bg-slate-950">     
                    <Link onClick={scrollToTop} className="flex items-center justify-end gap-1 text-xs font-thin" to={linkTo}>
                        <h2 className="relative z-20 flex gap-4 text-xl font-semibold uppercase lg:text-xl sm:text-base">{titleCollection}</h2>
                        <div className="flex items-center gap-2 text-xs"><ArrowRight /></div>
                    </Link>
                    </div>
                </div>
                </div>
        </>
    )
}