export const NoGamesPrompt = ( {personalizedTitle, personalizedSubtitle, handleAddGameMenu }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-800 border-2 border-gray-600 border-dashed rounded-lg">
        <h3 className="mb-4 text-lg font-semibold text-gray-300">{personalizedTitle}</h3>
        <p className="mb-4 text-gray-400">{personalizedSubtitle}</p>
        <button
          onClick={handleAddGameMenu}
          className="flex items-center px-4 py-2 text-sm font-medium text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700"
        >Agregar Juegos<span className="ml-2">➕</span>
        </button>
      </div>
    </>
  )
}

