import { AbandonadoIcon, CheckIcon, CompleteIcon, PauseIcon, PlayIcon, ProximosIcon, StartIcon, UpdateIcon } from "../../../../assets/Icons";

export function FAQCategories() {
  return (
    <div className="flex flex-col p-5 rounded-lg lg:gap-16 lg:p-20 lg:text-base bg-slate-100">
    <h2 className="mb-10 text-xl font-bold uppercase">Categorías o colecciones</h2>
    <div className="flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-3">
            <h3 className="text-sm italic font-bold uppercase lg:text-base">Jugando</h3>
            <div className="inline-block p-1 text-sm font-bold text-white bg-blue-400 rounded-lg shadow text-start shadow-black"><PlayIcon  w="4" h="4"/></div>
        </div>
        <p className="w-full text-xs italic text-justify lg:text-base">
          Primera categoría destacada en la página principal, donde se muestran las imágenes de los juegos en mayor tamaño que el resto de categorías. En portada se presentan como máximo dos juegos activos, el resto está disponible en &quot;Ver Todos&quot;. Está diseñada para indicar los <span className="font-bold">juegos que te estás pasando actualmente</span>. Además, se podrá detallar si estás rejugándolo, en la opción de edición del juego, disponible en &quot;Ver Todos&quot;. Desde ahí, también podrás cambiar el estado de juego a otra categoría, o eliminarlo. Si está seleccionado <span className="font-bold">rejugando</span>, aparecerá un icono en la esquina inferior izquierda de la imagen del juego.
        </p>
        <div className="flex items-center justify-center w-full gap-3 text-xs lg:mt-8"><span>Icono de Rejugando</span>
            <div className="p-1 text-white bg-green-700 rounded-lg shadow shadow-black"><UpdateIcon w="4" h="4"/></div>
        </div>
    </div>

    <div className="flex flex-col items-start justify-center gap-6 mt-10">
        <div className="flex items-center gap-3">
            <h3 className="text-sm italic font-bold uppercase lg:text-base">Completando</h3>
            <div className="inline-block p-1 text-sm font-bold text-white bg-gray-700 rounded-lg shadow text-start shadow-black"><CompleteIcon  w="4" h="4"/></div>
        </div>
        <p className="w-full text-xs italic text-justify lg:text-base">
          Subcategoría similar a la sección de Jugando. En portada se muestran como máximo cuatro juegos, el resto está disponible en &quot;Ver Todos&quot;. Está diseñada para indicar los <span className="font-bold">juegos que, una vez terminada la historia o campaña principal, se están completando con el objetivo de conseguir el 100%, trofeos, etc.</span> Se ubica inmediatemente debajo de Jugando en la página principal y, como en dicha categoría, podrás indicar si estás rejugándolo, en la opción de edición del juego, disponible en &quot;Ver Todos&quot;. Desde ahí, también podrás cambiar el estado de juego a otra categoría, o eliminarlo. Si está seleccionado <span className="font-bold">rejugando</span>, aparecerá un icono en la esquina inferior izquierda de la imagen del juego.
        </p>
        <div className="flex items-center justify-center w-full gap-3 text-xs lg:mt-8"><span>Icono de Rejugando</span>
            <div className="p-1 text-white bg-green-700 rounded-lg shadow shadow-black"><UpdateIcon w="4" h="4"/></div>
        </div>
    </div>

    <div className="flex flex-col items-start justify-center gap-6 mt-10">
        <div className="flex items-center gap-3">
            <h3 className="text-sm italic font-bold uppercase lg:text-base">Terminados</h3>
            <div className="inline-block p-1 text-sm font-bold text-center text-white bg-green-600 rounded-lg shadow shadow-black"><CheckIcon w="4" h="4"/></div>
        </div>
        <p className="w-full text-xs italic text-justify lg:text-base">
          Segunda categoría de la página principal. En portada se muestran como máximo cuatro juegos, el resto está disponible en &quot;Ver Todos&quot;. Está diseñada para indicar los <span className="font-bold">juegos que has terminado</span>. Se podrá modificar el estado de juego a otra categoría, o eliminarlo, en la opción de edición del juego, disponible en &quot;Ver Todos&quot;.
        </p>
    </div>

    <div className="flex flex-col items-start justify-center gap-6 mt-10">
        <div className="flex items-center gap-3">
            <h3 className="text-sm italic font-bold uppercase lg:text-base">En Lista</h3>
            <div className="inline-block p-1 text-sm font-bold text-center text-white bg-indigo-500 rounded-lg shadow shadow-black"><ProximosIcon w="4" h="4"/></div>
        </div>
        <p className="w-full text-xs italic text-justify lg:text-base">
          Tercera categoría de la página principal. En portada se muestran como máximo cuatro juegos, el resto está disponible en &quot;Ver Todos&quot;. Está diseñada para indicar los <span className="font-bold">juegos que quieres pasarte próximamente</span>. Se podrá cambiar el estado de juego a otra categoría, o eliminarlo, en la opción de edición del juego, disponible en &quot;Ver Todos&quot;.
        </p>
    </div>

    <div className="flex flex-col items-start justify-center gap-6 mt-10">
        <div className="flex items-center gap-3">
            <h3 className="text-sm italic font-bold uppercase lg:text-base">Rejugar</h3>
            <div className="inline-block p-1 text-sm font-bold text-center text-white bg-purple-700 rounded-lg shadow shadow-black"><UpdateIcon w="4" h="4"/></div>
        </div>
        <p className="w-full text-xs italic text-justify lg:text-base">
          Categoría extra que no muestra directamente juegos en la página principal. Está diseñada para indicar los <span className="font-bold">juegos que ya has jugado pero que quieres volver a pasarte. Tiene el mismo objetivo que En Lista, pero para ese tipo de juegos</span>. Se podrá modificar el estado de juego a otra categoría, o eliminarlo, en la opción de edición del juego, disponible en &quot;Ver Todos&quot;.
        </p>
    </div>

    <div className="flex flex-col items-start justify-center gap-6 mt-10">
        <div className="flex items-center gap-3">
            <h3 className="text-sm italic font-bold uppercase lg:text-base">Lista de deseos</h3>
            <div className="inline-block p-1 text-sm font-bold text-center text-white bg-orange-700 rounded-lg shadow shadow-black"><StartIcon w="4" h="4"/></div>
        </div>
        <p className="w-full text-xs italic text-justify lg:text-base">
          Categoría extra que no muestra directamente juegos en la página principal. Está diseñada para indicar los <span className="font-bold">juegos te gustaría tener algún día</span>. Se podrá cambiar el estado de juego a otra categoría, o eliminarlo, en la opción de edición del juego, disponible en &quot;Ver Todos&quot;.
        </p>
    </div>

    <div className="flex flex-col items-start justify-center gap-6 mt-10">
        <div className="flex items-center gap-3">
            <h3 className="text-sm italic font-bold uppercase lg:text-base">Pausados</h3>
            <div className="inline-block p-1 text-sm font-bold text-center text-white bg-yellow-600 rounded-lg shadow shadow-black"><PauseIcon w="4" h="4"/></div>
        </div>
        <p className="w-full text-xs italic text-justify lg:text-base">
          Categoría extra que no muestra directamente juegos en la página principal. Está diseñada para indicar los <span className="font-bold">juegos que has dejado a medias pero que quieres volver a retomarlo en algún momento</span>. Se podrá modificar el estado de juego a otra categoría, o eliminarlo, en la opción de edición del juego, disponible en &quot;Ver Todos&quot;.
        </p>
    </div>

    <div className="flex flex-col items-start justify-center gap-6 mt-10">
        <div className="flex items-center gap-3">
            <h3 className="text-sm italic font-bold uppercase lg:text-base">Abandonados</h3>
            <div className="inline-block p-1 text-sm font-bold text-center text-white bg-red-700 rounded-lg shadow shadow-black"><AbandonadoIcon w="4" h="4"/></div>
        </div>
        <p className="w-full text-xs italic text-justify lg:text-base">
          Categoría extra que no muestra directamente juegos en la página principal. Está diseñada para indicar los <span className="font-bold">juegos que has dejado a medias y que no piensas volver a jugarlo</span>. Se podrá cambiar el estado de juego a otra categoría, o eliminarlo, en la opción de edición del juego, disponible en &quot;Ver Todos&quot;.
        </p>
    </div>
</div>
  )
}
