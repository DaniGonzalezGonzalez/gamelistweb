import React, { useEffect } from "react";

export const PorcentajeCompletadoEditor = ({
    porcentajeCompletado,            // Valor inicial
    nuevoPorcentajeCompletado,       // Estado actual de porcentaje completado
    setNuevoPorcentajeCompletado,    // Función para actualizar porcentaje completado
    handlePorcentajeCompletadoChange,// Función para guardar cambios en la base de datos
    setEditModePorcentajeCompletado, // Función para salir del modo edición
    error,                           // Error actual
    setError,                        // Función para actualizar errores
    onSave                           // Función para guardar en el componente padre
}) => {

    useEffect(() => {
        // Al montar el componente, establecer el valor de la opinión actual
        setNuevoPorcentajeCompletado(porcentajeCompletado || ""); 
    }, [porcentajeCompletado, setNuevoPorcentajeCompletado]);

    // Maneja cambios en el input y asegura que el valor esté entre 0 y 100 sin decimales
    const handleChange = (e) => {
        const value = e.target.value;
        const validFormat = /^(\d{1,2}|100)$/; // Solo números entre 0 y 100

        if (value === "" || validFormat.test(value)) {
            setNuevoPorcentajeCompletado(value);
            setError("");
        } else {
            setError("Introduce un porcentaje válido (0-100).");
        }
    };

    // Guardar cambios en `porcentajeCompletado`
    const handleSave = async () => {
        if (nuevoPorcentajeCompletado === "" || isNaN(Number(nuevoPorcentajeCompletado)) || Number(nuevoPorcentajeCompletado) < 0 || Number(nuevoPorcentajeCompletado) > 100) {
            setError("Introduce un porcentaje válido entre 0 y 100.");
            return;
        }

        setError("");
        try {
            await handlePorcentajeCompletadoChange(Number(nuevoPorcentajeCompletado));
            onSave(nuevoPorcentajeCompletado);
            setEditModePorcentajeCompletado(false);
        } catch (error) {
            setError("Error al guardar el porcentaje: " + error.message);
        }
    };

    return (
        <div className="">
            <div className="flex flex-col items-center w-full">
                <label className="mb-2 text-xs text-white">Porcentaje completado:</label>
                <input
                    type="number"
                    min="0"
                    max="100"
                    value={nuevoPorcentajeCompletado}
                    onChange={handleChange}
                    className="w-2/3 p-2 text-xs text-white transition duration-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0-100"
                />
                {error && <p className="mt-2 text-red-400">{error}</p>}
            </div>

            {/* Botones Guardar y Cancelar */}
            <div className="flex gap-2 mt-3 lg:gap-4">
                <button
                    className="px-2 py-1 text-xs text-white transition duration-200 bg-blue-600 rounded-md shadow lg:px-6 lg:py-2 hover:bg-blue-700"
                    onClick={handleSave}
                >
                    Guardar
                </button>
                <button
                    className="px-2 py-1 text-xs text-gray-800 transition duration-200 bg-gray-300 rounded-md shadow lg:px-6 lg:py-2 hover:bg-gray-400"
                    onClick={() => setEditModePorcentajeCompletado(false)}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};
