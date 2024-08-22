/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export function MenuPCPlatforms({isScrolledIndex}) {
  return (
    <div className={`${isScrolledIndex ? 'bg-slate-950' : 'bg-transparent'} flex flex-col items-start gap-3 w-30 absolute -top-2.5 sm:-top-2.5 right-[-120px] sm:left-[-110px] rounded-lg z-10 p-2.5 sm:w-[100px]`} 
    // style={{ position: 'absolute', top: 30, left: -80,  zIndex: '10', padding: '10px' }}
    >
        <Link to="/admin-add-game-to-list-by-platform/Steam">
            <div className="flex items-center justify-start w-full gap-1 p-1 text-xs transition duration-300 rounded-lg hover:bg-slate-800">Steam</div>
        </Link>
        {/* <Link to="/admin-add-game-to-list-by-platform/NES">
            <div className="flex items-center justify-start w-full gap-1 p-1 text-xs transition duration-300 rounded-lg hover:bg-slate-800">NES</div>
        </Link>
        <Link to="/admin-add-game-to-list-by-platform/SEGA MegaDrive">
            <div className="flex items-center justify-start w-full gap-1 p-1 text-xs transition duration-300 rounded-lg hover:bg-slate-800">MegaDrive</div>
        </Link> */}
    </div>
  )
}
