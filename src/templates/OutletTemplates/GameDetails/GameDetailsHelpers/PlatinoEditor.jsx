import React from "react";

export const PlatinoEditor = ({
    platino,                  // Valor inicial de platino
    nuevoPlatino,             // Estado actual del platino
    setNuevoPlatino,          // Función para actualizar el estado de platino
    handlePlatinoChange,      // Función para guardar cambios en la base de datos
    setEditModePlatino,       // Función para salir del modo de edición
    error,                    // Error actual
    setError,                 // Función para actualizar errores
    onSave,                    // Función para guardar en el componente padre
    plataforma
}) => {
    // Manejar el cambio de selección
    const handleChange = (e) => {
        setNuevoPlatino(e.target.value);
        setError("");
    };

    // Guardar cambios en `platino`
    const handleSave = async () => {
        if (!nuevoPlatino) {
            setError("Selecciona una opción válida.");
            return;
        }

        setError("");
        try {
            await handlePlatinoChange(nuevoPlatino);
            onSave(nuevoPlatino);
            setEditModePlatino(false);
        } catch (error) {
            setError("Error al guardar la selección: " + error.message);
        }
    };


    return (
        <div className="">
            <div className="flex flex-col w-full">
                <label className="mb-2 text-xs text-white lg:text-sm">Selección de modalidad:</label>
                <select
                    value={nuevoPlatino}
                    onChange={handleChange}
                    className="p-2 text-[10px] text-white transition duration-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-sm"
                >
                    <option value="">Selecciona una opción</option>
                    <option value="Hª principal">Hª principal</option>
                    <option value="Hª + Extra">Hª + Extra</option>
                    <option value="Completista">Completista</option>
                    {/* <option value="Trofeo">Platino</option> */}

                    {(plataforma === 'PS5' || plataforma === 'PS4' || plataforma === 'PS3' || plataforma === 'PSVita')  && <option value="Platino">Platino</option>}
                    {(plataforma === 'Xbox 360' || plataforma === 'Xbox One' || plataforma === 'Xbox Series X-S')  && <option value="1000G">1000G</option>}

                </select>
                {error && <p className="mt-2 text-red-400">{error}</p>}
            </div>

            {/* Botones Guardar y Cancelar */}
            <div className="flex items-center justify-center gap-2 mt-3 lg:gap-4">
                <button
                    className="px-2 py-1 text-xs text-white transition duration-200 bg-blue-600 rounded-md shadow lg:px-6 lg:py-2 hover:bg-blue-700"
                    onClick={handleSave}
                >
                    Guardar
                </button>
                <button
                    className="px-2 py-1 text-xs text-gray-800 transition duration-200 bg-gray-300 rounded-md shadow lg:px-6 lg:py-2 hover:bg-gray-400"
                    onClick={() => setEditModePlatino(false)}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};
