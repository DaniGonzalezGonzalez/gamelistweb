/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export function MenuNintendoPlatforms({isScrolledIndex}) {
  return (
    <div className={`${isScrolledIndex ? 'bg-slate-950' : 'bg-transparent'} flex flex-col items-start gap-3 w-30 absolute -top-12 sm:-top-12 sm:left-[-120px] right-[-135px] rounded-lg z-10 p-2.5 w-[110px]`} 
    // style={{ position: 'absolute', top: 30, left: -80,  zIndex: '10', padding: '10px' }}
    >
        <Link to="/admin-add-game-to-list-by-platform/Nintendo Switch">
            <div className="flex items-center justify-start w-full gap-1 p-1 text-xs transition duration-300 rounded-lg hover:bg-slate-800">Switch</div>
        </Link>
        <Link to="/admin-add-game-to-list-by-platform/WiiU">
            <div className="flex items-center justify-start w-full gap-1 p-1 text-xs transition duration-300 rounded-lg hover:bg-slate-800">WiiU</div>
        </Link>
        <Link to="/admin-add-game-to-list-by-platform/Wii">
            <div className="flex items-center justify-start w-full gap-1 p-1 text-xs transition duration-300 rounded-lg hover:bg-slate-800">Wii</div>
        </Link>
        <Link to="/admin-add-game-to-list-by-platform/GameCube">
            <div className="flex items-center justify-start w-full gap-1 p-1 text-xs transition duration-300 rounded-lg hover:bg-slate-800">GameCube</div>
        </Link>
        <Link to="/admin-add-game-to-list-by-platform/Nintendo 64">
            <div className="flex items-center justify-start w-full gap-1 p-1 text-xs transition duration-300 rounded-lg hover:bg-slate-800 text-start">Nintendo 64</div>
        </Link>
    </div>
  )
}
