import { ArchiveIcon, DeleteIcon, EditIcon, HomeIcon, PlusIcon, SearchIcon, UpdateIcon } from "../../../../assets/Icons";

export function FAQSignificadoIcons() {

  return (
    <div className="px-4 bg-white rounded-lg shadow-lg py-7 lg:p-7">
      <h2 className="mb-10 text-xl font-bold text-gray-800 uppercase">Significado de los iconos</h2>

      <div className="flex flex-col gap-5 p-4 mb-10 transition duration-300 shadow-lg rounded-2xl hover:bg-blue-50">
         <div className="flex flex-col items-start gap-5">
          <div className="flex flex-col w-full gap-3 text-sm text-justify text-gray-700 lg:text-base">
            <div className="flex items-center gap-2">
              <button className="px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-thin text-white transition duration-500 bg-gray-800 rounded-lg hover:bg-blue-700 shadow shadow-black"><HomeIcon/>
              </button>
              <span><span className="font-bold">Inicio</span>: para regresar a la página principal.</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-thin text-white transition duration-500 bg-gray-800 rounded-lg hover:bg-blue-700 shadow shadow-black"><ArchiveIcon/>
              </button>
              <span><span className="font-bold">Mis juegos</span>: listado completo de tus juegos añadidos a listas.</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-thin text-white transition duration-500 bg-gray-800 rounded-lg hover:bg-blue-700 shadow shadow-black"><SearchIcon/>
              </button>
              <span><span className="font-bold">Buscar</span>: para buscar en el catálogo de juegos de la web.</span>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col gap-5 p-4 transition duration-300 shadow-lg lg:p-4 rounded-2xl hover:bg-blue-50">
        <h3 className="text-base font-bold text-gray-800 text-start">En la ficha del juego</h3>
        {/* Icono de edición */}
        <div className="flex flex-col gap-2 lg:p-6 sm:items-start sm:flex-row">
          <div className="flex items-center justify-center w-full gap-2 lg:gap-6">
            <button className="w-20 h-20 sm:w-32 lg:w-36 px-2 sm:px-3 py-1 mt-2 text-[11px] sm:text-xs text-white transition duration-500 bg-gray-800 rounded-2xl sm:mt-8 hover:bg-blue-700 shadow shadow-black">
              <div className="flex flex-col items-center justify-center p-1">
                <EditIcon />
                <p>Editar estado</p>
              </div>
            </button>
            <button className="w-20 h-20 sm:w-32 lg:w-36 px-2 sm:px-3 py-1 mt-2 text-[11px] sm:text-xs text-white transition duration-500 bg-gray-800 rounded-2xl sm:mt-8 hover:bg-green-700 shadow shadow-black">
              <div className="flex flex-col items-center justify-center p-1">
                <PlusIcon />
                <p>Editar nota</p>
              </div>
            </button>
            <button className="w-20 h-20 sm:w-32 lg:w-36 px-2 sm:px-3 py-1 mt-2 text-[11px] sm:text-xs text-white transition duration-500 bg-gray-800 rounded-2xl sm:mt-8 hover:bg-purple-700 shadow shadow-black">
              <div className="flex flex-col items-center justify-center p-1">
                <UpdateIcon />
                <p>¿Rejugando?</p>
              </div>
            </button>
          </div>
      </div>

        <div className="flex flex-col items-start gap-5">
          <div className="w-full text-sm text-justify text-gray-700 lg:text-base">
            <p className="mt-3">
              Editar estado: el <span className="font-bold">ESTADO</span> es crucial para organizar los juegos en diferentes listas (Jugando, Terminados, etc.). Podrás cambiarlo en cualquier momento. Aquí también está la opción de <span className="font-semibold">eliminar</span> el juego de tu colección.
            </p>
            <p className="mt-4">
              Editar nota: La <span className="font-bold">NOTA</span> se puede cambiar en cualquier momento y se reflejará tanto en la ficha del juego como en la lista donde se encuentre.
            </p>
            <p className="mt-3">
              La opción de <span className="font-bold">REJUGANDO</span> solo aparece en ciertas categorías y señala si el juego ya ha sido jugado previamente. El icono correspondiente se mostrará en la imagen del juego.
            </p>
          </div>
        </div>
      </div>

      {/* Icono de eliminar */}
      <div className="flex flex-col items-center gap-8 mt-20 lg:p-6 2xl:items-start 2xl:flex-row">
        <button className="flex items-center gap-2 p-5 text-sm font-bold text-center text-white transition duration-500 bg-gray-800 shadow rounded-2xl hover:bg-red-700 shadow-black">
          <span>Eliminar de mis listas </span><DeleteIcon w={5} h={5} />
        </button>

        <div className="flex flex-col items-start gap-5">
          <div className="w-full text-sm text-justify text-gray-700 lg:text-base">
            <span className="font-bold">Icono de eliminar:</span> Este botón aparece en Editar estado.
            <p className="mt-4">
              Para evitar errores, al hacer clic en el botón, se mostrará una ventana emergente de confirmación. Si se acepta, el juego será eliminado, de lo contrario, permanecerá en tu colección.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
