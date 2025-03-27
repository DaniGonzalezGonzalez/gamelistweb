export function GameDetailSkeleton() {
    return (
      <div className="flex flex-col items-center w-full h-full px-6 py-10 bg-transparent lg:pl-16">
        {/* Rectángulo grande arriba */}
        <div className="w-full h-64 bg-gray-500 rounded-lg lg:h-96 animate-pulse"></div>
  
        {/* Contenedor para los rectángulos pequeños */}
        <div className="grid w-full grid-cols-1 gap-4 mt-6 lg:grid-cols-2">
          {/* En móviles: 3 rectángulos centrados */}
          <div className="flex flex-col items-center w-full gap-4 lg:items-start">
            <div className="w-3/4 h-20 bg-gray-500 rounded-lg animate-pulse"></div>
            <div className="w-3/4 h-20 bg-gray-500 rounded-lg animate-pulse"></div>
            <div className="w-3/4 h-20 bg-gray-500 rounded-lg animate-pulse"></div>
          </div>
          
          {/* En PC: 3 rectángulos alineados a la derecha */}
          <div className="flex-col items-end hidden w-full gap-4 lg:flex">
            <div className="w-3/4 h-20 bg-gray-500 rounded-lg animate-pulse"></div>
            <div className="w-3/4 h-20 bg-gray-500 rounded-lg animate-pulse"></div>
            <div className="w-3/4 h-20 bg-gray-500 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }
  