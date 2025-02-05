import { AbandonadoIcon, CheckIcon, CompleteIcon, DeleteIcon, PauseIcon, PlayIcon, ProximosIcon, StartIcon, UpdateIcon } from "../../../../assets/Icons"

export function FAQCategories() {

return (
  <div className="rounded-lg shadow-lg p-7 bg-slate-100">
    <h2 className="mb-10 text-xl font-bold text-gray-800 uppercase">Estados o listas</h2>

    {/* Categoría: Jugando */}
    <div className="flex flex-col items-center gap-8 lg:p-6 sm:items-start sm:flex-row">
      <div className="flex flex-col items-center justify-center w-full p-4 transition duration-300 bg-white shadow-lg rounded-2xl hover:bg-blue-50">
        <div className="p-2 text-white bg-blue-400 rounded-full">
          <PlayIcon w="6" h="6" />
        </div>
        <h3 className="mt-2 text-sm italic font-bold uppercase lg:text-lg">Jugando</h3>
        <p className="mt-1 text-xs text-justify text-gray-700 lg:text-base">
          Destinada para indicar los <span className="font-bold">juegos que te estás pasando actualmente</span>.
        </p>
      </div>
    </div>

    {/* Categoría: Completando */}
    <div className="flex flex-col items-center gap-8 mt-10 lg:p-6 sm:items-start sm:flex-row">
      <div className="flex flex-col items-center justify-center w-full p-4 transition duration-300 bg-white shadow-lg rounded-2xl hover:bg-blue-50">
        <div className="p-2 text-white bg-gray-700 rounded-full">
          <CompleteIcon w="6" h="6" />
        </div>
        <h3 className="mt-2 text-sm italic font-bold uppercase lg:text-lg">Completando</h3>
        <p className="mt-1 text-xs text-justify text-gray-700 lg:text-base">
          Indica los <span className="font-bold">juegos que estás completando para conseguir el 100%</span>. Se ubica inmediatemente debajo de Jugando en la página principal una vez se añade algún juego. 
        </p>
      </div>
    </div>

    {/* Categoría: Terminados */}
    <div className="flex flex-col items-center gap-8 mt-10 lg:p-6 sm:items-start sm:flex-row">
      <div className="flex flex-col items-center justify-center w-full p-4 transition duration-300 bg-white shadow-lg rounded-2xl hover:bg-blue-50">
        <div className="p-2 text-white bg-green-600 rounded-full">
          <CheckIcon w="6" h="6" />
        </div>
        <h3 className="mt-2 text-sm italic font-bold uppercase lg:text-lg">Terminados</h3>
        <p className="mt-1 text-xs text-justify text-gray-700 lg:text-base">
          Indica los <span className="font-bold">juegos que has terminado</span>. 
        </p>
      </div>
    </div>

    {/* Categoría: En Lista */}
    <div className="flex flex-col items-center gap-8 mt-10 lg:p-6 sm:items-start sm:flex-row">
      <div className="flex flex-col items-center justify-center w-full p-4 transition duration-300 bg-white shadow-lg rounded-2xl hover:bg-blue-50">
        <div className="p-2 text-white bg-indigo-500 rounded-full">
          <ProximosIcon w="6" h="6" />
        </div>
        <h3 className="mt-2 text-sm italic font-bold uppercase lg:text-lg">Próximos</h3>
        <p className="mt-1 text-xs text-justify text-gray-700 lg:text-base">
          Indica los <span className="font-bold">juegos que quieres pasarte próximamente</span>.
        </p>
      </div>
    </div>

    {/* Categoría: Otra vez */}
    <div className="flex flex-col items-center gap-8 mt-10 lg:p-6 sm:items-start sm:flex-row">
      <div className="flex flex-col items-center justify-center w-full p-4 transition duration-300 bg-white shadow-lg rounded-2xl hover:bg-blue-50">
        <div className="p-2 text-white bg-purple-700 rounded-full">
          <UpdateIcon w="6" h="6" />
        </div>
        <h3 className="mt-2 text-sm italic font-bold uppercase lg:text-lg">Otra vez</h3>
        <p className="mt-1 text-xs text-justify text-gray-700 lg:text-base">
          Indica los <span className="font-bold">juegos que ya has jugado pero que quieres volver a pasarte</span>.
        </p>
      </div>
    </div>

    {/* Categoría: Lista de deseos */}
    <div className="flex flex-col items-center gap-8 mt-10 lg:p-6 sm:items-start sm:flex-row">
      <div className="flex flex-col items-center justify-center w-full p-4 transition duration-300 bg-white shadow-lg rounded-2xl hover:bg-blue-50">
        <div className="p-2 text-white bg-orange-700 rounded-full">
          <StartIcon w="6" h="6" />
        </div>
        <h3 className="mt-2 text-sm italic font-bold uppercase lg:text-lg">Lista de deseos</h3>
        <p className="mt-1 text-xs text-justify text-gray-700 lg:text-base">
          Indica los <span className="font-bold">juegos te gustaría tener algún día</span>.
        </p>
      </div>
    </div>

    {/* Categoría: Pausados */}
    <div className="flex flex-col items-center gap-8 mt-10 lg:p-6 sm:items-start sm:flex-row">
      <div className="flex flex-col items-center justify-center w-full p-4 transition duration-300 bg-white shadow-lg rounded-2xl hover:bg-blue-50">
        <div className="p-2 text-white bg-yellow-600 rounded-full">
          <PauseIcon w="6" h="6" />
        </div>
        <h3 className="mt-2 text-sm italic font-bold uppercase lg:text-lg">Pausados</h3>
        <p className="mt-1 text-xs text-justify text-gray-700 lg:text-base">
          Indica los <span className="font-bold">juegos que has dejado a medias</span>.
        </p>
      </div>
    </div>

    {/* Categoría: Abandonados */}
    <div className="flex flex-col items-center gap-8 mt-10 lg:p-6 sm:items-start sm:flex-row">
      <div className="flex flex-col items-center justify-center w-full p-4 transition duration-300 bg-white shadow-lg rounded-2xl hover:bg-blue-50">
        <div className="p-2 text-white bg-red-700 rounded-full">
          <AbandonadoIcon w="6" h="6" />
        </div>
        <h3 className="mt-2 text-sm italic font-bold uppercase lg:text-lg">Abandonados</h3>
        <p className="mt-1 text-xs text-justify text-gray-700 lg:text-base">
          Indica los <span className="font-bold">juegos que has dejado a medias y que no piensas volver a jugar</span>.
        </p>
      </div>
    </div>

    {/* Sección Importante */}
    <div className="flex flex-col items-center w-full p-6 mt-5 text-xs rounded-lg bg-slate-400 lg:text-base sm:items-start">
      <h1 className="mb-3 text-lg font-semibold uppercase">Importante</h1>
      <p className="w-full mb-3 text-justify text-gray-700 lg:text-base">
        En la página principal se muestran algunos juegos. Al hacer click en el nombre de la lista, podrás acceder a todos los que contiene. Además, al seleccionar la imagen de un juego entrarás en su ficha específica, donde encontrarás opciones de edición.
      </p>
      <p className="w-full mb-3 text-justify text-gray-700 lg:text-base">
        En las listas de "Jugando" y "Completando", también podrás marcar si estás rejugando un título. Esto activará un ícono indicativo en las imágenes de los juegos correspondientes.
      </p>
      <p className="w-full text-justify text-gray-700 lg:text-base">
        Si deseas eliminar un juego, puedes hacerlo desde "Editar estado", en la ficha del juego.
      </p>
      <div className="flex flex-col items-center justify-center w-full gap-3 pt-5 lg:mt-8">   
        <div>
          <span className="text-[10px] italic text-gray-700">Ejemplo visual de opción de Eliminar</span>
            <div className="flex items-center justify-center gap-2 p-1 px-2 mt-2 text-xs text-white transition duration-300 bg-gray-700 rounded-lg shadow shadow-black hover:bg-red-700 lg:text-base">
              <span>Eliminar de mis listas</span><DeleteIcon />
            </div>
        </div>
      </div>
    </div>

  </div>
)
}
