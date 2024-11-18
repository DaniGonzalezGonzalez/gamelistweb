import { EditIcon, TrophyIcon } from "../../../../assets/Icons";
import { HorasDuracionEditor } from "./HorasDuracionEditor";
import { PlatinoEditor } from "./PlatinoEditor";
import { PorcentajeCompletado } from "./PorcentajeCompletado";
import { PorcentajeCompletadoEditor } from "./PorcentajeCompletadoEditor";


export const MyStats = ({
    estado,
    platino,
    porcentajeCompletado,
    dataGraficaCircular,
    crearChartOptionsCircular,
    setEditModePorcentajeCompletado,
    editModePorcentajeCompletado,
    nuevoPorcentajeCompletado,
    setNuevoPorcentajeCompletado,
    handlePorcentajeCompletadoChange,
    horasDuracion,
    setEditModeHorasDuracion,
    editModeHorasDuracion,
    nuevaHorasDuracion,
    setNuevaHorasDuracion,
    handleHorasDuracionChange,
    setEditModePlatino,
    editModePlatino,
    nuevoPlatino,
    setNuevoPlatino,
    handlePlatinoChange,
    plataforma,
    error,
    setError,
    handlePorcentajeCompletado,
    handleHorasDuracion,
    handlePlatino
  }) => {
  
    return (
      <>
        {estado && (
          <div className="p-4 mt-4 border border-gray-500 lg:p-6 lg:mt-10 rounded-xl">
            <h3 className="flex items-center gap-2 text-base font-bold lg:text-2xl text-start">
              Mis stats
              {platino === 'Platino' && (
                <img className="object-cover w-6 h-6" src={'/Platino-Logo.webp'} alt="No hay imagen" />
              )}
              {platino === '1000G' && (
                <div className="p-1 bg-green-800 rounded-full">
                  <TrophyIcon w={4} h={4} />
                </div>
              )}
            </h3>
  
            <div className="flex justify-center gap-2 mt-4 lg:justify-evenly">
              {/* Porcentaje Completado */}
              <div className="flex">
                {!editModePorcentajeCompletado && (
                  <PorcentajeCompletado
                    porcentajeCompletado={porcentajeCompletado}
                    dataGraficaCircular={dataGraficaCircular}
                    crearChartOptionsCircular={crearChartOptionsCircular}
                    setEditModePorcentajeCompletado={setEditModePorcentajeCompletado}
                  />
                )}
                {editModePorcentajeCompletado && (
                  <PorcentajeCompletadoEditor
                    porcentajeCompletado={porcentajeCompletado}
                    nuevoPorcentajeCompletado={nuevoPorcentajeCompletado}
                    setNuevoPorcentajeCompletado={setNuevoPorcentajeCompletado}
                    handlePorcentajeCompletadoChange={handlePorcentajeCompletadoChange}
                    setEditModePorcentajeCompletado={setEditModePorcentajeCompletado}
                    error={error}
                    setError={setError}
                    onSave={handlePorcentajeCompletado}
                  />
                )}
              </div>
  
              {/* Horas Duración */}
              <div className="flex flex-col gap-2">
                <div>
                  {!editModeHorasDuracion && (
                    <div
                      className={`flex flex-col items-center justify-center p-4 transition duration-300 rounded-lg shadow-lg cursor-pointer ${
                        horasDuracion ? 'hover:bg-green-800' : ''
                      }`}
                      onClick={() => setEditModeHorasDuracion(true)}
                    >
                      {horasDuracion > 0 && (
                        <div>
                          <p className="text-sm font-bold text-white lg:text-base">Horas:</p>
                          <p className="text-sm font-extrabold text-teal-400 lg:text-base">{horasDuracion} hrs</p>
                        </div>
                      )}
                      {!horasDuracion && (
                        <div className="flex flex-col items-center gap-1 px-2 py-1 text-xs transition duration-300 border-2 border-gray-600 border-dashed hover:bg-green-800">
                          <p>¿Cuánto has jugado?</p>
                          <EditIcon w={4} h={4} />
                        </div>
                      )}
                    </div>
                  )}
                  {editModeHorasDuracion && (
                    <HorasDuracionEditor
                      horasDuracion={horasDuracion}
                      nuevaHorasDuracion={nuevaHorasDuracion}
                      setNuevaHorasDuracion={setNuevaHorasDuracion}
                      handleHorasDuracionChange={handleHorasDuracionChange}
                      setEditModeHorasDuracion={setEditModeHorasDuracion}
                      error={error}
                      setError={setError}
                      onSave={handleHorasDuracion}
                    />
                  )}
                </div>
  
                {/* Platino */}
                <div>
                  {!editModePlatino && (
                    <div
                      className={`flex flex-col items-center justify-center p-4 transition-colors duration-200 rounded-lg shadow-lg cursor-pointer ${
                        platino && 'bg-gray-800 hover:bg-gray-900'
                      }`}
                      onClick={() => setEditModePlatino(true)}
                    >
                      {platino && (
                        <p className="flex items-center justify-center gap-2 text-sm font-extrabold text-teal-400 lg:text-sm">
                          {platino}
                        </p>
                      )}
                      {!platino && (
                        <div className="flex flex-col items-center gap-1 px-2 py-1 text-xs transition duration-300 border-2 border-gray-600 border-dashed hover:bg-green-800">
                          <p>¿En qué te centraste?</p>
                          <EditIcon w={4} h={4} />
                        </div>
                      )}
                    </div>
                  )}
                  {editModePlatino && (
                    <PlatinoEditor
                      platino={platino}
                      nuevoPlatino={nuevoPlatino}
                      setNuevoPlatino={setNuevoPlatino}
                      handlePlatinoChange={handlePlatinoChange}
                      setEditModePlatino={setEditModePlatino}
                      error={error}
                      setError={setError}
                      onSave={handlePlatino}
                      plataforma={plataforma}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };