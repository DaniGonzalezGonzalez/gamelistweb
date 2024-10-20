import { PlusIcon } from "../../../../assets/Icons"

export function FAQProblems() {
  return (
    <div className="p-5 bg-white rounded-lg shadow-lg lg:p-10">
      {/* Título de información */}
      <h2 className="mb-10 text-2xl font-extrabold tracking-wide uppercase text-slate-700">Información</h2>

      {/* Cantidad de juegos */}
      <div className="mb-8">
        <h3 className="mb-5 text-lg font-bold lg:text-xl text-slate-600">
          Cantidad de juegos en la base de datos <span className="text-blue-600 underline">LIMITADA</span>
        </h3>
        <p className="text-sm text-justify text-gray-700 lg:text-base">
          La base de datos de la web es una versión de prueba gratuita y el catálogo de juegos es bastante reducido. Si un juego no aparece al buscar por su nombre es porque <span className="font-bold">no está registrado en la base de datos.</span> Se intentarán añadir juegos en la medida de lo posible.
        </p>
      </div>

      {/* Juegos por plataforma */}
      <div className="p-5 mb-8 rounded-lg shadow-inner bg-blue-50">
        <p className="mb-4 text-sm italic font-semibold text-gray-600">
          Número de juegos por plataforma (orientativo):
        </p>
        <ul className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4 lg:grid-cols-5 lg:text-sm">
          {[
            { platform: "PS5", games: 30 },
            { platform: "PS4", games: 69 },
            { platform: "PS3", games: 44 },
            { platform: "PS2", games: 2 },
            { platform: "PS1", games: 5 },
            { platform: "Switch", games: 26 },
            { platform: "WiiU", games: 13 },
            { platform: "Wii", games: 6 },
            { platform: "GameCube", games: 7 },
            { platform: "N64", games: 5 },
            { platform: "Xbox Series X/S", games: 0 },
            { platform: "Xbox One", games: 11 },
            { platform: "Xbox 360", games: 18 },
            { platform: "Xbox", games: 0 },
            { platform: "PSVita", games: 11 },
            { platform: "PSP", games: 4 },
            { platform: "3DS", games: 12 },
            { platform: "DS", games: 7 },
            { platform: "GB Advance", games: 13 },
            { platform: "GB Color", games: 1 },
            { platform: "Game Boy", games: 3 },
            { platform: "SNES", games: 1 },
            { platform: "NES", games: 6 },
            { platform: "MegaDrive", games: 1 },
            { platform: "PC", games: 2 },
          ].map(({ platform, games }) => (
            <li key={platform} className="p-2 text-center bg-white rounded-lg shadow">
              <span className="italic font-bold">{platform}:</span> {games}
            </li>
          ))}
        </ul>
      </div>

      {/* Problemas frecuentes */}
      <h2 className="mb-10 text-2xl font-extrabold tracking-wide uppercase text-slate-700">Problemas frecuentes</h2>

      {/* FAQ Problema 1 */}
      <div className="mb-8">
        <h3 className="mb-5 text-lg italic font-bold text-blue-600">&quot;No sé cómo añadir un juego&quot;</h3>
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="flex gap-2 p-2 text-sm font-bold text-white bg-gray-500 rounded-lg shadow hover:bg-green-600">
            <PlusIcon w={5} h={5} /> Añadir
          </div>
          <p className="text-sm text-gray-700 lg:text-base">
            Para añadir juegos, puedes hacer click en el menú lateral en PC en &quot;Añadir juegos&quot;, en móvil en el botón superior izquierdo de la pantalla, en el menú desplegable, o en la imagen de portada donde indica &quot;Explora el catálogo&quot;. Selecciona el catálogo que prefieras y busca el juego por su nombre. Luego, haz clic en el botón <span className="font-bold">+Añadir</span>, completa la nota y el estado, y finalmente pulsa en el botón para añadir el juego.
          </p>

        </div>
      </div>

      {/* FAQ Problema 2 */}
      <div className="mb-8">
        <h3 className="mb-5 text-lg italic font-bold text-blue-600">&quot;He añadido un juego pero se ve raro&quot;</h3>
        <p className="text-sm text-gray-700 lg:text-base">
          Si el juego se ve mal, elimínalo y vuelve a añadirlo siguiendo las instrucciones previas.
        </p>
      </div>

      {/* FAQ Problema 3 */}
      <div className="mb-8">
        <h3 className="mb-5 text-lg italic font-bold text-blue-600">&quot;No encuentro el juego que quiero&quot;</h3>
        <p className="text-sm text-gray-700 lg:text-base">
          Si no encuentras el juego que quieres, probablemente no esté registrado.
        </p>
      </div>

      {/* FAQ Problema 4 */}
      <div className="mb-8">
        <h3 className="mb-5 text-lg italic font-bold text-blue-600">&quot;No sé cómo ordenar mis juegos&quot;</h3>
        <p className="text-sm text-gray-700 lg:text-base">
          En el catálogo de cada colección, en la esquina superior derecham se encuentra una pestaña de selección de orden preferente. Con la opción &quot;Personalizado&quot;, activada por defecto al cargar la página, podrás editar el orden de tus juegos. Para ello, basta con hacer click en los puntos suspensivos (<span className="font-semibold">...</span>) del juego de interés para habilitar las flechas de desplazamiento. También podrás ordenarlos automáticamente por nota, título o plataforma.
        </p>
      </div>
    </div>
  );
}
