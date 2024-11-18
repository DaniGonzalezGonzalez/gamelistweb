export const PaginationButtons = ({ dataBD, sortedData, itemsToShow, setItemsToShow, handleShowMore, handleShowLess, handleShowInitial, handleShowAll }) => {
  const handleShowAllLocal = (dataLength) => {
    setItemsToShow(dataLength); // Actualiza el estado del padre
  };

  return (
    sortedData.length >= 1 && (
      <div className="flex flex-col justify-end gap-5">
        <div className="flex justify-end gap-2">
          <div className="flex justify-center">
            <button onClick={handleShowMore} className="px-3 py-1 text-xs text-center text-white bg-gray-600 rounded hover:text-white hover:bg-blue-400">
              Mostrar más
            </button>
          </div>
          <div className="flex justify-center">
            <button 
              onClick={handleShowLess} 
              className={`px-3 py-1 text-xs text-center text-white bg-gray-600 rounded ${sortedData.length > 8 && 'hover:text-white hover:bg-red-400'}`} 
              disabled={itemsToShow === 8}
            >
              Mostrar menos
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <button 
            onClick={() => itemsToShow >= dataBD.length ? handleShowInitial() : handleShowAllLocal(dataBD.length)} 
            className={`px-3 py-1 text-xs text-center text-white bg-gray-600 rounded hover:text-white ${itemsToShow >= sortedData.length ? 'hover:bg-red-400' : 'hover:bg-green-400'}`}
          >
            {itemsToShow >= dataBD.length ? 'No mostrar todos' : 'Mostrar todos'}
          </button>
        </div>
      </div>
    )
  );
};
