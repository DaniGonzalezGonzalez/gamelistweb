import React, { useEffect } from "react";

export const HorasDuracionEditor = ({
    horasDuracion,                // Valor inicial
    nuevaHorasDuracion,           // Estado actual de horas de duración
    setNuevaHorasDuracion,        // Función para actualizar horas de duración
    handleHorasDuracionChange,    // Función para guardar cambios en la base de datos
    setEditModeHorasDuracion,     // Función para salir del modo edición
    error,                        // Error actual
    setError,                     // Función para actualizar errores
    onSave                        // Función para guardar en el componente padre
}) => {
    useEffect(() => {
        // Al montar el componente, establecer el valor de la opinión actual
        setNuevaHorasDuracion(horasDuracion || ""); 
    }, [horasDuracion, setNuevaHorasDuracion]);

    // Maneja cambios en el input y asegura que el valor sea un número válido
    const handleChange = (e) => {
        const value = e.target.value;
        const validFormat = /^\d{0,4}(\.\d{0,2})?$/; // Hasta 4 enteros y 2 decimales

        if (value === "" || validFormat.test(value)) {
            setNuevaHorasDuracion(value);
            setError("");
        } else {
            setError("Introduce un número válido de horas (hasta 2 decimales).");
        }
    };

    // Guardar cambios en `horasDuracion`
    const handleSave = async () => {
        if (nuevaHorasDuracion === "" || isNaN(Number(nuevaHorasDuracion))) {
            setError("Introduce un número válido de horas.");
            return;
        }

        setError("");
        try {
            await handleHorasDuracionChange(Number(nuevaHorasDuracion));
            onSave(nuevaHorasDuracion);
            setEditModeHorasDuracion(false);
        } catch (error) {
            setError("Error al guardar las horas: " + error.message);
        }
    };

    return (
        <div className="mb-5">
            <div className="flex flex-col items-center w-full">
                <label className="mb-2 text-xs text-white lg:text-base">Horas de duración:</label>
                <input
                    type="text"
                    value={nuevaHorasDuracion}
                    onChange={handleChange}
                    className="w-1/2 p-2 text-xs text-white transition duration-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="45.5"
                />
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
                    onClick={() => setEditModeHorasDuracion(false)}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};
