import { DeleteIcon, EditIcon } from "../../../../assets/Icons";
import { GET_COLOR_CLASS } from "../../../helpers/no-components/constants";

export function FAQSignificadoIcons() {
  return (
    <div className="rounded-lg p-7 bg-slate-100">
    <h2 className="mb-10 text-xl font-bold uppercase">Significado de los iconos</h2>
    <div className="flex flex-col items-center justify-center gap-6 sm:items-start sm:flex-row">
        <div className="inline-block p-1 text-sm font-bold text-center text-white bg-green-500 rounded-lg shadow hover:bg-green-600 shadow-black"><EditIcon/></div>
        <div className="flex flex-col items-center gap-5">
            <div className="w-full text-xs italic text-justify">
              <span className="font-bold">Icono de edición: </span> Clickando en él activas la opción de editar datos de tu juego, como la nota, el estado o la opción de rejugando.
                  <p className="mt-5">La <span className="font-bold">NOTA</span> que le otorgues al juegos puedes seleccionarla entre varios valores, de menor a mayor, y aparecerá reflejada al ver la información de tu juego, tanto en su ficha privada como al ver todos los juegos de la categoría donde lo guardes. Podrás cambiarla en cualquier momento.</p> 
                  <p className="mt-3">El <span className="font-bold">ESTADO</span> es una opción <span className="underline">muy importante</span>. En función del estado que seleccionemos el juego se guardará en una u otra categoría. Por ejemplo, si seleccionas el estado en Jugando, el juego aparecerá en dicha sección. Podrás cambiarlo en cualquier momento.</p>
                  <p className="mt-3">El <span className="font-bold">REJUGANDO</span> es una opción secundaria, que aparece solo en algunas categorías. Su función es indicar si ese juego, al momento de estar Jugando o Completando, ya ha sido jugado previamente. Si se selecciona, aparecerá un icono en la esquina inferior izquierda de la imagen del juego, tanto en la portada principal como en la sección de Ver todos. Podrás cambiarlo en cualquier momento. <span className="font-bold">Importante</span>: No debe confundirse con la categoría de <span className="font-bold">Rejugar</span>. Dicha categoría está pensada para guardar juegos que efectivamente se hayan jugado previamente pero que se quieran volver a jugar. Sería como la categoría En Lista, pero para ese tipo de juegos.</p>
            </div>
            <div className="flex flex-col w-full gap-5 my-5 sm:flex-row sm:justify-between">
                <div className="flex flex-col items-center gap-3">
                    <p className="text-xs italic">Ejemplo de nota</p>
                    <p className={`text-xs text-gray-100 flex justify-center items-center rounded px-2 w-6 h-6 py-1 text-end ${GET_COLOR_CLASS(8)}`}>8</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <p className="text-xs italic">Ejemplo de selección de Estado</p>
                    <select className="w-1/2 px-2 py-1 text-xs border rounded" >
                        <option>Jugando</option>
                        <option>En lista</option>
                        <option>Terminados</option>
                        <option>Completando</option>  
                        <option>Lista de deseos</option>
                        <option>Rejugar</option>  
                        <option>Pausado</option>  
                        <option>Abandonado</option>  
                    </select>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <p className="text-xs italic">Ejemplo de selección de Rejugando</p>
                    <select className="w-1/2 px-2 py-1 text-xs border rounded" >
                        <option>NO</option>
                        <option>SI</option>  
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div className="flex flex-col items-center justify-center gap-6 mt-20 sm:items-start sm:flex-row">
        <div className="inline-block p-1 text-sm font-bold text-center text-white bg-gray-700 rounded-lg shadow hover:text-white hover:bg-red-700 shadow-black"><DeleteIcon/></div>
        <div className="flex flex-col items-center gap-5">
            <div className="w-full text-xs italic text-justify">
              <span className="font-bold">Icono de eliminar: </span> Clickando en él activas la opción de eliminar ese juego de tu categoría o colección.
              <p className="mt-5">
                  Al tratarse de algo muy delicado, y para evitar eliminaciones accidentales, una vez se clicka en dicho botón se activará una pestaña para confirmar que se quiere proceder a eliminar. Si se acepta, el juego se borrará, sino se mantendrá.
              </p>
            </div>                       
        </div>
    </div>               
</div>
  )
}
