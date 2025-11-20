import { EditIcon } from "../../../../assets/Icons";
import { formatDate, GET_COLOR_CLASS } from "../../../helpers/constants/constants";
import { FechaFinalizadaSelector } from "./FechaFinalizadaSelector";
import { OpinionPersonalEditor } from "./OpinionPersonalEditor";

export const MiExperienciaPersonal = ({
  estado,
  editModeOpinionPersonal,
  setEditModeOpinionPersonal,
  editModeFechaFinalizacion,
  setEditModeFechaFinalizacion,
  opinionPersonal,
  notaJuego,
  fechaFinalizacion,
  nuevoMes,
  nuevoAnio,
  setNuevoMes,
  setNuevoAnio,
  handleOpinionPersonal,
  handleOpinionPersonalChange,
  error,
  setError,
  nuevaOpinionPersonal,
  setNuevaOpinionPersonal,
  handleFechaFinalizacionChange,
  handleFechaGuardada // Asegúrate de pasar esta función correctamente
}) => {
  return (
    <>
      {estado && (
        <div className="p-4 mt-4 border border-gray-500 lg:p-6 lg:mt-10 rounded-xl">
          <h3 className="text-base font-bold lg:text-2xl text-start">Mi experiencia personal</h3>
          <div className="flex flex-col items-center justify-between w-full gap-6 lg:gap-2 lg:flex-row">
            {/* Mostrar reseña personal o no */}
            {!editModeOpinionPersonal && (
              <div
                className="w-full mt-4 text-sm cursor-pointer lg:w-1/2"
                onClick={() => setEditModeOpinionPersonal(true)}
              >
                <div className="mt-4 text-xs transition duration-500 text-start lg:text-sm rounded-xl hover:font-bold">
                  {opinionPersonal ? (
                    opinionPersonal
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 px-2 py-1 transition duration-300 bg-gray-800 border-2 border-gray-600 border-dashed hover:bg-green-800">
                      Añade tu opinión personal
                      <EditIcon w={4} h={4} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {editModeOpinionPersonal && (
              <OpinionPersonalEditor
                opinionPersonal={opinionPersonal}
                nuevaOpinionPersonal={nuevaOpinionPersonal}
                setNuevaOpinionPersonal={setNuevaOpinionPersonal}
                handleOpinionPersonalChange={handleOpinionPersonalChange}
                setEditModeOpinionPersonal={setEditModeOpinionPersonal}
                error={error}
                setError={setError}
                onSave={handleOpinionPersonal} // Asegúrate de pasar esta función correctamente
              />
            )}

            <div className="flex items-center justify-center w-full gap-8 text-center lg:gap-10 lg:w-1/2">
              <div className="flex flex-col items-center justify-center gap-2">
                <p
                  className={`text-sm text-gray-100 flex justify-center items-center font-bold rounded-full p-5 w-6 h-6 text-end ${GET_COLOR_CLASS(
                    notaJuego
                  )}`}
                >
                  {notaJuego}
                </p>
                <p className="text-xs lg:text-sm">Mi nota</p>
              </div>

              {!editModeFechaFinalizacion && (
                <div
                  className={`flex flex-col items-center justify-center gap-2 px-2 py-1 text-xs transition duration-300 ${
                    formatDate(fechaFinalizacion) === "00-0"
                      ? "bg-gray-800 border-2 border-gray-600 border-dashed hover:bg-green-800"
                      : "bg-transparent hover:bg-green-800 rounded-xl"
                  } cursor-pointer lg:text-sm`}
                  onClick={() => setEditModeFechaFinalizacion(true)}
                >
                  <p>Finalizado en:</p>
                  {formatDate(fechaFinalizacion) === "00-0" ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <EditIcon w={4} h={4} />
                    </div>
                  ) : (
                    formatDate(fechaFinalizacion)
                  )}
                </div>
              )}

              {editModeFechaFinalizacion && (
                <FechaFinalizadaSelector
                  nuevoMes={nuevoMes}
                  setNuevoMes={setNuevoMes}
                  nuevoAnio={nuevoAnio}
                  setNuevoAnio={setNuevoAnio}
                  handleFechaFinalizacionChange={handleFechaFinalizacionChange}
                  setEditModeFechaFinalizacion={setEditModeFechaFinalizacion}
                  error={error}
                  setError={setError}
                  onSave={handleFechaGuardada} // Aquí se pasa la función que maneja el guardado de la fecha
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
