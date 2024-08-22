/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export function MenuPSPlatforms({isScrolledIndex }) {
  return (
    <div className={`${isScrolledIndex ? 'bg-slate-950' : 'bg-transparent'} flex flex-col items-start gap-3 w-2/3 absolute -top-2.5 right-[-60px] sm:left-[-60px] z-10 p-2.5 rounded-lg`} 
    // style={{ position: 'absolute', top: 0, left: -60,  zIndex: '10', padding: '10px' }}
    >
        <Link to="/admin-add-game-to-list-by-platform/PS5">
            <div className="flex items-center justify-start w-full gap-1 p-1 text-xs transition duration-300 rounded-lg hover:bg-slate-800">PS5</div>
        </Link>
        <Link to="/admin-add-game-to-list-by-platform/PS4">
            <div className="flex items-center justify-start w-full gap-1 p-1 text-xs transition duration-300 rounded-lg hover:bg-slate-800">PS4</div>
        </Link>
        <Link to="/admin-add-game-to-list-by-platform/PS3">
            <div className="flex items-center justify-start w-full gap-1 p-1 text-xs transition duration-300 rounded-lg hover:bg-slate-800">PS3</div>
        </Link>
        <Link to="/admin-add-game-to-list-by-platform/PS2">
            <div className="flex items-center justify-start w-full gap-1 p-1 text-xs transition duration-300 rounded-lg hover:bg-slate-800">PS2</div>
        </Link>
        <Link to="/admin-add-game-to-list-by-platform/PS1">
            <div className="flex items-center justify-start w-full gap-1 p-1 text-xs transition duration-300 rounded-lg hover:bg-slate-800">PS1</div>
        </Link>
    </div>
  )
}
