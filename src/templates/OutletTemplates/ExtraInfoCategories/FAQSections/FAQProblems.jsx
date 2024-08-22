import { EditIcon, PlusIcon } from "../../../../assets/Icons";

export function FAQProblems() {
  return (
    <div className="p-5 rounded-lg lg:p-10 bg-slate-100">
    <h2 className="mb-10 text-xl font-bold uppercase">Información</h2>

    <div className="mt-16">
        <h3 className="mb-5 italic font-bold">Cantidad de juegos en la base de datos <span className="underline">LIMITADA</span></h3>
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">     
            <p className="w-full text-xs italic text-justify sm:text-sm">
              La base de datos de la web es una versión de prueba gratuita y el catálogo de juegos es bastante reducido, por una cuestión de tiempo y presupuesto de la web. Si un juego no te aparece al buscar por su nombre es porque <span className="font-bold">no está registrado en la base de datos.</span> Se intentarán añadir juegos en la medida de lo posible.       
            </p>
        </div>
      </div>
      <div className="p-5 mt-5 mb-10">
        <p className="w-full mb-4 text-xs italic text-justify sm:text-sm">
          Número de juegos por plataforma (orientativo):
        </p>
          <ul className="grid grid-cols-2 gap-4 p-3 text-xs bg-gray-200 rounded-lg sm:grid-cols-6 lg:grid-cols-10">
            <li><span className="italic font-bold">PS5:</span> 10</li>
            <li><span className="italic font-bold">PS4:</span> 40</li>
            <li><span className="italic font-bold">PS3:</span> 21</li>
            <li><span className="italic font-bold">PS2:</span> 0</li>
            <li><span className="italic font-bold">PS1:</span> 1</li>
            <li><span className="italic font-bold">Switch:</span> 17</li>
            <li><span className="italic font-bold">WiiU:</span> 4</li>
            <li><span className="italic font-bold">Wii:</span> 4</li>
            <li><span className="italic font-bold">GameCube:</span> 2</li>
            <li><span className="italic font-bold">Nintendo 64:</span> 3</li>
            <li><span className="italic font-bold">Xbox One:</span> 5</li>
            <li><span className="italic font-bold">Xbox 360:</span> 10</li>
            <li><span className="italic font-bold">PSVita:</span> 3</li>
            <li><span className="italic font-bold">PSP:</span> 0</li>
            <li><span className="italic font-bold">3DS:</span> 7</li>
            <li><span className="italic font-bold">DS:</span> 2</li>
            <li><span className="italic font-bold">GB Advance:</span> 4</li>
            <li><span className="italic font-bold">GB Color:</span> 0</li>
            <li><span className="italic font-bold">Game Boy:</span> 1</li>
            <li><span className="italic font-bold">SNES:</span> 0</li>
            <li><span className="italic font-bold">NES:</span> 3</li>
            <li><span className="italic font-bold">MegaDrive:</span> 0</li>
            <li><span className="italic font-bold">Steam:</span> 2</li>
          </ul>
      </div>

    <h2 className="mb-10 text-xl font-bold uppercase">Problemas frecuentes</h2>
    <div className="mt-10">
      <h3 className="mb-5 italic font-bold">&quot;No sé cómo añadir un juego&quot;</h3>
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">   
      <div className="inline-block p-1 text-sm font-bold text-center text-white bg-gray-500 rounded-lg shadow hover:bg-green-600 shadow-black"><PlusIcon w={4} h={4}/></div>  
          <p className="w-full text-xs italic text-justify sm:text-sm">
            En la sección Añadir juegos se podrán buscar por nombre los juegos disponibles en la base de datos. A medida que se busque se mostrarán los juegos encontrados. Para añadir el juego que se desea deberá <span className="font-bold">hacerse click en el botón +Select mostrado en la esquina inferior izquierda de la imagen del juego.</span> Una vez hecho eso, la web se habilitará el botón de Añadir juego.<span className="font-bold"> IMPORTANTE: No debe modificarse el texto que se autocompleta en la barra de búsqueda tras darle al botón +Select si queremos añadir dicho juego.</span> Si por error le dimos a un juego que no queremos, lo mejor es borrar totalmente lo que aparece en la barra de búsqueda, y escribir de nuevo hasta encontrar el juego que realmente queremos añadir, y ahí pulsar el +Select. La clave es que una vez se encuentre el juego que se quiere, se haga click en el +Select y luego en Añadir juego.      
          </p>
      </div>
    </div>
    <div className="mt-16">
      <h3 className="mb-5 italic font-bold">&quot;He añadido un juego pero se ve raro, no se ve la imagen, el nombre o algún dato&quot;</h3>
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">          
          <p className="w-full text-xs italic text-justify sm:text-sm">
            Si ocurre eso es posible que se haya añadido mal el juego. La solución a eso simplemente consiste en eliminar el juego y volver a añadirlo, siguiendo los pasos que se indican en esta misma sección en la consulta de <span className="font-bold">&quot;No sé cómo añadir un juego&quot;</span>
          </p>
      </div>
    </div>
    <div className="mt-16">
      <h3 className="mb-5 italic font-bold">&quot;No se cambian la nota, el estado o rejugando cuando hago click en Guardar&quot;</h3>
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <div className="inline-block p-1 text-sm font-bold text-center text-white bg-green-500 rounded-lg shadow hover:bg-green-600 shadow-black"><EditIcon/></div>
          <p className="w-full text-xs italic text-justify sm:text-sm">
            En ocasiones las opciones de nota, estado o rejugando no se aplican adecuadamente. En estos casos simplemente basta con <span className="font-bold">volver a intentarlo, sin recargar la página</span>. Normalmente a la segunda vez o tercera ocasión, tras hacer click en <span className="font-bold">Guardar</span>, ya se reflejan los cambios.
          </p>
      </div>
    </div>
    <div className="mt-16">
      <h3 className="mb-5 italic font-bold">&quot;No encuentro el juego que quiero&quot;</h3>
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">     
          <p className="w-full text-xs italic text-justify sm:text-sm">
            La base de datos de la web es una versión de prueba gratuita y el catálogo de juegos es bastante reducido, por una cuestión de tiempo y presupuesto de la web. Si un juego no te aparece al buscar por su nombre es porque <span className="font-bold">no está registrado en la base de datos.</span> Se intentarán añadir juegos en la medida de lo posible. Lamentamos las molestias.       
          </p>
      </div>
    </div>
    <div className="mt-16">
      <h3 className="mb-5 italic font-bold">&quot;Se cambia el orden de mis juegos al actualizar el estado o la nota&quot;</h3>
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">          
          <p className="w-full text-xs italic text-justify sm:text-sm">
            Los juegos guardados de algunas colecciones se almacenan según su fecha de incorporación a dicha colección, o de su última modificación. Por ejemplo, en la colección Terminados, el último juego añadido sale de primero por defecto. Sin embargo, si modificas el estado o la nota de un juego que está más adelante en la colección, éste se pondrá de primero, al ser el de más reciente modificación. Debes tener esto en cuenta a la hora de establecer el orden que prefieras. De todos modos, siempre <span className="font-bold">puedes ordenar los juegos de diferentes formas, en la esquina superior derecha: por título, por plataforma o por nota</span>.
          </p>
      </div>
    </div>
</div>
  )
}
