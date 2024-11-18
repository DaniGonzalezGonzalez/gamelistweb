import { Link } from "react-router-dom"
import { HelpIcon } from "../../../assets/Icons/HelpIcon"
import { ProfileIcon } from "../../../assets/Icons/ProfileIcon"

export const configOptions = (configOpen, user, linkToContent, toggleConfig, handleLogout) => {
    if (!configOpen) return null;
  // Función para cerrar el menú si se hace clic fuera
  const handleClickOutside = (e) => {
    if (e.target.id === 'config-overlay') {
      toggleConfig();
    }
  }

  return (
    <div id="config-overlay" // Este ID lo usaremos para detectar el clic fuera del menú
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutside} // Llamamos a la función cuando se hace clic en cualquier parte del overlay
    >
      {/* Menú centrado */}
      <div className="relative z-50 flex flex-col justify-center gap-3 p-6 text-xs text-white rounded-lg shadow-2xl bg-slate-800 lg:text-sm font-montserrat" onClick={(e) => e.stopPropagation()}>

        {/* Links de ayuda, perfil y cerrar sesión */}
        { user.id && 
            <div className="flex flex-col items-center justify-center gap-6 lg:gap-14 lg:p-20">
                <div className="flex flex-col gap-3 sm:gap-5 sm:flex-row lg:gap-14">
                  <Link onClick={toggleConfig} to='/faq' className="flex justify-end gap-2 text-end">
                    <div className="flex flex-col items-center justify-center w-32 gap-3 text-sm transition duration-500 shadow-md h-28 lg:h-60 lg:w-60 bg-slate-600 rounded-3xl hover:bg-gray-700 lg:text-xl shadow-slate-900"><HelpIcon/> <span>Ayuda</span></div>
                  </Link>
                  <Link onClick={toggleConfig} to='/user-profile' className="flex justify-end gap-2 text-end">
                  <div className="flex flex-col items-center justify-center w-32 gap-3 text-sm transition duration-500 shadow-md h-28 lg:h-60 lg:w-60 bg-slate-600 rounded-3xl hover:bg-gray-700 lg:text-xl shadow-slate-900"><ProfileIcon/><span>Perfil</span></div>
                  </Link>
                </div>
            </div>        
        }

        {/* Botón de cierre en la esquina superior derecha */}
        <div className="flex justify-center w-full">
          <button className="w-32 p-2 mt-2 text-white transition duration-500 rounded-lg shadow-md lg:mb-4 bg-slate-600 hover:bg-slate-500 hover:shadow-lg" onClick={toggleConfig}>Volver
          </button>
        </div>

        <button className="flex justify-center gap-2 mt-10 text-end" onClick={handleLogout}>
          <div className="flex items-center justify-end gap-2 p-2 px-4 transition duration-500 bg-red-900 rounded-lg shadow-sm hover:bg-red-600 shadow-slate-900">
            Cerrar sesión
          </div>
        </button>

        <div className="flex justify-center gap-2">  
          {(user.id && user.email === import.meta.env.VITE_ADMIN_EMAIL) && (
            <button className="p-1 rounded bg-slate-700" onClick={linkToContent}>
              <Link onClick={toggleConfig} to='/admin-add-content'>Añadir a BD</Link>
            </button>
          )}
          {(user.id && user.email === import.meta.env.VITE_ADMIN_EMAIL) && (
            <button className="p-1 rounded bg-slate-700" onClick={linkToContent}>
              <Link onClick={toggleConfig} to='/admin-edit-content'>Editar BD</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}