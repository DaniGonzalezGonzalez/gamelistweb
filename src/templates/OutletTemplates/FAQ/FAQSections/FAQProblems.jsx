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
            { platform: "PS5", games: 168 },
            { platform: "PS4", games: 312 },
            { platform: "PS3", games: 167 },
            { platform: "PS2", games: 49 },
            { platform: "PS1", games: 21 },
            { platform: "Switch 2", games: 6 },
            { platform: "Switch", games: 238 },
            { platform: "WiiU", games: 45 },
            { platform: "Wii", games: 26 },
            { platform: "GameCube", games: 37 },
            { platform: "N64", games: 23 },
            { platform: "Xbox Series X/S", games: 144 },
            { platform: "Xbox One", games: 251 },
            { platform: "Xbox 360", games: 120 },
            { platform: "Xbox", games: 20 },
            { platform: "PSVita", games: 43 },
            { platform: "PSP", games: 31 },
            { platform: "3DS", games: 40 },
            { platform: "DS", games: 33 },
            { platform: "GB Advance", games: 51 },
            { platform: "GB Color", games: 13 },
            { platform: "Game Boy", games: 10 },
            { platform: "SNES", games: 9 },
            { platform: "NES", games: 10 },
            { platform: "MegaDrive", games: 10 },
            { platform: "PC", games: 441 },
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
            <span className="font-bold">En PC:</span> Para añadir juegos, puedes hacer click en el menú lateral &quot;Buscar juegos&quot;, o en la imagen de portada que indica &quot;Explora el catálogo&quot;. Selecciona el catálogo que prefieras y busca el juego por su nombre. Luego, haz clic en el botón <span className="font-bold">+Añadir</span>, y completa la plataforma y el estado.
            <div className="mt-2"><span className="font-bold">En móviles:</span> Haciendo click en el botón superior izquierdo para abrir el menú desplehable. El resto del proceso se realiza igual que en PC.</div>
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
          Si no encuentras el juego que quieres, probablemente no esté en nuestra base de datos.
        </p>
      </div>

      {/* FAQ Problema 4 */}
      <div className="mb-8">
        <h3 className="mb-5 text-lg italic font-bold text-blue-600">&quot;No sé cómo ordenar mis juegos&quot;</h3>
        <p className="text-sm text-gray-700 lg:text-base">
          En el catálogo de cada lista, en la esquina superior derecha se encuentra una pestaña de selección de orden preferente. Con la opción &quot;Personalizado&quot;, activada por defecto al cargar la página, podrás editar el orden de tus juegos. Para ello, basta con hacer click en los puntos suspensivos (<span className="font-semibold">...</span>) del juego de interés para habilitar las flechas de desplazamiento. También podrás ordenarlos automáticamente por nota, título o plataforma.
        </p>
      </div>

      {/* FAQ Problema 5 */}
      <div className="mb-8">
        <h3 className="mb-5 text-lg italic font-bold text-blue-600">&quot;He registrado mi juego, pero no sale en la posición que debería&quot;</h3>
        <p className="text-sm text-gray-700 lg:text-base">
          Los juegos se añaden automáticamente en una posición predeterminada en cada lista. Por ejemplo, en &quot;Terminados&quot;, &quot;Jugando&quot; o &quot;Completando&quot; se añaden <span className="font-bold">al principio</span>, mientras que en &quot;En lista&quot; u &quot;Otra Vez&quot; se añaden <span className="font-bold">al final</span>. En ocasiones muy excepcionales, el juego puede no añadirse en la posición que le corresponde (al principio o al final), quedando perdido en medio de otros juegos. Si se da el caso, comprueba que esté añadido haciendo click en &quot;Mostrar todos&quot; en la lista y buscándolo. Una vez localizado, <span className="font-bold">puedes moverlo a la posición deseada</span> haciendo click en el icono inferior (<span className="font-bold">...</span>) izquierdo para habilitar las flechas de desplazamiento.
        </p>
      </div>
    </div>
  );
}
