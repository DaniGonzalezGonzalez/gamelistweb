// NavBarButtons.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArchiveIcon, ArrowLeft, ConfigIcon, HomeIcon, SearchIcon, SettingsIcon, SettingsIconOpenMenu } from '../../../assets/Icons';
import { CommunityIcon } from '../../../assets/Icons/CommunityIcon';
import { ProfileIcon } from '../../../assets/Icons/ProfileIcon';
import { useHandles } from '../../../hooks/useHandles';
import { scrollToTop } from '../../helpers/constants/constants';

export function NavBarSmallScreenSettingsButtons ({ user, location, menuOpen, toggleMenu, toggleConfig, handleGoBack, showHomeButton }) {
  {/* Botón de Settings visible en todas las pantallas. Con el hidden controlo que aparezca en pantallas pequeñas solamente. Configuración del detalle específico de cada juego con /game */}
  // const navigate = useNavigate()

  // const handleScrollToSection = async (id) => {
  //   if (location.pathname !== "/") {
  //     // Navega a la raíz si no estás en ella
  //     await navigate("/")
  //   }

  //   // Desplaza al div con el ID correspondiente
  //   const section = document.getElementById(id)
  //   if (section) {
  //     section.scrollIntoView()
  //   }
  // }

  const { handleScrollToSection } = useHandles()


  return (
    user.id ? (
      location.pathname === '/' ?
        <div className="grid items-center justify-between w-full grid-cols-5 sm:w-0">
          {/* <button className="flex items-center p-1 space-x-2 text-white rounded hover:bg-slate-800 sm:hidden" onClick={toggleMenu}>
            {!menuOpen ? <SettingsIcon/> : <SettingsIconOpenMenu/>}
          </button> */}          
          <button className="sm:hidden" onClick={() => handleScrollToSection("indice-infohomepage-jugando")}>
            <div className="flex flex-col items-center justify-center p-1 transition duration-500 rounded hover:bg-slate-800">
              <ArchiveIcon w={5} h={5}/>
              <p className='text-[9px]'>Mis listas</p>
            </div>
          </button>
          <button className="sm:hidden" onClick={() => handleScrollToSection("explora-el-catalogo")}>
            <div className="flex flex-col items-center justify-center p-1 transition duration-500 rounded hover:bg-slate-800">
              <SearchIcon w={5} h={5} />
              <p className='text-[9px]'>Buscar</p>
            </div>
          </button>
          <Link to={'/user-profile'} className="sm:hidden">
            <div className="flex flex-col items-center justify-center p-1 transition duration-500 rounded hover:bg-slate-800">
              <ProfileIcon w={5} h={5} />
              <p className='text-[9px]'>Perfil</p>
            </div>
          </Link>
          <Link className="sm:hidden" to='/community'>
            <div className="flex flex-col items-center justify-center p-1 transition duration-500 rounded hover:bg-slate-800">
              <CommunityIcon w={5} h={5} />
              <p className='text-[9px]'>Comunidad</p>
            </div>
          </Link>
          {/* <button className="sm:hidden" onClick={toggleConfig}>
            <div className="p-1 transition duration-500 rounded hover:bg-slate-800">
              <ConfigIcon />
            </div>
          </button> */}
          <button className="sm:hidden" onClick={toggleConfig}>
            <div className="flex flex-col items-center justify-center p-1 transition duration-500 rounded hover:bg-slate-800">
              <ConfigIcon  w={5} h={5} />
              <p className='text-[9px]'>Ajustes</p>
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
