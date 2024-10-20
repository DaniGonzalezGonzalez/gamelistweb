import { DeleteIcon, EditIcon } from "../../../../assets/Icons";

export function FAQSignificadoIcons() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-7">
      <h2 className="mb-10 text-xl font-bold text-gray-800 uppercase">Significado de los iconos</h2>

      {/* Icono de edición */}
      <div className="flex flex-col items-center gap-8 lg:p-6 sm:items-start sm:flex-row">
        <button className="w-20 h-20 sm:w-32 lg:w-36 px-2 sm:px-3 py-1 mt-2 text-[11px] sm:text-xs font-thin text-white transition duration-500 bg-gray-800 rounded-2xl sm:mt-8 hover:bg-blue-700 shadow-lg shadow-black">
          <div className="flex flex-col items-center justify-center p-1">
            <EditIcon />
            <p>Editar</p>
          </div>
        </button>

        <div className="flex flex-col items-start gap-5">
          <div className="w-full text-sm text-justify text-gray-700 lg:text-base">
            <span className="font-bold">Icono de edición:</span> Permite editar datos del juego, como la nota, estado o si se está rejugando.
            <p className="mt-4">
              La <span className="font-bold">NOTA</span> se puede cambiar en cualquier momento y se reflejará tanto en la ficha del juego como en la categoría donde se encuentre.
            </p>
            <p className="mt-3">
              El <span className="font-bold">ESTADO</span> es crucial para organizar los juegos en diferentes categorías (Jugando, Terminados, etc.). Podrás cambiarlo en cualquier momento. Aquí también está la opción de <span className="font-semibold">eliminar</span> el juego de tu colección.
            </p>
            <p className="mt-3">
              La opción de <span className="font-bold">REJUGANDO</span> solo aparece en ciertas categorías y señala si el juego ya ha sido jugado previamente. El icono correspondiente se mostrará en la imagen del juego.
            </p>
          </div>
        </div>
      </div>

      {/* Icono de eliminar */}
      <div className="flex flex-col items-center gap-8 mt-20 lg:p-6 sm:items-start sm:flex-row">
        <button className="p-5 text-sm font-bold text-center text-white transition duration-500 bg-gray-800 shadow-lg rounded-2xl hover:bg-red-700 shadow-black">
          <DeleteIcon w={7} h={7} />
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
