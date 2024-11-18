// NavBarButtons.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ConfigIcon, HomeIcon, SettingsIcon, SettingsIconOpenMenu } from '../../../assets/Icons';

export function NavBarSmallScreenSettingsButtons ({ user, location, menuOpen, toggleMenu, toggleConfig, handleGoBack, showHomeButton }) {
  {/* Botón de Settings visible en todas las pantallas. Con el hidden controlo que aparezca en pantallas pequeñas solamente. Configuración del detalle específico de cada juego con /game */}
  return (
    user.id ? (
      location.pathname === '/' ?
        <div className="flex items-center justify-between w-full sm:w-0">
          <button className="flex items-center p-1 space-x-2 text-white rounded hover:bg-slate-800 sm:hidden" onClick={toggleMenu}>
            {!menuOpen ? <SettingsIcon/> : <SettingsIconOpenMenu/>}
          </button>
          <button className="sm:hidden" onClick={toggleConfig}>
            <div className="p-1 transition duration-500 rounded hover:bg-slate-800">
              <ConfigIcon />
            </div>
          </button>
        </div>
        :
        <div>         
          <div className="flex items-center gap-2">
            { showHomeButton && <Link to='/'><div className="p-1 transition duration-500 rounded-lg sm:mt-3 sm:ml-3 lg:mt-4 lg:ml-4 bg-slate-900 hover:bg-slate-700"><HomeIcon w={6} h={6}/></div></Link>}
            <button className={`flex items-center gap-1 p-2 sm:mt-3 lg:mt-4 ${!showHomeButton && 'sm:ml-3'} transition duration-500 rounded-lg bg-slate-900 hover:bg-green-700`} onClick={handleGoBack}>{!showHomeButton && <ArrowLeft w={4} h={4} />}<p className="p-.05 text-xs lg:text-sm">Volver</p></button>
          </div>
        </div> 
    ) : ''
  );
}
