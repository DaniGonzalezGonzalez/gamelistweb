import { PlusIcon } from "../../../../assets/Icons";
import { useHandles } from "../../../../hooks/useHandles";
import { cleanTitle } from "../../no-components/constants";

// FoundGames.js
export function FoundGames({ 
  filteredGames, 
  handleGameSelect, 
  setEditNotaPanelOpen, 
  byPlatform, 
  setEditEstadoPanelOpen, 
  onAvanzar 
}) {
  const { handleInfoGameBD } = useHandles();

  const handleGameClick = (game) => {
    handleGameSelect(
      game.titulo, 
      game.imageUrl, 
      game.platformImageUrl, 
      game.plataforma, 
      game.descripcion, 
      game.notaMetacriticPrensa, 
      game.notaMetacriticUsuarios, 
      game.tiempoMainStory, 
      game.tiempoMainAndSides, 
      game.tiempoCompletionist, 
      game.linkMetacritic, 
      game.linkHowLongToBeat, 
      game.datosExtraJuego, 
      game.genero, 
      game.url[0], 
      game.url[1]
    );

    // Llama a las funciones según la lógica deseada
    if (setEditEstadoPanelOpen) {
      setEditEstadoPanelOpen(true);
    }

    if (onAvanzar) {
      onAvanzar(game.plataforma);
    }
  };

  return (
    <>
      <h2 className="w-full mt-4 text-lg font-bold text-white lg:w-5/6">Juegos encontrados</h2>
      <ul className="grid w-full grid-cols-2 gap-4 pt-4 mt-2 mb-6 text-xs text-white border-t border-gray-700 lg:w-5/6 sm:mb-10 2xl:grid-cols-9 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
        {filteredGames.map((game) => (
          <li key={game.titulo} className="flex flex-col items-center cursor-pointer">
            <div className="h-full transition duration-300 w-28 sm:w-32 hover:scale-105">
              <div className="relative flex items-center justify-center gap-3 shadow-md sm:flex hover:rounded hover:shadow-gray-700">
                <button type="button" onClick={() => handleInfoGameBD(game.id)}>
                  <img 
                    className="object-cover w-full h-32 rounded-lg sm:h-32" 
                    src={game?.url[0] ?? game?.imageUrl} 
                    alt="No hay imagen" 
                  />
                </button>
                <div 
                  className="absolute flex items-center justify-center object-contain gap-1 p-0.5 pr-1 bg-gray-600 rounded-lg shadow lg:left-2 left-1 bottom-2 shadow-black hover:bg-green-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGameClick(game); // Usa la función de manejo para unificar la lógica
                  }}
                >
                  <PlusIcon w={4} h={4} /> Añadir
                </div>
              </div>
              <p className="pt-3 text-start">{cleanTitle(game?.titulo)}</p>
              <p className="pt-2 font-bold text-start">{game.descripcion}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
